import scrapeProducers from './services/scrapper.js';

(async () => {
  try {
    const result = await scrapeProducers('Normandie');
    result.forEach(cityData => {
      console.log(`\nVille: ${cityData.city}`);
      cityData.producer.forEach(producer => {
        console.log(`  Producteur: ${producer.name}`);
        console.log(`    URL: ${producer.url}`);
        console.log(`    Contenu: ${producer.content}`);
      });
    });
  } catch (error) {
    console.error('Erreur lors du scraping :', error);
  }
})();
