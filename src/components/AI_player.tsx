import React, { useEffect, useState } from "react";
import styles from "../css/artificial.module.css";
import { connect } from "react-redux";

import { Transition } from 'react-transition-group'


const mapStateToProps = (state) => ({
  P_1_cards: state.get("P_1"),
  Spongebob_cards: state.get("Spongebob"),
  Squidward_cards: state.get("Squidward"),
  Patrick_cards: state.get("Patrick"),

  P_1_sets: state.get("P_1_sets"),
  Spongebob_sets: state.get("Spongebob_sets"),
  Squidward_sets: state.get("Squidward_sets"),
  Patrick_sets: state.get("Patrick_sets"),

  whoseTurn: state.get("whoseTurn"),
  beingAsked: state.get("playerBeingAsked"),
  optionAsked: state.get("optionAsked"),

  response: state.get("response"),
  remDeck: state.get('remainingDeck').length

});

const duration = 300;

const transitionStyles = {
  entering: { display: 'block' },
  entered: { display: 'block' },
  exiting: { display: 'block' },
  exited: { display: 'none' },
};




const AI_player = (props) => {

  const setHighlightColor = () => {
    if (props.myTurn) {
      return highlightMyTurn
    }

    if (props.asked) {
      return highlightBeingAsked
    }
  }


  const mapIDtoStateProps = new Map();
  mapIDtoStateProps.set("P_1", props.P_1_cards);
  mapIDtoStateProps.set("Spongebob", props.Spongebob_cards);
  mapIDtoStateProps.set("Squidward", props.Squidward_cards);
  mapIDtoStateProps.set("Patrick", props.Patrick_cards);

  mapIDtoStateProps.set("P_1_sets", props.P_1_sets);
  mapIDtoStateProps.set("Spongebob_sets", props.Spongebob_sets);
  mapIDtoStateProps.set("Squidward_sets", props.Squidward_sets);
  mapIDtoStateProps.set("Patrick_sets", props.Patrick_sets);

  const [isResponseVisible, setResponseVisibility] = useState(false)
  const [isQuestionVisible, setQuestionVisibility] = useState(false)

  // The AIs talk
  useEffect(() => {
    if(props.remDeck > 0) {

      // Ask
      if (props.myTurn) {

        const showQuestion = setQuestionVisibility(true)
        const hideQuestion = setTimeout(() => setQuestionVisibility(false), 3000)

        showQuestion
        hideQuestion
      }

      // Respond
      if (props.asked) {

        const showResponse = setTimeout(() => setResponseVisibility(true), 3000)
        const hideResponse = setTimeout(() => setResponseVisibility(false), 4500)

        showResponse
        hideResponse

      }
    }
  }, [props.whoseTurn, props.optionAsked])




  return (
    <div
      style={setHighlightColor()}

      className={styles.container}
    >
      <p>
        {mapIDtoStateProps.get(`${props.id}_sets`).map((set) => (
          <span key={set} className={styles.completeSet}>{`${set} `}</span>
        ))}
      </p>
      <img src={props.picture} className={styles.avatar} />
      <div className={styles.responses}>
        <Transition in={isQuestionVisible} timeout={duration}>
          {state =>
            <p
              style={transitionStyles[state]}
              className={styles.responseText}
            >{`Hey ${props.beingAsked}, do you have any ${props.optionAsked}'s ?`}</p>
          }
        </Transition>

        <Transition in={isResponseVisible} timeout={duration}>
          {state =>
            <p
              style={transitionStyles[state]}
              className={styles.responseText}
            >{props.response}</p>
          }
        </Transition>
      </div>

    </div>
  );
};

export default connect(mapStateToProps)(AI_player);

const highlightMyTurn = {
  border: "2px solid yellow",
  borderRadius: "5px",

};

const highlightBeingAsked = {
  border: "2px solid #39FF14",
  borderRadius: "5px",
}
