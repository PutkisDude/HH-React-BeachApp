import AsyncStorage from '@react-native-async-storage/async-storage';

const saveKey = async (item, value) => {
    try {
      await AsyncStorage.setItem(item, value)
    } catch (e) {
      console.log(e);
    }
  }

  const getKey = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    }catch(e){
        console.log(e)
    }
  }

  module.exports = {saveKey, getKey };

  