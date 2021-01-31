import isEmpty from 'lodash/isEmpty';

// Complete subscription object
const selectSubscription = state => state.user.subscription;
// Boolean value indicating whether user has pro subscription
const selectIsPro = state => !isEmpty(state.user.subscription);
// Date of user's last login in milliseconds
const selectLastLogin = state => state.user.lastLogin;

export default {
  selectSubscription,
  selectIsPro,
  selectLastLogin,
};