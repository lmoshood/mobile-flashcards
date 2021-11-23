import React, { Component } from 'react'
import { View, Text,Platform, TextInput, KeyboardAvoidingView,
   TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../utils/styles'
import { addDeck, ShowAlert } from '../utils/api'
import { addDecks } from '../actions'
import { white, CyanA100 } from '../utils/colors'


const SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={ Platform.OS === 'ios' ? styles.AddDeckiosSubmitBtn : styles.AddDeckandroidSubmitBtn }
      onPress={ onPress }>
        <Text style={ styles.AddDecksubmitBtnText }>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: ''
  }

  handleChange = (title) => {
    this.setState(() => ({ title }))
  }

  submit = () => {
    const { dispatch } = this.props
    const { title } = this.state
    const key = this.state.title

    if (title.length === 0) {
      ShowAlert(
        "Invalid Input",
        "Please enter title for new deck"
      );
    } else {
      const entry = {
        title,
        questions: []
      }

      // Add deck to store
      dispatch(addDecks({
        [key]: entry
      }))
      this.setState(() => ({
        title: ''
      }))
      this.moveToDecks(title)
      addDeck({ key, entry })
    }
  }
  // routes the user to the Individual Deck view for the new deck.
  moveToDecks = (title) => {
    const { navigation } = this.props
    navigation.navigate('Deck', { title })
  }

  render() {
    const value = this.state.title
// Render The view includes a form for creating a new deck -
//  which should just be an input for the title and a 'Create Deck' button.
    return(
      <View style={ styles.AddDeckcontainer }>
        <Text style={ styles.AddDeckheader }>
          Create Deck
        </Text>
        <KeyboardAvoidingView style={ styles.inputContainer } behavior='padding' enabled>
          <View>
          <TextInput
            style={ styles.AddDeckinput }
            placeholder={ 'Add Deck Title' }
            value={ value }
            onChangeText={ this.handleChange }
           />
          {/* Pressing the button correctly creates the deck */}
        <SubmitButton onPress={ this.submit } style={ styles.Deckbutton , {marginTop: 100,} }/>
        </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}


function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)
