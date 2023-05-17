import { useState } from 'react';
import './Primary.css';
import Card from '../../components/card/Card';
import SelectButtonList from '../../components/selectButtons/selectButtonList/SelectButtonList';
import { DOGS_LIST } from '../../utils/data/data';
import { SELECT_BUTTONS_DATA } from '../../utils/data/data';

const DOG_HEADER_TITLE_TEXT = 'Find your new best friend';
const DOG_HEADER_SUBTITLE_TEXT =
  '   browse dogs from our network and find your new buddy';
const DOG_PREFENCES_HEADLINE_TEXT = 'What are you looking for ?';
const DOG_CARDS_HEADLINE_TEXT = 'Dogs Available for ';
const SUBMIT_BUTTON_TEXT = 'SUBMIT';
const INPUTS_WIDTH = 'clamp(17rem,45%,30rem)';

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
  const displayHeader = (
    <div className="primary-header">
      <h1 className="primary-header-headline">{DOG_HEADER_TITLE_TEXT}</h1>
      <p className="primary-header-pargraph">{DOG_HEADER_SUBTITLE_TEXT} </p>
    </div>
  );

  return (
    <div className="primary">
      {displayHeader}
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
          list={SELECT_BUTTONS_DATA}
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
    </div>
  );
}

export default Primary;

{
  /* <section className="window">
  <img className="window-image" src="src\utils\images\window.avif"></img>
  <div className="window content">hey</div>
</section> */
}
