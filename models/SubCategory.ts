import mongoose, { Schema } from "mongoose";

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.SubCategory ||
mongoose.model("SubCategory", SubCategorySchema);