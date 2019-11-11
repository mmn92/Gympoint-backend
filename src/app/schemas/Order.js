import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    student: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: false,
      default: null,
    },
    answeredAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrderSchema);
