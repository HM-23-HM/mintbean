import React from 'react'
import symbol from './img/AI_cards.jpg'
import styles from './css/artificial.module.css'

const AI_player = ({ cards, sets, myTurn, asked }) => {

let AIcards = cards

    return(
        <div 
        >
            <img src={symbol} className={styles.symbol}/>
            <p>{`Number of sets = ${sets}`}</p>
        </div>
    )
}

export default AI_player

// const styles = {
//     container: {
//         border: '1px solid',
//         height: 250,
//         width: 200,
//         margin: 10
//     },
//     symbol: {
//         height: 200,
//         width: 200
//     },
    
// }