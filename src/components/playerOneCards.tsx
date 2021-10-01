import React from "react";
import Card from "./card";
import styles from "../css/playerOne.module.css";
import { connect } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

type Card = {
  suite: string,
  symbol: string,
}

const mapStateToProps = (state) => ({
  P_1_sets: state.get("P_1_sets"),
  cards: state.get("P_1"),
});


const PlayerOne = (props) => {


  return (
    <>
      <Carousel
        showArrows={true}
        autoPlay={false}
      >
        {props.cards &&
          props.cards.map((card: Card) => (
            <Card
              key={card.suite + card.symbol}
              suite={card.suite}
              symbol={card.symbol}
            />
          ))}
      </Carousel>
    </>
  );
};


export default connect(mapStateToProps)(PlayerOne);
