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

  const saveMultiple = async (data) => {
    try {
      await AsyncStorage.multiSet(data);
    } catch (error) {
      console.log(error);
    }
  };


  const getMultiple = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const items = await AsyncStorage.multiGet(keys)
        return items
    } catch (error) {
        console.log(error, "problemo")
    }
}


  module.exports = {saveKey, getKey, saveMultiple, getMultiple };

  