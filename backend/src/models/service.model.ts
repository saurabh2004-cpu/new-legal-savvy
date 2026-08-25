import mongoose, { Schema, Document, Types } from "mongoose";

export interface IService {
  name: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  relatedServices?: Types.ObjectId[] | IService[];
  clientsAssisted?: string;
  highlight?: string;
  startingFrom?: string;
  fullDescription?: string;
  shortDescriptionPoints?: string[];
}

export interface ServiceDocument extends IService, Document { }

const serviceSchema = new Schema<ServiceDocument>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Service slug is required"],
      unique: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: [true, "Service image URL/path is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    relatedServices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    clientsAssisted: {
      type: String,
      trim: true,
    },
    highlight: {
      type: String,
      trim: true,
    },
    startingFrom: {
      type: String,
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    shortDescriptionPoints: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<ServiceDocument>("Service", serviceSchema);
