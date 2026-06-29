import { AdminDocument } from "../models/admin.model.js";

declare global {
  namespace Express {
    interface Request {
      admin?: AdminDocument;
    }
  }
}
