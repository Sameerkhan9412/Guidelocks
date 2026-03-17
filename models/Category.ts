import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Category ||
mongoose.model("Category", CategorySchema);