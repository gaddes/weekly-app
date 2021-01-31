import { useSelector } from 'react-redux';
import isNumber from 'lodash/isNumber';
import userModel from '../data/store/user';

export default function useDaysSinceLastLogin() {
  const { selectLastLogin } = userModel.selectors;
  const millisecondsInOneDay = 1000 * 60 * 60 * 24;

  const currentDate = new Date();
  // Zero hours i.e. set to midnight on current day
  currentDate.setHours(0, 0, 0);

  const lastLogin = useSelector(selectLastLogin);

  // If lastLogin is not a number, this means the app has loaded for the first time
  //  and the value has not yet been set in state.
  if (!isNumber(lastLogin)) return undefined;

  // Convert value in milliseconds to Date object.
  // Value from store is in milliseconds because Date object is not serializable.
  const lastLoginDate = new Date(lastLogin);
  // Zero hours i.e. set to midnight on current day
  lastLoginDate.setHours(0, 0, 0);

  // Calculate difference in milliseconds and convert this to days.
  // Return value SHOULD be integer because both dates have been zeroed,
  //  but timing issues (i.e. when the variables were created)
  //  means there is usually a fraction of a millisecond difference...
  // To get around this we use Math.abs (to ensure we don't return -0)
  //  and Math.round (to get rid of the 0.000000000012 difference)
  return Math.abs(Math.round(
    (currentDate - lastLoginDate) / millisecondsInOneDay
  ));
}