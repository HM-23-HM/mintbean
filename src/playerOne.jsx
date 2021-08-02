import React from 'react'
import Card from './card'
import styles from './css/cards.module.css'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    P_1_sets: state.get('P_1_sets'),
})

const PlayerOne = (props) => {


    return(
        <div>
            
            <span>
            {props.cards && props.cards.map((card) => (
                <Card 
                    key={card.suite+card.symbol}
                    suite={card.suite}
                    symbol={card.symbol}
                    className={styles.playerOneDeck}
                    />
            ))}

        </span>
        </div>
    )
}

export default connect(mapStateToProps)(PlayerOne)