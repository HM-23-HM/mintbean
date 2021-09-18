import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AI_player from "./AI_player";
import Deck from "./deck";
import PlayerOne from "./playerOne";
import Options from "./options";
import styles from "../css/connected.module.css";
import { myTurn } from "../actions/actions";

import spongebob from '../img/spongebob.jpg'
import nemo from '../img/nemo.jpg'
import ariel from '../img/ariel.png'

const mapStateToProps = (state) => ({
  playerOneCards: state.get("P_1"),
  AI_1_cards: state.get("AI_1"),
  AI_2_cards: state.get("AI_2"),
  AI_3_cards: state.get("AI_3"),

  isP_1_Turn: state.get("P_1_turn"),
  isAI_1_Turn: state.get("AI_1_turn"),
  isAI_2_Turn: state.get("AI_2_turn"),
  isAI_3_Turn: state.get("AI_3_turn"),

  P_1_sets: state.get("P_1_sets"),
  remDeck: state.get("remainingDeck").length,
});

const mapDispatchToProps = {
  dispatchMyTurn: (thisPlayersTurn: string, not1: string, not2: string, not3: string) =>
    myTurn(thisPlayersTurn, not1, not2, not3),
};

let whoseTurn = 0;





const ConnectedComponent = (props) => {

  const [beingAsked, setBeingAsked] = useState<String>("AI_1");

  const mapAItoCards = new Map();
  const whoseTurnItIs = new Map();

  mapAItoCards.set("AI_1", props.AI_1_cards);
  mapAItoCards.set("AI_2", props.AI_2_cards);
  mapAItoCards.set("AI_3", props.AI_3_cards);

  whoseTurnItIs.set(1, "P_1_turn");
  whoseTurnItIs.set(2, "AI_1_turn");
  whoseTurnItIs.set(3, "AI_2_turn");
  whoseTurnItIs.set(4, "AI_3_turn");

  let playersTurnArray = ["P_1_turn", "AI_1_turn", "AI_2_turn", "AI_3_turn"];

  const nextPlayersTurn = () => {
    if (whoseTurn == 4) {
      whoseTurn = 1;
      alert("It's your turn");
      let thisPlayersTurn = whoseTurnItIs.get(whoseTurn);
      let notTheirTurn = playersTurnArray.filter(
        (element) => element != thisPlayersTurn
      );
      var [not1, not2, not3] = notTheirTurn;
      props.dispatchMyTurn(thisPlayersTurn, not1, not2, not3);
    } else {
      whoseTurn++;
      let thisPlayersTurn = whoseTurnItIs.get(whoseTurn);
      let notTheirTurn = playersTurnArray.filter(
        (element) => element != thisPlayersTurn
      );
      var [not1, not2, not3] = notTheirTurn;
      props.dispatchMyTurn(thisPlayersTurn, not1, not2, not3);
    }
  };

  const askPlayer = (playerId: string) => {
    setBeingAsked(playerId);
    alert(`Please select an option to ask ${playerId} for`);
  };


  let playerOneOptions: string[] = [];
  if (props.playerOneCards) {
    props.playerOneCards.forEach((card) => {
      let option: string = card.symbol;
      if (!playerOneOptions.includes(option)) {
        playerOneOptions.push(option);
      }
    });
  }

  return (
    <div>
      <div className={styles.upperContainer}>
        <div onClick={() => askPlayer("AI_1")} className={styles.artificial_1}>
          <AI_player
            id="AI_1"
            cards={props.AI_1_cards}
            asked={beingAsked == "AI_1" ? true : false}
            myTurn={props.isAI_1_Turn}
            className="AI_container"
            picture={spongebob}
          />
        </div>

        <div onClick={() => askPlayer("AI_2")} className={styles.artificial_2}>
          <AI_player
            id="AI_2"
            cards={props.AI_2_cards}
            asked={beingAsked == "AI_2" ? true : false}
            myTurn={props.isAI_2_Turn}
            picture={nemo}
          />
        </div>

        <div onClick={() => askPlayer("AI_3")} className={styles.artificial_3}>
          <AI_player
            id="AI_3"
            cards={props.AI_3_cards}
            asked={beingAsked == "AI_3" ? true : false}
            myTurn={props.isAI_3_Turn}
            picture={ariel}
          />
        </div>

        <div className={styles.deck}>
          <Deck />
        </div>
      </div>

      <div className={styles.lowerContainer}>
        <div className={styles.playerOne}>
          <div className={styles.P_1_cards}>
            <PlayerOne
              id="P_1"
              asked={beingAsked == "P_1" ? true : false}
              myTurn={props.isP_1_Turn}
            />
          </div>
          <div className={styles.P1setsContainer}>
            <p>
              {props.P_1_sets.map((set) => (
                <span
                  key={`${set}+${set}`}
                  className={styles.completeSets}
                >{`${set} `}</span>
              ))}
            </p>
          </div>
          <div
            onClick={() => nextPlayersTurn()}
            className={styles.optionsContainer}
          >
            {props.isP_1_Turn && (
              <Options options={playerOneOptions} beingAsked={beingAsked} />
            )}
          </div>
          <div className={styles.nextPlayerButtonContainer}>
            {props.remDeck > 0 ? (
              <button
                className={styles.nextPlayerButton}
                onClick={() => nextPlayersTurn()}
                disabled={props.isP_1_Turn}
              >
                Next Player's Turn
              </button>
            ) : (
              <p>{`Game Over!`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
