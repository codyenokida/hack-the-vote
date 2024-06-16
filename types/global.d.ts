import { Timestamp } from "firebase/firestore";

export {};

declare global {
  /**
   * User information
   */
  interface User {
    user_id: string;
    name: string;
    email: string;
    points: number;
    accessories: Accessory[];
    num_daily_streak: number;
    last_completed_challenge_date?: Timestamp;
  }

  /**
   * Accessory information
   */
  type AccessoryType = "Headwear" | "Body" | "Pants" | "Lefthand" | "Righthand";

  interface Accessory {
    accessory_id: string;
    accessory_name: string;
    cost: number;
    type: AccessoryType;
  }

  interface ImageCarouselItem {
    id: number;
    uri: string;
    title: string;
  }
}
