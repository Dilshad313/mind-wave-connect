import mongoose from 'mongoose';

const brainwaveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags) {
          return tags.length <= 10; // Max 10 tags
        },
        message: 'Maximum 10 tags allowed per brainwave',
      },
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
brainwaveSchema.index({ category: 1 });
brainwaveSchema.index({ createdAt: -1 });
brainwaveSchema.index({ likes: -1 });
brainwaveSchema.index({ isPublic: 1 });
brainwaveSchema.index({ user: 1 });

const Brainwave = mongoose.model('Brainwave', brainwaveSchema);

export default Brainwave;