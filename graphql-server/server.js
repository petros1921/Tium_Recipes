const { ApolloServer, gql } = require("apollo-server");

// Define the schema
const typeDefs = gql`
  type Recipe {
    id: ID!
    title: String!
    featured_image: String
    additional_images: [String!]!
    category: String
    preparation_time: Int
    average_rating: Float
    ratings_count: Int
    description: String!
    ingredients: [String!]!
    directions: [String!]!
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe
  }

  type Mutation {
    addRecipe(
      title: String!
      featured_image: String!
      additional_images: [String!]!
      category: String!
      preparation_time: Int!
      description: String!
      ingredients: [String!]!
      directions: [String!]!
    ): Recipe
  }
`;

// Sample data
let recipes = [
  {
    id: "1",
    title: "Injera",
    featured_image: "/images/injera.jpg",
    additional_images: ["/images/injera-step1.jpg", "/images/injera-step2.jpg"],
    category: "Breakfast",
    preparation_time: 30,
    average_rating: 4.5,
    ratings_count: 150,
    description: "A traditional Ethiopian flatbread made with teff flour.",
    ingredients: ["2 cups teff flour", "3 cups water", "1/2 tsp salt"],
    directions: [
      "Combine teff flour and water in a bowl. Mix well.",
      "Cover and let the mixture ferment for 2-3 days.",
      "Add salt, stir, and pour batter onto a hot skillet.",
      "Cook until bubbles form and the edges lift easily.",
    ],
  },
  {
    id: "2",
    title: "Doro Wat",
    featured_image: "/images/Doro-Wet.jpg",
    additional_images: ["/images/dorowat-step1.jpg"],
    category: "Dinner",
    preparation_time: 60,
    average_rating: 5.0,
    ratings_count: 200,
    description: "A spicy chicken stew, a national dish of Ethiopia.",
    ingredients: [
      "1 whole chicken",
      "4 onions, finely chopped",
      "1/2 cup berbere spice",
      "2 cups chicken stock",
    ],
    directions: [
      "Marinate chicken pieces with lemon and salt.",
      "Sauté onions in a large pot until caramelized.",
      "Add berbere spice and chicken stock, stirring well.",
      "Simmer chicken in the pot until fully cooked.",
    ],
  },
  {
    id: "3",
    title: "Shiro Wat",
    featured_image: "/images/shiro.jpg",
    additional_images: ["/images/shiro-step1.jpg", "/images/shiro-step2.jpg"],
    category: "Lunch",
    preparation_time: 25,
    average_rating: 4.7,
    ratings_count: 120,
    description: "It is Ethiopians best vigan food.",
    ingredients: [
      "1 cup shiro powder",
      "2 cups water",
      "1 onion, finely chopped",
      "1 tsp garlic paste",
    ],
    directions: [
      "Sauté onions and garlic in a pan until fragrant.",
      "Mix shiro powder with water and stir until smooth.",
      "Pour the mixture into the pan and cook on medium heat.",
      "Simmer until thickened, stirring occasionally.",
    ],
  },
  {
    id: "4",
    title: "Kitfo",
    featured_image: "/images/kitfo.jpg",
    additional_images: ["/images/kitfo-step1.jpg"],
    category: "Dinner",
    preparation_time: 20,
    average_rating: 4.9,
    ratings_count: 180,
    description: "A spicy minced beef mixed with melted butter.",
    ingredients: [
      "500g minced beef",
      "2 tbsp niter kibbeh (spiced butter)",
      "1 tsp mitmita spice",
      "Salt to taste",
    ],
    directions: [
      "Melt niter kibbeh in a pan over low heat.",
      "Mix the minced beef with mitmita and salt.",
      "Combine the beef mixture with the melted butter.",
      "Serve with injera or bread.",
    ],
  },
  {
    id: "5",
    title: "Chechebsa",
    featured_image: "/images/chechebsa.jpg",
    additional_images: [],
    category: "Breakfast",
    preparation_time: 15,
    average_rating: 4.3,
    ratings_count: 75,
    description: "A small flat bread mixed with honey and Kibbeh(ethiopian butter)",
    ingredients: [
      "2 cups flour",
      "1 cup water",
      "2 tbsp niter kibbeh",
      "1 tsp honey",
    ],
    directions: [
      "Mix flour and water to form a dough.",
      "Roll out the dough and cook on a skillet.",
      "Tear into pieces and mix with melted niter kibbeh.",
      "Drizzle with honey before serving.",
    ],
  },
  {
    id: "6",
    title: "Tibs",
    featured_image: "/images/tibs.jpg",
    additional_images: ["/images/tibs-step1.jpg"],
    category: "Lunch",
    preparation_time: 30,
    average_rating: 4.6,
    ratings_count: 100,
    description: "A cubed sliced beef fried with onion and oil.",
    ingredients: [
      "500g beef, cubed",
      "1 onion, sliced",
      "2 green chilies, sliced",
      "2 tbsp oil",
    ],
    directions: [
      "Heat oil in a skillet and sauté onions.",
      "Add beef cubes and cook until browned.",
      "Add chilies and cook for an additional 5 minutes.",
      "Serve with injera.",
    ],
  },
  {
    id: "8",
    title: "Firfir",
    featured_image: "/images/firfir.jpg",
    additional_images: [],
    category: "Breakfast",
    preparation_time: 15,
    average_rating: 4.2,
    ratings_count: 60,
    description: "A torn pieces of injera mixed with berbere sauce.",
    ingredients: [
      "2 cups injera pieces",
      "1 cup berbere sauce",
      "2 tbsp niter kibbeh",
    ],
    directions: [
      "Heat niter kibbeh in a pan.",
      "Add injera pieces and stir to coat evenly.",
      "Mix in the berbere sauce and cook until heated through.",
    ],
  },
  {
    id: "9",
    title: "Sambusa",
    featured_image: "/images/sambusa.jpg",
    additional_images: ["/images/sambusa-step1.jpg"],
    category: "Snacks",
    preparation_time: 45,
    average_rating: 4.5,
    ratings_count: 90,
    description: "A crispy fried pastry filled with spiced meat or lentils, a popular Ethiopian snack.",
    ingredients: [
      "1 cup ground beef",
      "1 onion, diced",
      "1 tsp cumin",
      "Sambusa wrappers",
    ],
    directions: [
      "Cook beef and onions in a pan with spices.",
      "Place a small amount of filling on each wrapper.",
      "Fold into triangles and seal the edges.",
      "Deep fry until golden brown.",
    ],
  },
  {
    id: "10",
    title: "Ethiopian Coffee",
    featured_image: "/images/ethcoffee.jpg",
    additional_images: [],
    category: "Drinks",
    preparation_time: 10,
    average_rating: 5.0,
    ratings_count: 250,
    description: "One of the best if not THE BEST coffee in the world.",
    ingredients: ["2 tbsp coffee grounds", "1 cup water", "Sugar (optional)"],
    directions: [
      "Boil water in a pot.",
      "Add coffee grounds and simmer for 5 minutes.",
      "Pour into a cup and add sugar if desired.",
    ],
  },
  {
    id: "11",
    title: "Gomen",
    featured_image: "/images/gomen.jpg",
    additional_images: ["/images/gomen-step1.jpg"],
    category: "Lunch",
    preparation_time: 35,
    average_rating: 4.3,
    ratings_count: 85,
    description: "A chopped collared greens mixed with onion, oil and garlic.",
    ingredients: [
      "2 bunches collard greens, chopped",
      "1 onion, diced",
      "2 tbsp oil",
      "1 tsp garlic paste",
    ],
    directions: [
      "Sauté onions and garlic in a pot.",
      "Add chopped collard greens and cook until tender.",
      "Season with salt and serve.",
    ],
  },
  {
    id: "12",
    title: "Dabo Kolo",
    featured_image: "/images/dabokolo.jpg",
    additional_images: ["/images/dabokolo-step1.jpg"],
    category: "Snacks",
    preparation_time: 20,
    average_rating: 4.7,
    ratings_count: 110,
    description: "A traditional snacks that Ethiopians eat.",
    ingredients: [
      "2 cups flour",
      "1/2 cup water",
      "1 tsp salt",
      "1/2 tsp berbere spice",
    ],
    directions: [
      "Mix flour, water, salt, and berbere to form a dough.",
      "Roll into thin ropes and cut into small pieces.",
      "Fry or bake until crispy.",
    ],
  },
  {
    id: "13",
    title: "Key Wot",
    featured_image: "/images/keywot.jpg",
    additional_images: ["/images/keywot-step1.jpg"],
    category: "Dinner",
    preparation_time: 50,
    average_rating: 4.8,
    ratings_count: 190,
    description: "A spicy beef stew, One of iconic Ethiopian food.",
    ingredients: [
      "500g beef, cubed",
      "3 onions, finely chopped",
      "1/2 cup berbere spice",
      "2 cups water",
    ],
    directions: [
      "Sauté onions in a pan until caramelized.",
      "Add berbere spice and mix well.",
      "Add beef and water, and simmer until tender.",
    ],
  },
  {
    id: "14",
    title: "Misir Wot",
    featured_image: "/images/misirwot.jpg",
    additional_images: ["/images/misirwot-step1.jpg"],
    category: "Lunch",
    preparation_time: 40,
    average_rating: 4.9,
    ratings_count: 130,
    description: "A spicy lentils stew which is eaten during fasting periods for Orthodox Christians.",
    ingredients: [
      "2 cups red lentils",
      "3 cups water",
      "1 onion, diced",
      "2 tbsp berbere spice",
    ],
    directions: [
      "Sauté onions in a pot until golden.",
      "Add lentils, berbere spice, and water.",
      "Cook on medium heat until thick and smooth.",
    ],
  },
  {
    id: "15",
    title: "Awaze Sauce",
    featured_image: "/images/awaze.jpg",
    additional_images: [],
    category: "Condiments",
    preparation_time: 10,
    average_rating: 4.6,
    ratings_count: 75,
    description: "A long-standing traditional Ethiopian sauce that starts with Berbere Seasoning, a spicy-hot blend of peppers and heady, fragrant spices",
    ingredients: [
      "1/4 cup berbere spice",
      "2 tbsp water",
      "1 tbsp honey",
      "1 tbsp mustard",
    ],
    directions: [
      "Mix berbere spice with water to form a paste.",
      "Stir in honey and mustard until smooth.",
      "Serve as a dipping sauce.",
    ],
  },
  {
    id: "16",
    title: "Bozena Shiro",
    featured_image: "/images/bozenashiro.jpg",
    additional_images: ["/images/bozenashiro-step1.jpg"],
    category: "Dinner",
    preparation_time: 30,
    average_rating: 4.7,
    ratings_count: 100,
    description: "A hearty Ethiopian dish of seasoned ground chickpeas and beef stewed in spiced butter",
    ingredients: [
      "1 cup shiro powder",
      "1/2 cup cooked beef, diced",
      "2 cups water",
      "1 onion, diced",
    ],
    directions: [
      "Sauté onions in a pan.",
      "Mix shiro powder with water and stir until smooth.",
      "Add the mixture to the pan with beef and cook until thickened.",
    ],
  },
  {
    id: "17",
    title: "Tella",
    featured_image: "/images/tella.jpg",
    additional_images: [],
    category: "Drinks",
    preparation_time: 1440,
    average_rating: 5.0,
    ratings_count: 300,
    description: "A traditional Ethiopian fermented alcoholic beverage made from grains and herbs",
    ingredients: [
      "1 cup barley",
      "1 cup gesho leaves",
      "4 cups water",
      "1/4 cup sugar",
    ],
    directions: [
      "Toast barley and grind it into a coarse powder.",
      "Mix barley with water and let ferment for 2 days.",
      "Add gesho leaves and sugar, and ferment for another day.",
      "Strain and serve.",
    ],
  },
  {
    id: "18",
    title: "Tikil Gomen",
    featured_image: "/images/atakilt-wat.jpg",
    additional_images: ["/images/atakiltwat-step1.jpg"],
    category: "Lunch",
    preparation_time: 25,
    average_rating: 4.8,
    ratings_count: 95,
    description: "a quick and easy vegetarian dish of cabbage and carrots typically served alongside other Ethiopian dishes with injera bread.",
    ingredients: [
      "2 cups cabbage, chopped",
      "2 carrots, sliced",
      "1 potato, diced",
      "2 tbsp oil",
    ],
    directions: [
      "Heat oil in a pan and sauté vegetables.",
      "Cover and cook on low heat until tender.",
      "Season with salt and serve.",
    ],
  },
  {
    id: "19",
    title: "Chiko",
    featured_image: "/images/chiko.jpg",
    additional_images: ["/images/chiko-step1.jpg"],
    category: "Snacks",
    preparation_time: 15,
    average_rating: 4.5,
    ratings_count: 50,
    description: "A barley conserved with butter, is traditional food of Oromia region in Ethiopia.",
    ingredients: [
      "1 cup barley flour",
      "1/2 cup honey",
      "1/4 cup niter kibbeh",
    ],
    directions: [
      "Toast barley flour in a pan until golden brown.",
      "Mix with honey and niter kibbeh to form a thick paste.",
      "Serve as a snack or dessert.",
    ],
  },
  {
    id: "20",
    title: "Yemisir Kik Alicha",
    featured_image: "/images/yemisir-kik.jpg",
    additional_images: [],
    category: "Dinner",
    preparation_time: 40,
    average_rating: 4.9,
    ratings_count: 120,
    description: "A none spicy lentils stew",
    ingredients: [
      "2 cups yellow lentils",
      "1 onion, diced",
      "2 cups water",
      "1 tsp turmeric",
    ],
    directions: [
      "Sauté onions in a pot until golden.",
      "Add lentils, turmeric, and water.",
      "Cook on medium heat until soft and creamy.",
    ],
  }
];

// Define resolvers
const resolvers = {
  Query: {
    recipes: () => recipes,
    recipe: (_, { id }) => {
      const recipe = recipes.find((recipe) => recipe.id === id);
      if (!recipe) {
        throw new Error(`Recipe with ID ${id} not found.`);
      }
      return recipe;
    },
  },
  Mutation: {
    addRecipe: (
      _,
      {
        title,
        featured_image,
        additional_images,
        category,
        preparation_time,
        description,
        ingredients,
        directions,
      }
    ) => {
      if (!title || !featured_image || !ingredients.length || !directions.length) {
        throw new Error(
          "Title, featured image, ingredients, and directions are required to add a recipe."
        );
      }

      const newRecipe = {
        id: (recipes.length + 1).toString(),
        title,
        featured_image,
        additional_images: additional_images || [],
        category,
        preparation_time,
        average_rating: 0, // Default average rating
        ratings_count: 0, // Default ratings count
        description,
        ingredients,
        directions,
      };

      recipes.push(newRecipe);
      return newRecipe;
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: "*", // Allow all origins (use specific domains in production)
    credentials: true,
  },
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
