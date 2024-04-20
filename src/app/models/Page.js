import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, unique: true, min: 1 },
    owner: { type: String, required: true}
  },
  { timestamps: true }
);

export const Page = models?.Page || model('Page', PageSchema)