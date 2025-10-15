import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'hospital_admin', 'super_admin'],
    default: 'user',
  },
  profile: {
    name: { type: String },
    avatarUrl: { type: String },
    bio: { type: String },
    language: { type: String },
    license: { type: String }, // For doctors
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
