import React from "react";
import { connect } from "react-redux";
import { sendCards, goFish } from "../actions/actions";
import styles from "../css/options.module.css";

type Card = {
  suite: string,
  symbol: string,
}


const mapStateToProps = (state) => ({
  playerOneCards: state.get("P_1"),
  AI_1_cards: state.get("AI_1"),
  AI_2_cards: state.get("AI_2"),
  AI_3_cards: state.get("AI_3"),
});

const mapDispatchToProps = {
  dispatchSendCards: (asker, being_Asked, matchingCards) =>
    sendCards(asker, being_Asked, matchingCards),
  dispatchGoFish: (asker) => goFish(asker),
};

const Options = (props) => {
  const mapAItoCards = new Map();

  mapAItoCards.set("AI_1", props.AI_1_cards);
  mapAItoCards.set("AI_2", props.AI_2_cards);
  mapAItoCards.set("AI_3", props.AI_3_cards);

  let options: string[] = props.options;

  const P1_ask = (selectedOption: string) => {
    if (props.whoseTurn == "P_1") {

      let option = selectedOption;
      let asker = "P_1";
      let being_Asked: string = props.beingAsked;

      let beingAsked_Cards: Card[] = mapAItoCards.get(being_Asked);
      let matchingCards: Card[] = beingAsked_Cards.filter(
        (card) => card.symbol == option
      );

      if (matchingCards.length > 0) {
        // console.log("A matching card was found!");
        props.dispatchSendCards(asker, being_Asked, matchingCards);
      } else {
        // console.log("No matching card. Go Fish!");
        props.dispatchGoFish(asker);
      }
    }
  };

  return (
    <div className={styles.optionsContainer}>
      {options.map((option) => (
        <button
          onClick={() => P1_ask(option)}
          key={option}
          className={styles.option}
          disabled={!props.P_1_turn}
        >
          {option}
        </button>
      ))}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Options);
