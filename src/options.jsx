import React from "react";
import { connect } from "react-redux";
import { sendCards, goFish } from "./actions/actions";
import styles from "./css/options.module.css";

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

  let options = props.options;

  const P1_ask = (selectedOption) => {
    console.log(
      `Selected the following option: ${selectedOption} to ask ${props.beingAsked}`
    );
    let option = selectedOption;
    let asker = "P_1";
    let being_Asked = props.beingAsked;

    let beingAsked_Cards = mapAItoCards.get(being_Asked);
    let matchingCards = beingAsked_Cards.filter(
      (card) => card.symbol == option
    );
    console.log("Matching cards ", matchingCards);

    if (matchingCards.length > 0) {
      console.log("A matching card was found!");
      props.dispatchSendCards(asker, being_Asked, matchingCards);
    } else {
      console.log("No matching card. Go Fish!");
      props.dispatchGoFish(asker);
    }
  };

  return (
    <div className={styles.optionsContainer}>
      {options.map((option) => (
        <button
          onClick={() => P1_ask(option)}
          key={option}
          className={styles.option}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
