import React from 'react'
import deck from './img/deck.jpg'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    remDeck: state.get('remainingDeck').length
})


const Deck = (props) => {
    return (
        <div>
        <img 
        src={deck}
        style={styles.deck}
        />
        <p>{`${props.remDeck} cards remaining in the deck`}</p>
        </div>
    )
}

export default connect(mapStateToProps)(Deck)

const styles = {
    deck: {
        height: 150,
        width: 150
    }
}