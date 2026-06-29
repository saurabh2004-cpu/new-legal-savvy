import mongoose, { Schema, Document } from "mongoose";

export interface IKeyword {
  keyword: string;
  status: "pending" | "completed";
}

export interface KeywordDocument extends IKeyword, Document {}

const keywordSchema = new Schema<KeywordDocument>(
  {
    keyword: {
      type: String,
      required: [true, "Keyword is required"],
      unique: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "completed"],
        message: "{VALUE} is not a valid status (must be pending or completed)",
      },
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Keyword = mongoose.model<KeywordDocument>("Keyword", keywordSchema);
