import React, { Component } from 'react'
import { View, Text} from 'react-native'
import { connect } from 'react-redux'
import { pink } from '../utils/colors'
import TextButton from './TextButton'
import styles from '../utils/styles'
import {ShowAlert} from '../utils/api'


class Deck extends Component {
   
   handleQuizGame = () => {
    const { navigation, title, cardsCount } = this.props
   // Adding same alert here.
    if (cardsCount === 0) {
      ShowAlert("Invalid Deck Input",
      "Please Add cards to this deck");
    } else {
      navigation.navigate('Quiz', { title })
    }
  }

  handleAddCards = () => {
    const { title, navigation } = this.props
    navigation.navigate('AddNewCard', { title })
  
  }

  render() {
    const { title, cardsCount } = this.props
 
    return (
      <View style={ styles.Deckcontainer}>
        <View style= {styles.deckCard }>
          <Text style={ styles.Deckheader }>
            { title }
          </Text>
          <Text style={ styles.DecksubHeader }>
            { cardsCount <= 1
              ? cardsCount + ' card'
              : cardsCount + ' cards'
            }
          </Text>
        </View>
        <View>
       
          <TextButton
            style={ [styles.Deckbutton, { backgroundColor: pink }] }
            onPress={ this.handleQuizGame }>
              Start Quiz
          </TextButton>
          <TextButton
            style={ [styles.Deckbutton, { backgroundColor: pink }] }
            onPress={ this.handleAddCards }>
              Add New Card
          </TextButton>
          </View>
      </View>
    )
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { title } = navigation.state.params
  const cardsCount = decks[title].questions.length
  const deck = decks[title];
  return {
    deck,
    title,
    cardsCount
  }
}

export default connect(mapStateToProps)(Deck)
