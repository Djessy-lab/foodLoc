export default {
  foodloc: {
    appName: "FoodLoc",
    titleHero: "Connecter les Producteurs aux Consommateurs",
    descriptionHero: "Découvrez les produits locaux directement auprès des producteurs de votre région.",
    color: "blue",
    imgHero: "/img/coeur.png",
    advantages: [
      { title: 'Des Produits Locaux, Plus Frais et Plus Sains', text: 'Avec FoodLoc, accédez directement aux meilleurs produits locaux, fraîchement récoltés et sans intermédiaires. Faites le choix de la qualité et du goût en soutenant les producteurs près de chez vous.' },
      { title: 'Économisez en Court-Circuitant les Supermarchés', text: "En éliminant les marges des grandes surfaces, FoodLoc vous permet d'acheter des produits de qualité à des prix justes. Payez moins cher pour mieux manger, tout en aidant les producteurs à mieux vivre de leur travail." },
      { title: "Un Acte Éco-Responsable pour l'Avenir", text: "Chaque achat sur FoodLoc est un pas vers un mode de consommation plus durable. Réduisez votre empreinte carbone en favorisant les circuits courts et en choisissant des produits de saison, cultivés avec soin et respect de l'environnement." },
    ],
    testimonials: [
      { author: 'Marie D.', text: "J'ai découvert des produits locaux incroyables grâce à FoodLoc! Les producteurs sont passionnés et leurs produits de haute qualité.", stars: 5 },
      { author: 'Paul L.', text: "Une excellente manière de soutenir les producteurs locaux tout en ayant accès à des produits frais et savoureux.", stars: 5 },
      { author: 'Emma R.', text: "J'adore pouvoir acheter directement auprès des producteurs de ma région, ça crée une vraie connexion et c'est éthique.", stars: 5 },
      { author: 'Lucas M.', text: "FoodLoc a changé ma façon de consommer. C'est tellement agréable de connaître l'origine de ce que l'on mange et de pouvoir échanger avec les producteurs.", stars: 5 },
    ],
    pricing: [
      { title: 'Offre gratuite', price: 0, duration: 'mois', features: ['Accès illimité au catalogue de producteurs locaux'] },
      { title: 'FoodLocker', price: 4.99, duration: 'mois', features: ['Accès illimité au catalogue de producteurs locaux', 'Réservation de votre panier', 'Service client dédié'], up: true },
      { title: 'Bientôt disponible', price: 9.99, duration: 'mois', features: ['Accès illimité au catalogue de producteurs locaux', 'Réservation de votre panier', "Faîtes vous livrer ou livrez d'autres consommateurs", 'Service client dédié', 'Réductions exclusives'] }
    ],
  },
  test: {
    appName: "Youpi",
    titleHero: "Ici on s'amuse",
    descriptionHero: "Ici on s'amuse suuuuuuper bien !!",
    color: "yellow",
    imgHero: "/img/stars.png",
    advantages: [
      { title: 'blablabla', text: 'blablabla' },
      { title: 'blablabla', text: 'blablabla' },
      { title: 'blablabla', text: 'blablabla' },
    ],
    testimonials: [
      { author: 'blablabla', text: "blablabla", stars: 5 },
      { author: 'blablabla', text: "blablabla", stars: 5 },
      { author: 'blablabla', text: "blablabla", stars: 5 },
    ],
    pricing: [
      { title: 'Offre suuuper chere', price: 200000, duration: 'jour', features: ['blablabla', 'blablabla'] },
      { title: 'blablabla', price: 100000, duration: 'jour', features: ['blablabla', 'blablabla'] },
      { title: 'blablabla', price: 50000, duration: 'jour', features: ['blablabla', 'blablabla'] },
    ]
  }
}
