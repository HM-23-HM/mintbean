import React, { useState } from "react";
import { connect } from "react-redux";
import AI_player from "./AI_player";
import Deck from "./deck";
import PlayerOne from "./playerOne";
import Options from './options'
import styles from './css/connected.module.css'

const mapStateToProps = (state) => ({
  playerOneCards: state.get("P_1"),
  AI_1_cards: state.get("AI_1"),
  AI_2_cards: state.get("AI_2"),
  AI_3_cards: state.get("AI_3"),
});

const ConnectedComponent = (props) => {

const mapAItoCards = new Map()
const whoseTurnItIs = new Map()

mapAItoCards.set('AI_1', props.AI_1_cards)
mapAItoCards.set('AI_2', props.AI_2_cards)
mapAItoCards.set('AI_3', props.AI_3_cards)

whoseTurnItIs.set(1,'P_1')
whoseTurnItIs.set(2,'AI_1')
whoseTurnItIs.set(3,'AI_2')
whoseTurnItIs.set(4,'AI_3')

let whoseTurn = 0;
let playersTurn = "P_1"

  const nextPlayersTurn = () => {
    if (whoseTurn == 4) {
      whoseTurn = 1;
      console.log("It's your turn");
    } else {
      whoseTurn++
      playersTurn = whoseTurnItIs.get(whoseTurn)
      console.log(`It is now ${playersTurn} turn`)
    }

  } 

  const highlightPlayer = () => {
    if (whoseTurn == 4) {
      whoseTurn = 1;

      console.log("It's your turn");
    } else {
      whoseTurn++;
      console.log("It's his turn ", whoseTurn);
    }
  };

  const askPlayer = (playerId) => {
    setBeingAsked(playerId)
    alert(`Please select an option to ask ${playerId} for`)
}

  const { playerOneCards, AI_1_cards, AI_2_cards, AI_3_cards } = props;

  const [beingAsked, setBeingAsked] = useState("P_1");

  let options = []
    if(playerOneCards){
        playerOneCards.forEach((card) => {
        let option = card.symbol
        if (!options.includes(option)){
            options.push(option)
        }
    })
}

  return (
    <div className={styles.container}>
      <div 
      onClick={() => askPlayer("AI_1")}
      className={styles.artificial_1}
      >
        <AI_player
          id={"AI_1"}
          cards={AI_1_cards}
          asked={beingAsked == "AI_1" ? true : false}
          className="AI_container"
        />
      </div>

      <div 
      onClick={() => askPlayer("AI_2")}
      className={styles.artificial_2}
      >
        <AI_player
          id={"AI_2"}
          cards={AI_2_cards}
          asked={beingAsked == "AI_2" ? true : false}
        />
      </div>

      <div 
      onClick={() => askPlayer("AI_3")}
      className={styles.artificial_3}
      
      >
        <AI_player
          id={"AI_3"}
          cards={AI_3_cards}
          asked={beingAsked == "AI_3" ? true : false}
        />
      </div>

      <div className={styles.deck}>
        <Deck />
      </div>

      <div
      className={styles.playerOne}
      >
        <PlayerOne
          id={"P_1"}
          cards={playerOneCards}
          asked={beingAsked == "P_1" ? true : false}
        />
           { playersTurn =='P_1' && 
           <Options 
           options={options}
           beingAsked={beingAsked}/> }

      </div>

      <div className={styles.nextPlayerButton}>
        <button
        onClick={() => nextPlayersTurn()}
        >Next Player's Turn</button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(ConnectedComponent);
