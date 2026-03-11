const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
  try {
    const { category, restaurant, search, featured, page = 1, limit = 20 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (restaurant) query.restaurant = restaurant;
    if (featured) query.isFeatured = true;
    if (search) query.name = { $regex: search, $options: 'i' };
    const skip = (page - 1) * limit;
    const foods = await Food.find(query).populate('restaurant', 'name image deliveryTime').skip(skip).limit(Number(limit));
    const total = await Food.countDocuments(query);
    res.json({ foods, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Food.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
