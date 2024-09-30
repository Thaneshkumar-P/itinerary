import { Schema, model } from  "mongoose";

export type ItineraryDocument = {
  _id: string;
  title: string;
  subTitle: string;
  template: string;
  days: number;
  overview: string;
  stay: string;
  meals: string;
  transport: string;
  offer: string;
  client: string;
  locations: Location[]
  toc: SVG[]
  included: SVG[]
  excluded: SVG[]
}

export type Location = {
  locationName: string;
  locationDays: string;
  nights: string;
  date: string;
  locationStay: string;
  locationMeals: string;
  locationHighlight: string;
  overview: string;
  images: string[]; 
}

export type BasicInfo = {
  title: string;
  subTitle: string;
  template: string;
  days: number;
  overview: string;
  stay: string;
  meals: string;
  transport: string;
  offer: string;
  client: string;
}

export type SVG = {
  text: string;
  svg: string;
}
const LocationSchema = new Schema({
  locationName: { type: String, required: true },
  locationDays: { type: String, required: true },
  nights: { type: String, required: true },
  date: { type: String, required: true },
  locationStay: { type: String, required: true },
  locationMeals: { type: String, required: true },
  locationHighlight: { type: String, required: true },
  overview: { type: String, required: true },
  images: [{ type: String, required: true }], 
});

const SVGScheme = new Schema({
  text: { type: String, required: true },
  svg: { type: String, required: true }, 
});

const ItinerarySchema = new Schema({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  template: { type: String, required: true },
  days: { type: Number, required: true },
  overview: { type: String, required: true },
  stay: { type: String, required: true },
  meals: { type: String, required: true },
  transport: { type: String, required: true },
  offer: { type: String, required: true },
  client: { type: String, required: true },
  locations: [LocationSchema],
  toc: [SVGScheme],
  included: [SVGScheme],
  excluded: [SVGScheme],
}, {
  timestamps: true,
});

export const Itinerary = model<Document>('Itinerary', ItinerarySchema);
