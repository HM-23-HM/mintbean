import React from "react";
import hearts from '../img/hearts.png'
import spades from '../img/spades.jpg'
import clubs from '../img/clubs.png'
import diamonds from '../img/diamonds.png'
import styles from '../css/card.module.css'


const Card = ({suite, symbol, className}) => {

const suites = new Map()

suites.set('Hearts',hearts)
suites.set('Clubs',clubs)
suites.set('Spades',spades)
suites.set('Diamonds',diamonds)

    const pickSuite = (suite: string) => {
        return suites.get(suite)
    }

  return (
    <span className={styles.cardContainer}>
    <div className={styles.innerCard}>
      <span className={styles.symbolStyle}>{symbol}</span>
      <img src={pickSuite(suite)} className={styles.suiteStyle}/>
    </div>
    </span>
  );
};

export default Card;

