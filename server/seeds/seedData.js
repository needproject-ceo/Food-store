const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const Restaurant = require('../models/Restaurant');
const Food = require('../models/Food');
const Review = require('../models/Review');
const User = require('../models/User');

const restaurants = [
  { name: "Burger Palace", description: "Gourmet burgers made with 100% Angus beef", cuisine: ["American", "Burgers"], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", coverImage: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800", rating: 4.5, reviewCount: 124, deliveryTime: "20-35 min", deliveryFee: 1.99, minOrder: 12, featured: true, tags: ["Popular", "Fast"], priceRange: "$$" },
  { name: "Pizza Paradise", description: "Authentic Italian pizzas baked in wood-fired ovens", cuisine: ["Italian", "Pizza"], image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400", coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", rating: 4.7, reviewCount: 89, deliveryTime: "25-40 min", deliveryFee: 2.49, minOrder: 15, featured: true, tags: ["Top Rated"], priceRange: "$$" },
  { name: "Sushi Zen", description: "Fresh and authentic Japanese sushi & sashimi", cuisine: ["Japanese", "Sushi"], image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400", coverImage: "https://images.unsplash.com/photo-1617196034082-93f7a1e1e96e?w=800", rating: 4.8, reviewCount: 203, deliveryTime: "30-45 min", deliveryFee: 3.99, minOrder: 20, featured: true, tags: ["Premium", "Healthy"], priceRange: "$$$" },
  { name: "Taco Fiesta", description: "Authentic Mexican street tacos and burritos", cuisine: ["Mexican"], image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400", coverImage: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800", rating: 4.3, reviewCount: 67, deliveryTime: "20-30 min", deliveryFee: 1.49, minOrder: 10, tags: ["Spicy", "Fast"], priceRange: "$" },
  { name: "The Green Bowl", description: "Healthy salads, grain bowls, and vegan options", cuisine: ["Healthy", "Vegan"], image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", coverImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800", rating: 4.6, reviewCount: 145, deliveryTime: "15-25 min", deliveryFee: 2.99, minOrder: 12, featured: true, tags: ["Healthy", "Vegan"], priceRange: "$$" },
  { name: "Spice Garden", description: "Authentic Indian cuisine with aromatic spices", cuisine: ["Indian"], image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400", coverImage: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800", rating: 4.4, reviewCount: 112, deliveryTime: "35-50 min", deliveryFee: 2.49, minOrder: 15, tags: ["Spicy", "Popular"], priceRange: "$$" },
  { name: "The Breakfast Club", description: "All-day breakfast and brunch favorites", cuisine: ["American", "Breakfast"], image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400", coverImage: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800", rating: 4.5, reviewCount: 78, deliveryTime: "20-35 min", deliveryFee: 1.99, minOrder: 10, tags: ["Brunch", "Popular"], priceRange: "$$" },
  { name: "Golden Dragon", description: "Classic Chinese dim sum and noodle dishes", cuisine: ["Chinese"], image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400", coverImage: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800", rating: 4.2, reviewCount: 95, deliveryTime: "30-45 min", deliveryFee: 2.99, minOrder: 15, tags: ["Asian", "Noodles"], priceRange: "$$" },
  { name: "The Steakhouse", description: "Premium steaks and classic American grill", cuisine: ["American", "Steakhouse"], image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", coverImage: "https://images.unsplash.com/photo-1558030006-450675393462?w=800", rating: 4.9, reviewCount: 234, deliveryTime: "40-55 min", deliveryFee: 4.99, minOrder: 25, featured: true, tags: ["Premium", "Grill"], priceRange: "$$$$" },
  { name: "Pasta Corner", description: "Homemade Italian pasta and risotto", cuisine: ["Italian"], image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400", coverImage: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800", rating: 4.6, reviewCount: 87, deliveryTime: "25-40 min", deliveryFee: 2.49, minOrder: 15, tags: ["Italian", "Pasta"], priceRange: "$$" },
  { name: "Seoul Kitchen", description: "Authentic Korean BBQ and street food", cuisine: ["Korean"], image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400", coverImage: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800", rating: 4.7, reviewCount: 156, deliveryTime: "25-40 min", deliveryFee: 2.99, minOrder: 18, tags: ["BBQ", "Korean"], priceRange: "$$" },
  { name: "The Dessert Lab", description: "Creative desserts and artisan ice cream", cuisine: ["Desserts"], image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400", coverImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800", rating: 4.8, reviewCount: 198, deliveryTime: "15-25 min", deliveryFee: 1.99, minOrder: 8, tags: ["Sweets", "Popular"], priceRange: "$$" },
];

const getFoods = (restaurantIds) => [
  // Burger Palace
  { name: "Classic Cheeseburger", description: "Angus beef patty, cheddar, lettuce, tomato, pickles", price: 12.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", category: "Burgers", restaurant: restaurantIds[0], rating: 4.6, isVeg: false, isFeatured: true, calories: 650, prepTime: "10-15 min" },
  { name: "BBQ Bacon Burger", description: "Double patty, crispy bacon, BBQ sauce, onion rings", price: 15.99, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400", category: "Burgers", restaurant: restaurantIds[0], rating: 4.8, isVeg: false, calories: 850, prepTime: "12-18 min" },
  { name: "Veggie Burger", description: "Black bean patty, avocado, sprouts, chipotle mayo", price: 11.99, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400", category: "Burgers", restaurant: restaurantIds[0], rating: 4.3, isVeg: true, calories: 480, prepTime: "10-15 min" },
  { name: "Loaded Fries", description: "Crispy fries topped with cheese, bacon, jalapeños", price: 8.99, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", category: "Sides", restaurant: restaurantIds[0], rating: 4.5, isVeg: false, calories: 520, prepTime: "8-12 min" },
  // Pizza Paradise
  { name: "Margherita Pizza", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 14.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400", category: "Pizza", restaurant: restaurantIds[1], rating: 4.7, isVeg: true, isFeatured: true, calories: 720, prepTime: "15-20 min" },
  { name: "Pepperoni Feast", description: "Double pepperoni, mozzarella, tomato sauce", price: 17.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400", category: "Pizza", restaurant: restaurantIds[1], rating: 4.8, isVeg: false, calories: 890, prepTime: "15-20 min" },
  { name: "BBQ Chicken Pizza", description: "Grilled chicken, BBQ sauce, red onions, cilantro", price: 18.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", category: "Pizza", restaurant: restaurantIds[1], rating: 4.6, isVeg: false, calories: 820, prepTime: "18-25 min" },
  { name: "Garlic Bread", description: "Toasted sourdough with herb butter and garlic", price: 5.99, image: "https://images.unsplash.com/photo-1619535860434-ba4b89b8a6d0?w=400", category: "Sides", restaurant: restaurantIds[1], rating: 4.4, isVeg: true, calories: 280, prepTime: "8-10 min" },
  // Sushi Zen
  { name: "Dragon Roll", description: "Shrimp tempura, avocado, cucumber, eel sauce", price: 16.99, image: "https://images.unsplash.com/photo-1617196034082-93f7a1e1e96e?w=400", category: "Sushi Rolls", restaurant: restaurantIds[2], rating: 4.9, isVeg: false, isFeatured: true, calories: 380, prepTime: "15-20 min" },
  { name: "Salmon Sashimi", description: "Fresh Atlantic salmon, 8 pieces", price: 14.99, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400", category: "Sashimi", restaurant: restaurantIds[2], rating: 4.8, isVeg: false, calories: 220, prepTime: "10-15 min" },
  { name: "Spicy Tuna Roll", description: "Fresh tuna, spicy mayo, cucumber", price: 12.99, image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400", category: "Sushi Rolls", restaurant: restaurantIds[2], rating: 4.7, isVeg: false, calories: 290, prepTime: "12-18 min" },
  { name: "Miso Soup", description: "Traditional dashi broth, tofu, wakame, green onion", price: 3.99, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400", category: "Soups", restaurant: restaurantIds[2], rating: 4.5, isVeg: true, calories: 80, prepTime: "5-8 min" },
  // Taco Fiesta
  { name: "Street Tacos (3pc)", description: "Carne asada, cilantro, onion, salsa verde", price: 10.99, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400", category: "Tacos", restaurant: restaurantIds[3], rating: 4.5, isVeg: false, isFeatured: true, calories: 420, prepTime: "10-15 min" },
  { name: "Chicken Burrito", description: "Grilled chicken, rice, beans, cheese, salsa", price: 11.99, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400", category: "Burritos", restaurant: restaurantIds[3], rating: 4.4, isVeg: false, calories: 680, prepTime: "12-18 min" },
  { name: "Veggie Quesadilla", description: "Grilled peppers, onions, cheese, sour cream", price: 9.99, image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400", category: "Quesadillas", restaurant: restaurantIds[3], rating: 4.2, isVeg: true, calories: 520, prepTime: "10-15 min" },
  // The Green Bowl
  { name: "Rainbow Buddha Bowl", description: "Quinoa, roasted veggies, chickpeas, tahini dressing", price: 13.99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", category: "Bowls", restaurant: restaurantIds[4], rating: 4.7, isVeg: true, isFeatured: true, calories: 480, prepTime: "12-18 min" },
  { name: "Grilled Chicken Salad", description: "Mixed greens, grilled chicken, avocado, lemon vinaigrette", price: 14.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", category: "Salads", restaurant: restaurantIds[4], rating: 4.6, isVeg: false, calories: 350, prepTime: "10-15 min" },
  { name: "Açaí Bowl", description: "Organic açaí, banana, granola, fresh berries, honey", price: 11.99, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400", category: "Bowls", restaurant: restaurantIds[4], rating: 4.8, isVeg: true, calories: 310, prepTime: "8-12 min" },
  // Spice Garden
  { name: "Butter Chicken", description: "Tender chicken in rich tomato-cream sauce", price: 15.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", category: "Main Course", restaurant: restaurantIds[5], rating: 4.8, isVeg: false, isFeatured: true, calories: 580, prepTime: "20-30 min" },
  { name: "Paneer Tikka Masala", description: "Cottage cheese in spiced tomato-onion gravy", price: 14.99, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400", category: "Main Course", restaurant: restaurantIds[5], rating: 4.7, isVeg: true, calories: 490, prepTime: "18-25 min" },
  { name: "Garlic Naan", description: "Soft leavened bread with garlic butter", price: 3.99, image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400", category: "Breads", restaurant: restaurantIds[5], rating: 4.6, isVeg: true, calories: 180, prepTime: "8-12 min" },
  { name: "Mango Lassi", description: "Chilled yogurt drink with Alphonso mango", price: 4.99, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400", category: "Drinks", restaurant: restaurantIds[5], rating: 4.5, isVeg: true, calories: 210, prepTime: "5-8 min" },
  // The Breakfast Club
  { name: "Eggs Benedict", description: "Poached eggs, Canadian bacon, hollandaise on English muffin", price: 13.99, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400", category: "Breakfast", restaurant: restaurantIds[6], rating: 4.6, isVeg: false, isFeatured: true, calories: 620, prepTime: "15-20 min" },
  { name: "Avocado Toast", description: "Sourdough, smashed avocado, poached eggs, everything bagel spice", price: 11.99, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400", category: "Breakfast", restaurant: restaurantIds[6], rating: 4.7, isVeg: true, calories: 380, prepTime: "10-15 min" },
  { name: "Pancake Stack", description: "Fluffy buttermilk pancakes with maple syrup and berries", price: 10.99, image: "https://images.unsplash.com/photo-1587736032-2ce83c9af30f?w=400", category: "Breakfast", restaurant: restaurantIds[6], rating: 4.8, isVeg: true, calories: 720, prepTime: "12-18 min" },
  // Golden Dragon
  { name: "Dim Sum Basket", description: "Assorted steamed dumplings (8pcs)", price: 12.99, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400", category: "Dim Sum", restaurant: restaurantIds[7], rating: 4.5, isVeg: false, isFeatured: true, calories: 320, prepTime: "15-20 min" },
  { name: "Beef Fried Rice", description: "Wok-fried rice with tender beef and vegetables", price: 13.99, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400", category: "Rice", restaurant: restaurantIds[7], rating: 4.4, isVeg: false, calories: 560, prepTime: "15-20 min" },
  { name: "Kung Pao Chicken", description: "Spicy stir-fry with peanuts, chili peppers, vegetables", price: 14.99, image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400", category: "Main Course", restaurant: restaurantIds[7], rating: 4.6, isVeg: false, calories: 480, prepTime: "18-25 min" },
  // The Steakhouse
  { name: "Ribeye Steak", description: "12oz USDA Prime ribeye, truffle butter, roasted garlic", price: 45.99, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", category: "Steaks", restaurant: restaurantIds[8], rating: 4.9, isVeg: false, isFeatured: true, calories: 820, prepTime: "25-35 min" },
  { name: "NY Strip", description: "10oz New York strip, herb compound butter", price: 38.99, image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400", category: "Steaks", restaurant: restaurantIds[8], rating: 4.8, isVeg: false, calories: 720, prepTime: "22-30 min" },
  { name: "Lobster Mac & Cheese", description: "Maine lobster, three-cheese sauce, breadcrumb crust", price: 24.99, image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400", category: "Sides", restaurant: restaurantIds[8], rating: 4.7, isVeg: false, calories: 680, prepTime: "20-25 min" },
  // Pasta Corner
  { name: "Spaghetti Carbonara", description: "Guanciale, eggs, Pecorino, black pepper", price: 16.99, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400", category: "Pasta", restaurant: restaurantIds[9], rating: 4.7, isVeg: false, isFeatured: true, calories: 620, prepTime: "18-25 min" },
  { name: "Penne Arrabbiata", description: "Spicy tomato sauce, garlic, basil", price: 13.99, image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400", category: "Pasta", restaurant: restaurantIds[9], rating: 4.5, isVeg: true, calories: 490, prepTime: "15-20 min" },
  { name: "Truffle Risotto", description: "Arborio rice, black truffle, Parmesan, white wine", price: 19.99, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400", category: "Risotto", restaurant: restaurantIds[9], rating: 4.8, isVeg: true, calories: 540, prepTime: "25-35 min" },
  // Seoul Kitchen
  { name: "Korean BBQ Beef", description: "Marinated galbi short ribs, steamed rice, kimchi", price: 22.99, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400", category: "BBQ", restaurant: restaurantIds[10], rating: 4.8, isVeg: false, isFeatured: true, calories: 720, prepTime: "20-30 min" },
  { name: "Bibimbap", description: "Mixed rice bowl with veggies, egg, gochujang sauce", price: 14.99, image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400", category: "Rice Bowls", restaurant: restaurantIds[10], rating: 4.7, isVeg: false, calories: 490, prepTime: "15-20 min" },
  { name: "Japchae", description: "Stir-fried glass noodles with vegetables and beef", price: 13.99, image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400", category: "Noodles", restaurant: restaurantIds[10], rating: 4.6, isVeg: false, calories: 420, prepTime: "15-20 min" },
  // The Dessert Lab
  { name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center, vanilla ice cream", price: 8.99, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400", category: "Cakes", restaurant: restaurantIds[11], rating: 4.9, isVeg: true, isFeatured: true, calories: 480, prepTime: "12-15 min" },
  { name: "Artisan Ice Cream (3 scoops)", description: "Choose from 20+ housemade flavors", price: 7.99, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400", category: "Ice Cream", restaurant: restaurantIds[11], rating: 4.8, isVeg: true, calories: 380, prepTime: "5-8 min" },
  { name: "Crème Brûlée", description: "Classic French custard with caramelized sugar crust", price: 9.99, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400", category: "Desserts", restaurant: restaurantIds[11], rating: 4.7, isVeg: true, calories: 320, prepTime: "10-15 min" },
  { name: "Macarons (6pc)", description: "Assorted French macarons in seasonal flavors", price: 10.99, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400", category: "Pastries", restaurant: restaurantIds[11], rating: 4.8, isVeg: true, calories: 280, prepTime: "5-8 min" },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodstore');
    console.log('Connected to MongoDB');

    await Restaurant.deleteMany();
    await Food.deleteMany();
    await Review.deleteMany();
    console.log('Cleared existing data');

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log(`✅ ${createdRestaurants.length} restaurants seeded`);

    const restaurantIds = createdRestaurants.map(r => r._id);
    const foods = getFoods(restaurantIds);
    const createdFoods = await Food.insertMany(foods);
    console.log(`✅ ${createdFoods.length} foods seeded`);

    console.log('🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedData();
