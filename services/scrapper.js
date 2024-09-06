import puppeteer from 'puppeteer';
import db from '../server/database.js';

db.exec('CREATE INDEX IF NOT EXISTS idx_url ON producers(url)');

async function scrapeAndStoreProducers(startRegion = null) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseUrl = 'https://www.producteurs.fr/';
  await page.goto(baseUrl, { waitUntil: 'networkidle2' });

  const regionLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a.region_index'));
    return links.map(link => ({
      name: link.innerText.trim(),
      url: link.href
    }));
  });

  console.log(`Nombre de régions trouvées : ${regionLinks.length}`);

  let startScraping = startRegion ? false : true;

  for (let region of regionLinks) {
    if (!startScraping) {
      if (region.name === startRegion) {
        startScraping = true;
      } else {
        console.log(`Région ignorée : ${region.name}`);
        continue;
      }
    }

    console.log(`\nScraping pour la région: ${region.name}`);
    await page.goto(region.url, { waitUntil: 'networkidle2' });

    const departmentLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a.item'));
      return links.map(link => ({
        name: link.innerText.trim(),
        url: link.href
      }));
    });

    console.log(`  Nombre de départements trouvés dans la région ${region.name} : ${departmentLinks.length}`);

    for (let department of departmentLinks) {
      console.log(`    Scraping pour le département: ${department.name}`);
      await page.goto(department.url, { waitUntil: 'networkidle2' });

      const cityLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('div.link a'));
        return links.map(link => ({
          name: link.innerText.trim(),
          url: link.href
        }));
      });

      console.log(`      Nombre de villes trouvées dans le département ${department.name} : ${cityLinks.length}`);

      for (let city of cityLinks) {
        console.log(`      Scraping pour la ville: ${city.name}`);

        const existingProducersInCity = db.prepare('SELECT COUNT(*) as count FROM producers WHERE city = ?').get(city.name);
        if (existingProducersInCity.count > 0) {
          console.log(`      Ville déjà traitée: ${city.name}`);
          continue;
        }

        await page.goto(city.url, { waitUntil: 'networkidle2' });

        const producerLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a.producteur'));
          return links.map(link => ({
            name: link.innerText.trim(),
            url: link.href
          }));
        });

        console.log(`        Nombre de producteurs trouvés dans la ville ${city.name} : ${producerLinks.length}`);

        for (let producer of producerLinks) {
          console.log(`          Scraping producteur: ${producer.name}`);

          const existingProducer = db.prepare('SELECT id FROM producers WHERE url = ?').get(producer.url);
          if (existingProducer) {
            console.log(`          Producteur déjà existant: ${producer.name}`);
            continue;
          }

          await page.goto(producer.url, { waitUntil: 'networkidle2' });

          try {
            await page.waitForSelector('#div_photo_contact', { timeout: 5000 });

            const producerDetails = await page.evaluate(async () => {
              const name = document.querySelector('#titre_producteur .titre_prod')?.innerText.trim() || 'Nom non trouvé';

              const addressElement = document.querySelector('#adresse_postale');
              const address = addressElement ? `${addressElement.querySelector('p').innerText.trim()}, ${addressElement.querySelectorAll('p')[1]?.innerText.trim()}` : 'Adresse non trouvée';

              const siteElement = document.querySelector('#site_contact');
              const site = siteElement ? siteElement.href : 'Site non trouvé';

              const emailLink = document.querySelector('#mail_contact');
              const phoneLink = document.querySelector('#tel_contact');

              if (emailLink) emailLink.click();
              if (phoneLink) phoneLink.click();

              await new Promise(resolve => setTimeout(resolve, 1000));

              const email = emailLink ? emailLink.href.replace('mailto:', '') : 'Email non trouvé';
              const phone = phoneLink ? phoneLink.href.replace('tel:', '') : 'Téléphone non trouvé';

              return {
                name,
                address,
                site,
                email,
                phone
              };
            });
            db.prepare(`
              INSERT INTO producers (region, department, city, name, url, address, site, email, phone)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(region.name, department.name, city.name, producerDetails.name, producer.url, producerDetails.address, producerDetails.site, producerDetails.email, producerDetails.phone);

            console.log(`Producteur ajouté: ${producerDetails.name}`);

          } catch (error) {
            console.error(`Erreur lors du scraping du producteur ${producer.name}:`, error);
          }
        }
      }
    }
  }

  await browser.close();
}

export default scrapeAndStoreProducers;
