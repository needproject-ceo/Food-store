const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  cuisine: [{ type: String }],
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  image: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  deliveryTime: { type: String, default: '30-45 min' },
  deliveryFee: { type: Number, default: 2.99 },
  minOrder: { type: Number, default: 10 },
  isOpen: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  priceRange: { type: String, enum: ['$', '$$', '$$$', '$$$$'], default: '$$' },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
