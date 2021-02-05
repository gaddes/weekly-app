import { Alert } from 'react-native';
import { taskLimitFree } from '../../../helpers';

export default function alertTaskLimit() {
  return (
    Alert.alert(
      `Please upgrade to add more than ${taskLimitFree} tasks! ☝️`
    )
  );
};