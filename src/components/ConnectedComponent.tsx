import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

import AI_player from "./AI_player";
import Deck from "./deck";
import PlayerOne from "./playerOne";
import Options from "./options";
import styles from "../css/connected.module.css";
import { setPlayerBeingAsked, setWhoseTurn, setOptionAsked, setResponse } from "../actions/actions";

import spongebob from '../img/spongebob.jpg'
import nemo from '../img/nemo.jpg'
import ariel from '../img/ariel.png'


type Card = {
  suite: string,
  symbol: string,
}

const mapStateToProps = (state) => ({
  P_1_cards: state.get("P_1"),
  AI_1_cards: state.get("AI_1"),
  AI_2_cards: state.get("AI_2"),
  AI_3_cards: state.get("AI_3"),

  P_1_sets: state.get("P_1_sets"),
  remDeck: state.get("remainingDeck").length,

  whoseTurn: state.get("whoseTurn"),
  beingAsked: state.get("playerBeingAsked"),
  optionAsked: state.get("optionAsked"),

  response: state.get("response")
});

const mapDispatchToProps = {
  dispatchSetPlayerBeingAsked: (playerBeingAsked: string) => setPlayerBeingAsked(playerBeingAsked),
  dispatchSetWhoseTurn: (player: string) => setWhoseTurn(player),
  dispatchSetOptionAsked: (option: string) => setOptionAsked(option),
  dispatchSetResponse: (response: string) => setResponse(response)

};

var index = 0;



const ConnectedComponent = (props) => {


  const mapIDtoStateProps = new Map();
  mapIDtoStateProps.set("P_1", props.P_1_cards);
  mapIDtoStateProps.set("AI_1", props.AI_1_cards);
  mapIDtoStateProps.set("AI_2", props.AI_2_cards);
  mapIDtoStateProps.set("AI_3", props.AI_3_cards);


  let players = ["P_1", "AI_1", "AI_2", "AI_3"];

  const nextTurn = () => {
    index++
    if (index == 4) {
      index = 0
      props.dispatchSetPlayerBeingAsked("P_1")
    }

    props.dispatchSetWhoseTurn(players[index])

    if (index != 0) {
      props.dispatchSetPlayerBeingAsked(getAIsPlayerToAsk(players[index]))
    }

    if (props.whoseTurn != 'P_1') {
      var option = getOptionForAItoAsk(props.whoseTurn)
      props.dispatchSetOptionAsked(option)
    }


  }

  useEffect(() => {

    let beingAskedCards: Card[] = mapIDtoStateProps.get(props.beingAsked);
    let matchingCards: Card[] = beingAskedCards.filter((card) => card.symbol == props.optionAsked);


    if (matchingCards.length > 0) {
      props.dispatchSetResponse('Matching card found')
    } else {
      props.dispatchSetResponse('Go Fish')
    }
  }, [props.whoseTurn])


  let playerOneOptions: string[] = [];
  if (props.P_1_cards) {
    props.P_1_cards.forEach((card) => {
      let option: string = card.symbol;
      if (!playerOneOptions.includes(option)) {
        playerOneOptions.push(option);
      }
    });
  }

  const getRandomInteger = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomOption = (cards: Card[]) => {
    let options: string[] = [];
    cards.forEach((card) => {
      let option = card.symbol;
      if (!options.includes(option)) {
        options.push(option);
      }
    });

    let randomOption = options[getRandomInteger(0, options.length - 1)];
    return randomOption;
  };

  const getAIsPlayerToAsk = (id: string) => {
    const playerIds = ["P_1", "AI_1", "AI_2", "AI_3"];
    let playerOptions = playerIds.filter((option) => option != id);

    let randomPlayer = playerOptions[getRandomInteger(0, 2)];
    props.dispatchSetPlayerBeingAsked(randomPlayer)

    return randomPlayer;
  };

  const getOptionForAItoAsk = (whoseTurn: string) => {
    const option = getRandomOption(mapIDtoStateProps.get(`${whoseTurn}`))

    return option
  }




  return (
    <div>
      <div className={styles.upperContainer}>
        <div
          className={styles.artificial_1}
        >
          <button
            onClick={() => props.dispatchSetPlayerBeingAsked("AI_1")}
            disabled={!(props.whoseTurn == "P_1")}
            className={styles.AI_button}
          >
            <AI_player
              id="AI_1"
              cards={props.AI_1_cards}
              asked={props.beingAsked == "AI_1" ? true : false}
              myTurn={props.whoseTurn == "AI_1"}
              className="AI_container"
              picture={spongebob}
            />
          </button>
        </div>

        <div
          className={styles.artificial_2}
        >
          <button
            onClick={() => props.dispatchSetPlayerBeingAsked("AI_2")}
            disabled={!(props.whoseTurn == "P_1")}
            className={styles.AI_button}
          >
            <AI_player
              id="AI_2"
              cards={props.AI_2_cards}
              asked={props.beingAsked == "AI_2" ? true : false}
              myTurn={props.whoseTurn == "AI_2"}
              picture={nemo}
            />
          </button>
        </div>

        <div
          className={styles.artificial_3}>
          <button
            onClick={() => props.dispatchSetPlayerBeingAsked("AI_3")}
            disabled={!(props.whoseTurn == "P_1")}
            className={styles.AI_button}
          >
            <AI_player
              id="AI_3"
              cards={props.AI_3_cards}
              asked={props.beingAsked == "AI_3" ? true : false}
              myTurn={props.whoseTurn == "AI_3"}
              picture={ariel}
            />
          </button>
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
              asked={props.beingAsked == "P_1" ? true : false}
              myTurn={props.whoseTurn == "P_1"}
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
            onClick={() => nextTurn()}
            className={styles.optionsContainer}
          >
            {props.whoseTurn == 'P_1' && (
              <Options options={playerOneOptions} beingAsked={props.beingAsked} P_1_turn={props.whoseTurn == "P_1"} />
            )}
          </div>
          <div className={styles.nextPlayerButtonContainer}>
            {props.remDeck > 0 ? (
              <button
                className={styles.nextPlayerButton}
                onClick={() => nextTurn()}
                disabled={props.whoseTurn == "P_1"}
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
