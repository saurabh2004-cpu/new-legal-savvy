import mongoose, { Schema, Document } from "mongoose";

export interface IPageContent {
  page_slug: string;
  pagecontent: any; // Storing the raw JSON object
}

export interface PageContentDocument extends IPageContent, Document {}

const pageContentSchema = new Schema<PageContentDocument>(
  {
    page_slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    pagecontent: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PageContent = mongoose.model<PageContentDocument>("PageContent", pageContentSchema);