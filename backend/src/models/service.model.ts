import mongoose, { Schema, Document, Types } from "mongoose";

export interface IServiceFaq {
  question: string;
  answer: string;
}

export interface IService {
  name: string;
  title: string;
  slug: string;
  image: string;
  homePage: {
    tag: string;
    title: string;
    description: string;
    image?: string;
    stats: {
      label: string;
      value: string;
    }[];
  };
  showOnHomePage: boolean;
  sequence: number;
  metaTitle?: string;
  metaDescription?: string;
  description: string;
  relatedServices?: Types.ObjectId[] | IService[];
  clientsAssisted?: string;
  highlight?: string;
  startingFrom?: string;
  fullDescription?: string;
  shortDescriptionPoints?: string[];
  faqs?: IServiceFaq[];
}

export interface ServiceDocument extends IService, Document { }

const serviceFaqSchema = new Schema<IServiceFaq>(
  {
    question: {
      type: String,
      required: [true, "FAQ question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "FAQ answer is required"],
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const serviceHomePageSchema = new Schema(
  {
    tag: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    stats: [
      {
        label: {
          type: String,
          trim: true,
        },
        value: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    _id: false,
  }
);

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

    homePage: {
      type: serviceHomePageSchema,
      required: false,
    },

    showOnHomePage: {
      type: Boolean,
      default: false,
    },

    sequence: {
      type: Number,
      unique: true,
      min: 1,
    },

    metaTitle: {
      type: String,
      trim: true,
    },

    metaDescription: {
      type: String,
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
    faqs: {
      type: [serviceFaqSchema],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model<ServiceDocument>("Service", serviceSchema);
