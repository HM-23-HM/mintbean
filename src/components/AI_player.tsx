import React, { useEffect, useState } from "react";
import symbol from "../img/AI_cards.jpg";
import styles from "../css/artificial.module.css";
import { connect } from "react-redux";
import { goFish, sendCards } from "../actions/actions";

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
});

const mapDispatchToProps = {
  dispatchSendCards: (asker: string, being_Asked: string, matchingCards: Card[]) => sendCards(asker, being_Asked, matchingCards),
  dispatchGoFish: (asker: string) => goFish(asker),
};




const AI_player = (props) => {

  const [asker, setAsker] = useState<String>(props.id);
  const [isDratsVisible, setDratsTextVisible] = useState<Boolean>(false)
  const [isGoFishVisible, setGoFishVisibility] = useState<Boolean>(false)

  useEffect(() => play(props.myTurn), [props.myTurn]);

  const mapIDtoStateProps = new Map();
  mapIDtoStateProps.set("P_1", props.P_1_cards);
  mapIDtoStateProps.set("AI_1", props.AI_1_cards);
  mapIDtoStateProps.set("AI_2", props.AI_2_cards);
  mapIDtoStateProps.set("AI_3", props.AI_3_cards);
  mapIDtoStateProps.set("P_1_sets", props.P_1_sets);
  mapIDtoStateProps.set("AI_1_sets", props.AI_1_sets);
  mapIDtoStateProps.set("AI_2_sets", props.AI_2_sets);
  mapIDtoStateProps.set("AI_3_sets", props.AI_3_sets);

  const getRandomInteger = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const selectRandomPlayer = (id: string) => {
    const playerIds = ["P_1", "AI_1", "AI_2", "AI_3"];
    let playerOptions = playerIds.filter((option) => option != id);
    let randomPlayer = playerOptions[getRandomInteger(0, 2)];
    return randomPlayer;
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

  const AI_ask = () => {
    let beingAskedCards: Card[] = mapIDtoStateProps.get(beingAsked);
    let matchingCards: Card[] = beingAskedCards.filter((card) => card.symbol == option);

    if (matchingCards.length > 0) {
      // console.log("A matching card was found!");
      setDratsTextVisible(true);
      // console.log(asker, beingAsked, matchingCards)
      props.dispatchSendCards(asker, beingAsked, matchingCards);
    } else {
      // console.log("No matching card. Go Fish!");
      setGoFishVisibility(true);
      props.dispatchGoFish(asker);
    }
  };

  const [beingAsked, setBeingAsked] = useState<String>(selectRandomPlayer(props.id));
  const [option, setOption] = useState<String>(
    getRandomOption(mapIDtoStateProps.get(`${props.id}`))
  );

  const play = (myTurn: boolean) => {
    if (myTurn) {
      setTimeout(() => AI_ask(), 3000);
      setBeingAsked(selectRandomPlayer(props.id));
      setOption(getRandomOption(mapIDtoStateProps.get(`${props.id}`)));
    }
  };

  return (
    <div
      style={props.myTurn ? highlightStyle : {}}
      className={styles.container}
    >
      <h4>{props.id}</h4>
      <p>
        {mapIDtoStateProps.get(`${asker}_sets`).map((set) => (
          <span key={set} className={styles.completeSet}>{`${set} `}</span>
        ))}
      </p>
      <div className={styles.imgContainer}>
        <img src={props.picture} className={styles.symbol} />
      </div>
      {props.myTurn && (
        <p>{`Hey ${beingAsked}, do you have any ${option}'s ?`}</p>
      )}
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
