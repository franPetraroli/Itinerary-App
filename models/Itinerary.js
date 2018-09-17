const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Location = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  region: {
    type: String
  },
  city: {
    type: String
  },
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

const Comment = new Schema({
  comment: {
    type: String
  },
  user: {
    type: String
  }
});

const ItinerarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  itinerary: {
    type: [Location],
    required: true
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [Comment]
  },
  user: {
    type: String
  }
});

ItinerarySchema.index({
  '$**': 'text'
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
