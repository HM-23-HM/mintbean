import React from 'react'
import Card from './card'
import styles from './css/cards.module.css'

const PlayerOne = ({cards, areOptionsVisible}) => {


    return(
        <span>
            {cards && cards.map((card) => (
                <Card 
                    key={card.suite+card.symbol}
                    suite={card.suite}
                    symbol={card.symbol}
                    className={styles.playerOneDeck}
                    />
            ))}

        </span>
    )
}

export default PlayerOne