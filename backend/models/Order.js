const mongoose = require('mongoose')

const pcbSpecsSchema = new mongoose.Schema({
  layers: { type: Number, required: true },
  size: {
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  quantity: { type: Number, required: true }
})

const calculatedSpecsSchema = new mongoose.Schema({
  fileId: { type: String },
  fileType: { type: String },
  fileSize: { type: Number },
  pcbSpecs: { type: pcbSpecsSchema },
  urgency: { type: String, enum: ['low', 'medium', 'high', 'normal'] }
})

const priceDetailsSchema = new mongoose.Schema({
  basePrice: { type: Number },
  multipliers: {
    service: { type: Number },
    complexity: { type: Number },
    urgency: { type: Number }
  }
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  orderType: {
    type: String,
    enum: ['standard', 'custom'],
    default: 'standard'
  },
  serviceType: {
    type: String,
    required: true
  },
  customSpecs: {
    designFile: String,
    designNotes: String,
    calculatedSpecs: calculatedSpecsSchema
  },
  price: {
    total: { type: Number, required: true },
    currency: { type: String, default: 'TRY' },
    details: priceDetailsSchema
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'production', 'shipping', 'delivered', 'cancelled'],
    default: 'pending'
  },
  statusHistory: [{
    status: String,
    note: String,
    date: { type: Date, default: Date.now }
  }],
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending'
    },
    method: String,
    transactionId: String,
    amount: Number,
    currency: String,
    date: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema) 