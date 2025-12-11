import mongoose from 'mongoose';

const securityDemoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['user', 'comment'],
    required: true
  },
  username: {
    type: String,
    sparse: true
  },
  password: {
    type: String,
    sparse: true
  },
  comment: {
    type: String,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SecurityDemo = mongoose.model('SecurityDemo', securityDemoSchema);

export default SecurityDemo;
