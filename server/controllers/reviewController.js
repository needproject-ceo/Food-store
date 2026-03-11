const Review = require('../models/Review');
const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

exports.getReviews = async (req, res) => {
  try {
    const { restaurant, food } = req.query;
    const query = {};
    if (restaurant) query.restaurant = restaurant;
    if (food) query.food = food;
    const reviews = await Review.find(query).populate('user', 'name avatar').sort('-createdAt');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { restaurant, food, rating, comment } = req.body;
    const review = await Review.create({ user: req.user.id, restaurant, food, rating, comment });
    if (food) {
      const reviews = await Review.find({ food });
      const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
      await Food.findByIdAndUpdate(food, { rating: avg.toFixed(1), reviewCount: reviews.length });
    }
    if (restaurant) {
      const reviews = await Review.find({ restaurant });
      const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
      await Restaurant.findByIdAndUpdate(restaurant, { rating: avg.toFixed(1), reviewCount: reviews.length });
    }
    const populated = await review.populate('user', 'name avatar');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
