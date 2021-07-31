import React from 'react'
import deck from './img/deck.jpg'

const Deck = () => {
    return (
        <img 
        src={deck}
        style={styles.deck}
        />
    )
}

export default Deck

const styles = {
    deck: {
        height: 150,
        width: 150
    }
}