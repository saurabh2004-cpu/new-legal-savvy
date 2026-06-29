import mongoose, { Schema, Document } from "mongoose";

export interface IWorkingDayTiming {
  from: string;
  to: string;
  openingTime: string;
  closingTime: string;
}

export interface IWorkingDayWeekend {
  from: string;
  to: string;
  status: "Open" | "Closed";
  openingTime: string;
  closingTime: string;
}

export interface IWorkingDays {
  weekDays: IWorkingDayTiming;
  weekEnds: IWorkingDayWeekend;
}

export interface IAddress {
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  workingDays?: IWorkingDays;
}

export interface AddressDocument extends IAddress, Document {}

const addressSchema = new Schema<AddressDocument>(
  {
    addressLine1: {
      type: String,
      required: [true, "Address Line 1 is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      trim: true,
    },
    workingDays: {
      weekDays: {
        from: {
          type: String,
          default: "Mon",
        },
        to: {
          type: String,
          default: "Fri",
        },
        openingTime: {
          type: String,
          default: "7:30 AM",
        },
        closingTime: {
          type: String,
          default: "6:00 PM",
        },
      },
      weekEnds: {
        from: {
          type: String,
          default: "Sat",
        },
        to: {
          type: String,
          default: "Sun",
        },
        status: {
          type: String,
          enum: ["Open", "Closed"],
          default: "Closed",
        },
        openingTime: {
          type: String,
          default: "",
        },
        closingTime: {
          type: String,
          default: "",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model<AddressDocument>("Address", addressSchema);
