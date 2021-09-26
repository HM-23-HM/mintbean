import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import AI_player from "./AI_player";
import Deck from "./deck";
import PlayerOne from "./playerOneCards";
import Options from "./options";
import Help from './Help'

import styles from "../css/connected.module.css";
import { setPlayerBeingAsked, setWhoseTurn, setOptionAsked, setResponse, goFish, sendCards } from "../actions/actions";

import spongebob from '../img/spongebob.jpg'
import squidward from '../img/squidward.jpg'
import patrick from '../img/patrick2.jpg'


type Card = {
  suite: string,
  symbol: string,
}

const mapStateToProps = (state) => ({
  P_1_cards: state.get("P_1"),
  Spongebob_cards: state.get("Spongebob"),
  Squidward_cards: state.get("Squidward"),
  Patrick_cards: state.get("Patrick"),

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
  dispatchSetResponse: (response: string) => setResponse(response),
  dispatchGoFish: (asker: string) => goFish(asker),
  dispatchSendCards: (asker: string, beingAsked: string, matchingCards: Card[]) => sendCards(asker, beingAsked, matchingCards)

};

var index = 0;

const duration = 300;

const transitionStyles = {
  entering: { display: 'block' },
  entered: { display: 'block' },
  exiting: { display: 'block' },
  exited: { display: 'none' },
};

const ConnectedComponent = (props) => {

  const [isNextTurnButtonDisabled, setNextTurnButtonDisability] = useState(true)


  const mapIDtoStateProps = new Map();
  mapIDtoStateProps.set("P_1", props.P_1_cards);
  mapIDtoStateProps.set("Spongebob", props.Spongebob_cards);
  mapIDtoStateProps.set("Squidward", props.Squidward_cards);
  mapIDtoStateProps.set("Patrick", props.Patrick_cards);


  let players = ["P_1", "Spongebob", "Squidward", "Patrick"];

  const SpongebobsTurn = () => {

    setTimeout(() => setNextTurnButtonDisability(false), 6000)

  }

  const nextTurn = () => {

    setNextTurnButtonDisability(true)
    setTimeout(() => setNextTurnButtonDisability(false), 4500)


    index++
    if (index == 4) {
      index = 0
      props.dispatchSetPlayerBeingAsked("P_1")
    }


    props.dispatchSetWhoseTurn(players[index])

    if (index != 0) {
      props.dispatchSetPlayerBeingAsked(getAIsPlayerToAsk(players[index]))
      var option = getOptionForAItoAsk(players[index])
      props.dispatchSetOptionAsked(option)
    }

  }

  // Set AI Response
  useEffect(() => {

    if (props.remDeck > 0) {

      if (props.whoseTurn == "P_1" && props.beingAsked == "P_1") { } else {


        let beingAskedCards: Card[] = mapIDtoStateProps.get(props.beingAsked);
        let matchingCards: Card[] = beingAskedCards.filter((card) => card.symbol == props.optionAsked);

        if (matchingCards.length > 0) {
          props.dispatchSetResponse('Darn! You got me.')
          props.dispatchSendCards(props.whoseTurn, props.beingAsked, matchingCards);

        } else {
          props.dispatchSetResponse('Go Fish!')
          props.dispatchGoFish(props.whoseTurn);

        }
      }
    }
  }, [props.whoseTurn, props.optionAsked])


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
    const playerIds = ["P_1", "Spongebob", "Squidward", "Patrick"];
    let playerOptions = playerIds.filter((option) => option != id);

    let randomPlayer = playerOptions[getRandomInteger(0, 2)];

    return randomPlayer;
  };

  const getOptionForAItoAsk = (whoseTurn: string) => {
    const option = getRandomOption(mapIDtoStateProps.get(`${whoseTurn}`))


    return option
  }




  return (
    <>
      <div className={styles.upperContainer}>
        <Help />
        <div
          className={styles.artificial_1}
        >
          <button
            onClick={() => props.dispatchSetPlayerBeingAsked("Spongebob")}
            disabled={!(props.whoseTurn == "P_1")}
            className={styles.AI_button}
          >
            <AI_player
              id="Spongebob"
              asked={props.beingAsked == "Spongebob" ? true : false}
              myTurn={props.whoseTurn == "Spongebob"}
              className="AI_container"
              picture={spongebob}
            />
          </button>
        </div>

        <div
          className={styles.artificial_2}
        >
          <button
            onClick={() => props.dispatchSetPlayerBeingAsked("Squidward")}
            disabled={!(props.whoseTurn == "P_1")}
            className={styles.AI_button}
          >
            <AI_player
              id="Squidward"
              asked={props.beingAsked == "Squidward" ? true : false}
              myTurn={props.whoseTurn == "Squidward"}
              picture={squidward}
            />
          </button>
        </div>

        <div
          className={styles.artificial_3}>
          <button
            onClick={() => props.dispatchSetPlayerBeingAsked("Patrick")}
            disabled={!(props.whoseTurn == "P_1")}
            className={styles.AI_button}
          >
            <AI_player
              id="Patrick"
              asked={props.beingAsked == "Patrick" ? true : false}
              myTurn={props.whoseTurn == "Patrick"}
              picture={patrick}
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
            onClick={() => SpongebobsTurn()}
            className={styles.optionsContainer}
          >

            <Options
              options={playerOneOptions}
              P_1_turn={props.whoseTurn == "P_1"}
              P_1_asked={props.beingAsked == "P_1"}
            />

          </div>
          <div className={styles.nextPlayerButtonContainer}>
            {props.remDeck > 0 ? (
              <button
                className={styles.nextPlayerButton}
                onClick={() => nextTurn()}
                disabled={isNextTurnButtonDisabled}
              >
                Next Turn
              </button>
            ) : (
              <p className={styles.gameOver}>{`Game Over!`}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);
