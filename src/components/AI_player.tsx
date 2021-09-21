import React, { useEffect, useState } from "react";
import symbol from "../img/AI_cards.jpg";
import styles from "../css/artificial.module.css";
import { connect } from "react-redux";
import { goFish, sendCards, setPlayerBeingAsked, setOptionAsked } from "../actions/actions";

import { Transition } from 'react-transition-group'

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
  AI_1_sets: state.get("AI_1_sets"),
  AI_2_sets: state.get("AI_2_sets"),
  AI_3_sets: state.get("AI_3_sets"),

  whoseTurn: state.get("whoseTurn"),
  beingAsked: state.get("playerBeingAsked"),
  optionAsked: state.get("optionAsked"),

  response: state.get("response")

});

const mapDispatchToProps = {
  dispatchSendCards: (asker: string, being_Asked: string, matchingCards: Card[]) => sendCards(asker, being_Asked, matchingCards),
  dispatchGoFish: (asker: string) => goFish(asker),
  // dispatchSetPlayerBeingAsked: (playerBeingAsked: string) => setPlayerBeingAsked(playerBeingAsked),
  dispatchSetOptionAsked: (optionAsked: string) => setOptionAsked(optionAsked)

};

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { display: 'block' },
  entered: { display: 'block' },
  exiting: { display: 'block' },
  exited: { display: 'none' },
};




const AI_player = (props) => {


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

  const mapIDtoStateProps = new Map();
  mapIDtoStateProps.set("P_1", props.P_1_cards);
  mapIDtoStateProps.set("AI_1", props.AI_1_cards);
  mapIDtoStateProps.set("AI_2", props.AI_2_cards);
  mapIDtoStateProps.set("AI_3", props.AI_3_cards);

  mapIDtoStateProps.set("P_1_sets", props.P_1_sets);
  mapIDtoStateProps.set("AI_1_sets", props.AI_1_sets);
  mapIDtoStateProps.set("AI_2_sets", props.AI_2_sets);
  mapIDtoStateProps.set("AI_3_sets", props.AI_3_sets);

  const [isResponseVisible, setResponseVisibility] = useState(false)
  const [isQuestionVisible, setQuestionVisibility] = useState(false)

  const revealThenHide = (conditionalTrigger: boolean) => {
    conditionalTrigger = true
    setTimeout(() => { conditionalTrigger = false }, 3000)
  }

  const revealQuestion = (updater) => {
    updater(true)
    setTimeout(() => updater(false), 3000)
  }

  const revealResponse = (updater) => {
    setTimeout(() => updater(true), 3000)
    setTimeout(() => updater(false), 6000)
  }

  useEffect(() => {
    // Ask
    if (props.myTurn) {
      revealQuestion(setQuestionVisibility)
    }

    // Respond
    if (props.asked) {

      let beingAskedCards: Card[] = mapIDtoStateProps.get(props.beingAsked);
      let matchingCards: Card[] = beingAskedCards.filter((card) => card.symbol == props.optionAsked);


      if (matchingCards.length > 0) {
        //"A matching card was found!"
        console.log("Matching card triggered")
        props.dispatchSendCards(props.whoseTurn, props.beingAsked, matchingCards);
        revealResponse(setResponseVisibility)
      } else {
        //"No matching card. Go Fish!"
        console.log("Go Fish triggered")
        props.dispatchGoFish(props.whoseTurn);
        revealResponse(setResponseVisibility)
      }

    }
  }, [props.whoseTurn])




  return (
    <div
      style={props.myTurn ? highlightStyle : {}}
      className={styles.container}
    >
      <h4>{props.id}</h4>
      <p>
        {mapIDtoStateProps.get(`${props.id}_sets`).map((set) => (
          <span key={set} className={styles.completeSet}>{`${set} `}</span>
        ))}
      </p>
      <div className={styles.imgContainer}>
        <img src={props.picture} className={styles.symbol} />
      </div>
      <Transition in={isQuestionVisible} timeout={duration}>
        {state =>
          <p style={transitionStyles[state]}>{`Hey ${props.beingAsked}, do you have any ${props.optionAsked}'s ?`}</p>
        }
      </Transition>

      <Transition in={isResponseVisible} timeout={duration}>
        {state =>
          <p style={transitionStyles[state]}>{props.response}</p>
        }
      </Transition>

    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AI_player);

const highlightStyle = {
  border: "2px solid yellow",
  borderRadius: "5px",
};

const textVisible = {
  display: "visible",
};

const textInvisible = {
  display: "none",
};
