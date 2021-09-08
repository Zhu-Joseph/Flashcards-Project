import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import { deleteDeck, readDeck } from '../utils/api';
import hardData from "../data/db.json"

export const Deck = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

console.log(deck)
console.log(typeof deck.name)
//HARD DATA
  if (deck.length > 0) {
    const list = deck.map((card) => <Card key={card.id} card = {card}/>)
    
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck[0].name}
            </li>
          </ol>
        </nav>
        <div>
          <h5 className="card-title">{deck[0].name}</h5>
          <p className="card-text">{deck[0].description}</p>

          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary m-2">
            <span className="oi oi-pencil" /> Edit
          </Link>

          <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-2">
            <span className="oi oi-book" /> Study
          </Link>

          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-secondary m-2"
          >
            <span className="oi oi-plus" /> Add Cards
          </Link>
          <button
            className="btn btn-danger m-2"
            id={deck.id}
            onClick={async () => {
              const result = window.confirm(
                'Delete this deck? \nYou will not be able to recover it.'
              );
              if (result) {
                deleteDeck(deck.id).then(history.push('/'));
              }
            }}
          >
            <span className="oi oi-circle-x" /> Delete
          </button>
        </div>
        <div>
          <h2>Cards</h2>
          <section>{list}</section>
        </div>
      </div>
    );
  } 

  else if(typeof deck.name === "string") {

    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <div>
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">{deck.description}</p>

          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary m-2">
            <span className="oi oi-pencil" /> Edit
          </Link>

          <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-2">
            <span className="oi oi-book" /> Study
          </Link>

          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-secondary m-2"
          >
            <span className="oi oi-plus" /> Add Cards
          </Link>
          <button
            className="btn btn-danger m-2"
            id={deck.id}
            onClick={async () => {
              const result = window.confirm(
                'Delete this deck? \nYou will not be able to recover it.'
              );
              if (result) {
                deleteDeck(deck.id).then(history.push('/'));
              }
            }}
          >
            <span className="oi oi-circle-x" /> Delete
          </button>
        </div>
        <div>
          <h2>Cards</h2>
        </div>
      </div>
    );

  }

  
  else {
    return <div>No such deck</div>;
  }
};

export default Deck;
