import * as SecureStore from 'expo-secure-store';

export async function saveCookie(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
 export async function getCookie(key) {
    let result = await SecureStore.getItemAsync(key);
    
    if (result) {
      
      return result
    } else {
      return undefined
    }
  }

  export async function deleteCookie(key) {
    await SecureStore.deleteItemAsync(key);
  }
  