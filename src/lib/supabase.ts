import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      return AsyncStorage.getItem(key)
    } else {
      return SecureStore.getItemAsync(key);
    }
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      return AsyncStorage.setItem(key, value);
    } else {
      return SecureStore.setItemAsync(key, value);
    }
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      // AsyncStorage.(key);
    } else {
      SecureStore.deleteItemAsync(key);
    }
  },
};

// class LargeSecureStore {
//   private async _encrypt(key: string, value: string) {
//     const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

//     const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
//     const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

//     await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));

//     return aesjs.utils.hex.fromBytes(encryptedBytes);
//   }

//   private async _decrypt(key: string, value: string) {
//     const encryptionKeyHex = await SecureStore.getItemAsync(key);
//     if (!encryptionKeyHex) {
//       return encryptionKeyHex;
//     }

//     const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
//     const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

//     return aesjs.utils.utf8.fromBytes(decryptedBytes);
//   }

//   async getItem(key: string) {
//     const encrypted = await AsyncStorage.getItem(key);
//     if (!encrypted) { return encrypted; }

//     return await this._decrypt(key, encrypted);
//   }

//   async removeItem(key: string) {
//     await AsyncStorage.removeItem(key);
//     await SecureStore.deleteItemAsync(key);
//   }

//   async setItem(key: string, value: string) {
//     const encrypted = await this._encrypt(key, value);

//     await AsyncStorage.setItem(key, encrypted);
//   }
// }

const supabaseUrl = 'https://jyhdopgtmhbqbtuqaado.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5aGRvcGd0bWhicWJ0dXFhYWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NzQyMDgsImV4cCI6MjA0MjA1MDIwOH0.fYtt1GozqJ4eTO0zkLsEB8rXcvtOc1cP6tZTlidjhJE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});