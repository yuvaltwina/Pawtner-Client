import { useState } from "react";
import "./Primary.css";
import Card from "../../components/card/Card";
import Header from "../../components/header/Header";
import SelectButtonList from "../../components/selectButtons/selectButtonList/SelectButtonList";
import { DOGS_LIST } from "../../utils/data/data";
//סימון
const DOG_PREFENCES_HEADLINE_TEXT = "What are you looking for ?";
const DOG_CARDS_HEADLINE_TEXT = "Dogs Available for ";
const SUBMIT_BUTTON_TEXT = "SUBMIT";

export function Primary() {
  const handSubmit = () => {
    console.log(1);
  };

  // lllllllllllllllllllllllllllllllllllllllll לתקן KEY
  const displayCards = DOGS_LIST.map((singleDog) => {
    return (
      <Card
        key={singleDog.TEXT + Math.random()}
        singleDog={singleDog}
        needFavorite={true}
      ></Card>
    );
  });

  return (
    <div className="primary">
      <Header />
      <section className="primary-preferences">
        <img
          className="primary-preferences-img"
          src="src\utils\images\4253264.png"
        />
        <h3 className="primary-preferences-headline">
          {DOG_PREFENCES_HEADLINE_TEXT}
        </h3>
        <SelectButtonList
          divClass="primary-preferences-buttons-container"
          spanClass="primary-preferences-button"
        />
        <button
          onClick={() => {
            handSubmit();
          }}
          className="primary-preferences-submit"
        >
          {SUBMIT_BUTTON_TEXT}
        </button>
      </section>
      <section className="primary-adoption">
        <h1 className="primary-adoption-headline">
          {DOG_CARDS_HEADLINE_TEXT}
          <span className="primary-adoption-headline-headlight">Adoption</span>
        </h1>
        <div className="dogs-cards-container">{displayCards}</div>
      </section>
      {/* <section className="window">
        <img className="window-image" src="src\utils\images\window.avif"></img>
        <div className="window content">hey</div>
      </section> */}
    </div>
  );
}

export default Primary;
