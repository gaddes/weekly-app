/**
 * Arrays to help convert an index 0-6 representing Sun-Sat
 * into one from 0-6 representing Mon-Sun.
 */
const currentDayIndices = [6, 0, 1, 2, 3, 4, 5];
const previousDayIndices = [5, 6, 0, 1, 2, 3, 4];

export default function useDayIndices() {
  const date = new Date();
  const idx = date.getDay(); // Integer from 0-6 representing Sun-Sat

  /**
   * Date.prototype.getDay() returns Sun-Sat as 0-6, so we must
   * convert it to a normal-person week, where the first day is Monday.
   *
   * This return object contains "corrected" integers from 0-6 representing Mon-Sun.
   */
  return {
    currentDayIdx: currentDayIndices[idx],
    previousDayIdx: previousDayIndices[idx],
  };
}