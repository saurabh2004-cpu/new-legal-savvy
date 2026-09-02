import mongoose, { Schema, Document } from "mongoose";

export interface ILabel {
  type: "city" | "state" | "bank";
  name: string;
  slug?: string;
  image?: string;
  isFeatured?: boolean;
}

export interface LabelDocument extends ILabel, Document { }

const labelSchema = new Schema<LabelDocument>(
  {
    type: {
      type: String,
      required: [true, "Label type is required (city, state, or bank)"],
      enum: {
        values: ["city", "state", "bank"],
        message: "{VALUE} is not a valid label type (must be city, state, or bank)",
      },
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Label name is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Label = mongoose.model<LabelDocument>("Label", labelSchema);
