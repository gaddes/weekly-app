import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  getCurrent: async () => {
    try {
      const tasks = await AsyncStorage.getItem('current');
      return tasks !== null ? JSON.parse(tasks) : null;
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
      return tasks !== null ? JSON.parse(tasks) : null;
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