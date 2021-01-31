import { user } from '../../api';

// Actions taken from slice, to be re-exported by this file.
// Components wishing to use the store actions should import from this file only.
import { setSubscription, setLastLogin } from './reducers';

const fetchInitialUserData = () => async dispatch => {
  const lastLogin = await user.getLastLogin();
  dispatch(setLastLogin(lastLogin));
};

const fetchSubscription = () => async dispatch => {
  const subscription = await user.getSubscriptionStatus();
  dispatch(setSubscription(subscription));
};

const saveLastLogin = () => dispatch => {
  const currentDateInMilliseconds = new Date().getTime();

  return user.setLastLogin(currentDateInMilliseconds)
    .then(dispatch(setLastLogin(currentDateInMilliseconds)))
    .catch(e => console.error(e));
}

export default {
  fetchInitialUserData,
  fetchSubscription,
  saveLastLogin,
};