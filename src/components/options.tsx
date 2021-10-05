import { stat } from "fs/promises";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendCards, goFish, setOptionAsked } from "../actions/actions";
import styles from '../css/options.module.css'

import { Transition } from 'react-transition-group'

const duration = 300;

const transitionStyles = {
  entering: { display: 'block' },
  entered: { display: 'block' },
  exiting: { display: 'block' },
  exited: { display: 'none' },
};


const mapStateToProps = (state) => ({
  playerOneCards: state.get("P_1"),
  Spongebob_cards: state.get("Spongebob"),
  Squidward_cards: state.get("Squidward"),
  Patrick_cards: state.get("Patrick"),

  beingAsked: state.get("playerBeingAsked"),
  whoseTurn: state.get("whoseTurn"),
  optionAsked: state.get("optionAsked"),

  response: state.get("response")
});

const mapDispatchToProps = {
  dispatchSendCards: (asker, being_Asked, matchingCards) =>
    sendCards(asker, being_Asked, matchingCards),
  dispatchGoFish: (asker) => goFish(asker),
  dispatchSetOptionAsked: (option: string) => setOptionAsked(option),
};



const Options = (props) => {

  const [option, setOption] = useState("xx")
  const [areOptionsVisible, setOptionsVisibility] = useState(true)
  const [isP1ResponseVisible, setP1ResponseVisibility] = useState(false)
  const [isP1QuestionVisible, setP1QuestionVisibility] = useState(false)

  const mapAItoCards = new Map();

  mapAItoCards.set("Spongebob", props.Spongebob_cards);
  mapAItoCards.set("Squidward", props.Squidward_cards);
  mapAItoCards.set("Patrick", props.Patrick_cards);

  let options: string[] = props.options;

  const P1_ask = (selectedOption: string) => {

    setOption(selectedOption)

    // to trigger re-render
    props.dispatchSetOptionAsked(selectedOption)

    setOptionsVisibility(false)

    const showQuestion = setP1QuestionVisibility(true)
    const hideQuestion = setTimeout(() => setP1QuestionVisibility(false), 3000)

    showQuestion
    hideQuestion

  }

  useEffect(() => {
    if (props.P_1_asked && props.whoseTurn != "P_1") {


      const showResponse = setTimeout(() => setP1ResponseVisibility(true), 3000)
      const hideResponse = setTimeout(() => setP1ResponseVisibility(false), 4500)

      showResponse
      hideResponse
    }

    if (props.whoseTurn == "P_1") {
      setOptionsVisibility(true)
    }
  }, [props.whoseTurn])




return (
  <>
    <div className={styles.options}>
      {options.map((option) => (
        <button
          onClick={() => P1_ask(option)}
          key={option}
          className={styles.option}
          disabled={!areOptionsVisible}
        >
          {option}
        </button>
      ))}
    </div>

    <div className={styles.responseContainer}>
      <Transition in={isP1QuestionVisible} timeout={duration}>
        {state =>
          <p
            style={transitionStyles[state]}
            className={styles.responseText}
          >{`Hey ${props.beingAsked}, do you have any ${option}'s ?`}</p>
        }
      </Transition>

      <Transition in={isP1ResponseVisible} timeout={duration}>
        {state =>
          <p
            style={transitionStyles[state]}
            className={styles.responseText}
          >{props.response}</p>
        }
      </Transition>
    </div>

  </>
);
};


export default connect(mapStateToProps, mapDispatchToProps)(Options);
