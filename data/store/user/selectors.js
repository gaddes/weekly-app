import isEmpty from 'lodash/isEmpty';

// Complete subscription object
const selectSubscription = state => state.user.subscription;
// Boolean value indicating whether user has pro subscription
const selectIsPro = state => !isEmpty(state.user.subscription);

export default {
  selectSubscription,
  selectIsPro,
};