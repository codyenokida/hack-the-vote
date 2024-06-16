import {
  addAccessory,
  getUser,
  subtractUserPoints,
} from "../lib/firebase/firestore";

export async function redeemAccessoryForPoints(
  userId: string,
  accessory: Accessory
) {
  try {
    await subtractUserPoints(userId, accessory.cost);
    await addAccessory(userId, accessory);
    return true;
  } catch (e) {
    console.error(e);
  } finally {
    return false;
  }
}
