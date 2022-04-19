import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (item, value) => {
    try {
      await AsyncStorage.setItem(item, value)
    } catch (e) {
      console.log(e);
    }
  }

  const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    }catch(e){
        console.log(e)
    }
  }

  const saveMultiple = async (data) => {
    try {
      await AsyncStorage.multiSet(data);
    } catch (error) {
      console.log(error);
    }
  };


  const getMultiple = async (data) => {
    try {
      const savedData = await AsyncStorage.multiGet(data);
      console.log(savedData);
      return savedData;
    } catch (error) {
      console.log(error);
    }
  };


  module.exports = {save, get, saveMultiple, getMultiple };

  