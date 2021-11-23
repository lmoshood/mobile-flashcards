import AsyncStorage  from '@react-native-async-storage/async-storage'
import { QUIZ_STORAGE_KEY, setData } from './Mockups'
import {Alert} from 'react-native'

export async function getAllDecks() {
  const result = await AsyncStorage.getItem(QUIZ_STORAGE_KEY)
  return setData(result)
}

export function addDeck({ deckID, entry }) {
  return AsyncStorage.mergeItem(QUIZ_STORAGE_KEY, JSON.stringify({
    [deckID]: entry
  }))
}


export const ShowAlert = (title, msg) => {
  Alert.alert(
    title,
    msg,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}