import { user } from '../../api';

// Actions taken from slice, to be re-exported by this file.
// Components wishing to use the store actions should import from this file only.
import { setSubscription } from './reducers';

const fetchSubscription = () => async dispatch => {
  const subscription = await user.getSubscriptionStatus();
  dispatch(setSubscription(subscription));
};

export default {
  fetchSubscription,
};