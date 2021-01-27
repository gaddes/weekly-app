import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialCurrent, initialArchive } from '../../helpers';

export default {
  getCurrent: async () => {
    try {
      const tasks = await AsyncStorage.getItem('current');
      // If no tasks exist (e.g. first app load), return base array
      return tasks !== null ? JSON.parse(tasks) : initialCurrent;
    } catch (e) {
      console.log('error', e);
    }
  },

  setCurrent: async tasks => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('current', jsonTasks);
    } catch (e) {
      console.error(e);
    }
  },

  getArchive: async () => {
    try {
      const tasks = await AsyncStorage.getItem('archive');
      // If no tasks exist (e.g. first app load), return base array
      return tasks !== null ? JSON.parse(tasks) : initialArchive;
    } catch (e) {
      console.log('error', e);
    }
  },

  setArchive: async tasks => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('archive', jsonTasks);
    } catch (e) {
      console.error(e);
    }
  },
};