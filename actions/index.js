export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const GET_DECKS = 'GET_DECKS'
export const ADDNEW_DECKSS = 'ADDNEW_DECKSS'



export const DisplayDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}

export const addDecks = (deck) => {
  return {
    type: ADDNEW_DECKSS,
    deck
  }
}


export const addCardToDeck = (title, card) => {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  }
}
