import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AI_player from "./AI_player";
import Deck from "./deck";
import PlayerOne from "./playerOne";
import Options from './options'
import styles from './css/connected.module.css'
import { myTurn } from './actions/actions'

const mapStateToProps = (state) => ({
  playerOneCards: state.get("P_1"),
  AI_1_cards: state.get("AI_1"),
  AI_2_cards: state.get("AI_2"),
  AI_3_cards: state.get("AI_3"),
  isP_1_Turn: state.get('P_1_turn'),
  isAI_1_Turn: state.get('AI_1_turn'),
  isAI_2_Turn: state.get('AI_2_turn'),
  isAI_3_Turn: state.get('AI_3_turn'),
  remDeck: state.get('remainingDeck').length,
  P_1_sets_length: state.get('P_1_sets').length,
  AI_1_sets_length: state.get('AI_1_sets').length,
  AI_2_sets_length: state.get('AI_2_sets').length,
  AI_3_sets_length: state.get('AI_3_sets').length,

});

const mapDispatchToProps = {
  dispatchMyTurn: (thisPlayersTurn, not1, not2, not3) => myTurn(thisPlayersTurn, not1, not2, not3)
}

let whoseTurn = 0;

let P_1_beingAsked = false
let AI_1_beingAsked = false
let AI_2_beingAsked = false
let AI_3_beingAsked = false

const ConnectedComponent = (props) => {

const mapAItoCards = new Map()
const whoseTurnItIs = new Map()

mapAItoCards.set('AI_1', props.AI_1_cards)
mapAItoCards.set('AI_2', props.AI_2_cards)
mapAItoCards.set('AI_3', props.AI_3_cards)

whoseTurnItIs.set(1,'P_1_turn')
whoseTurnItIs.set(2,'AI_1_turn')
whoseTurnItIs.set(3,'AI_2_turn')
whoseTurnItIs.set(4,'AI_3_turn')

let playersTurnArray = ['P_1_turn','AI_1_turn','AI_2_turn', 'AI_3_turn' ]

let P_1_final = props.P_1_sets_length
let AI_1_final = props.AI_1_sets_length
let AI_2_final = props.AI_2_sets_length
let AI_3_final = props.AI_3_sets_length

let finalScores = [P_1_final,AI_1_final,AI_2_final,AI_3_final]
let topScore = Math.max(...finalScores)

if(topScore == P_1_final){
  var winner = 'P_1'
} else if(topScore == AI_1_final){
  var winner = 'AI_1'
} else if(topScore == AI_2_final){
  var winner = 'AI_2'
} else {
  var winner = 'AI_3'
}

  const nextPlayersTurn = () => {
    if (whoseTurn == 4) {
      whoseTurn = 1;
      alert("It's your turn");
      let thisPlayersTurn = whoseTurnItIs.get(whoseTurn)
      let notTheirTurn = playersTurnArray.filter((element) => element != thisPlayersTurn)
      var [not1, not2, not3] = notTheirTurn
      props.dispatchMyTurn(thisPlayersTurn, not1, not2, not3)
    } else {
      whoseTurn++
      let thisPlayersTurn = whoseTurnItIs.get(whoseTurn)
      let notTheirTurn = playersTurnArray.filter((element) => element != thisPlayersTurn)
      var [not1, not2, not3] = notTheirTurn
      props.dispatchMyTurn(thisPlayersTurn, not1, not2, not3)
      // console.log(`It is now ${thisPlayersTurn} turn`)
    }

  } 

  const highlightPlayer = (whoseTurn) => {
    switch(whoseTurn){
      case 1:{

      }
      case 2:{

      }
      case 3: {

      }
      case 4: {

      }
    }
  };

  const askPlayer = (playerId) => {
    setBeingAsked(playerId)
    alert(`Please select an option to ask ${playerId} for`)
}


  const [beingAsked, setBeingAsked] = useState("AI_1");
  // useEffect(() => selectPlayer(beingAsked), [beingAsked])

  let options = []
    if(props.playerOneCards){
        props.playerOneCards.forEach((card) => {
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
          id="AI_1"
          cards={props.AI_1_cards}
          asked={beingAsked == "AI_1" ? true : false}
          myTurn={props.isAI_1_Turn}
          className="AI_container"
          style={ AI_1_beingAsked ? extraStyles.beingAsked : {}}

        />
      </div>

      <div 
      onClick={() => askPlayer("AI_2")}
      className={styles.artificial_2}

      >
        <AI_player
          id="AI_2"
          cards={props.AI_2_cards}
          asked={beingAsked == "AI_2" ? true : false}
          myTurn={props.isAI_2_Turn}
          style={ AI_2_beingAsked ? extraStyles.beingAsked : {}}

        />
      </div>

      <div 
      onClick={() => askPlayer("AI_3")}
      className={styles.artificial_3}
      
      >
        <AI_player
          id="AI_3"
          cards={props.AI_3_cards}
          asked={beingAsked == "AI_3" ? true : false}
          myTurn={props.isAI_3_Turn}
          style={ AI_3_beingAsked ? extraStyles.beingAsked : {}}
        />
      </div>

      <div className={styles.deck}>
        <Deck />
      </div>

      <div
      className={styles.playerOne}
      >
        <PlayerOne
          id="P_1"
          cards={props.playerOneCards}
          asked={beingAsked == "P_1" ? true : false}
          myTurn={props.isP_1_Turn}
        />
        <div onClick={() => nextPlayersTurn()}>
           { props.isP_1_Turn && 
           <Options 
           options={options}
           beingAsked={beingAsked}/> }
        </div>
      </div>

      <div className={styles.nextPlayerButton}>
        { props.remDeck > 0 ? <button
        onClick={() => nextPlayersTurn()}
        >Next Player's Turn</button> : <p>{`Game Over! ${winner} is the winner`}</p> }
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);

const extraStyles = {
  beingAsked: {
    border: '2px solid green'
  },

  notMyTurn: {}
}