import mongoose, { Schema } from "mongoose";

const LockSchema = new Schema(
{
  name: String,

  slug: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  description: String,

  features: [String],

  images: [String]
},
{ timestamps: true }
);

export default mongoose.models.Lock ||
mongoose.model("Lock", LockSchema);