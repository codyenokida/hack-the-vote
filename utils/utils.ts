import { Timestamp } from "firebase/firestore";

/**
 * Checks if the given Firestore Timestamp represents today's date.
 *
 * @param {firebase.firestore.Timestamp} timestamp - The Firestore Timestamp object to check.
 * @returns {boolean} Returns true if the Timestamp represents today's date, false otherwise.
 */
export function isToday(timestamp: Timestamp | null): boolean {
  if (!timestamp) {
    return false;
  }

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const todayEnd = new Date(todayStart.getTime() + 86400000); // Add 24 hours in milliseconds

  const timestampDate = timestamp.toDate();

  return timestampDate >= todayStart && timestampDate < todayEnd;
}
