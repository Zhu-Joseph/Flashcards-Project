import React, { useEffect, useState } from 'react';
import { createCard, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';
import { Link, useParams, useHistory } from 'react-router-dom';
import CardForm from './CardForm';
import hardData from "../data/db.json"

function AddCard() {
  const initialState = {
    front: '',
    back: '',
  };
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(undefined);
  const [deck, setDeck] = useState([]);
  const history = useHistory();

  const filterDecks = hardData.decks.filter((deck) => deck.id === Number(deckId))
  const currentDeck = filterDecks[0]

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleReset = (event) => {
    setFormData({ ...initialState });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    createCard(deckId, formData, abortController.signal)
      .then((data) => setFormData(data))
      .catch(setError);

    return () => abortController.abort();
  };

  useEffect(() => {
    if (formData.id) {
      history.push(`/decks/${deckId}`);
    }
  }, [formData.id, history, deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href={`/decks/${deckId}`}>{currentDeck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span className="oi oi-plus" /> Add Card
          </li>
        </ol>
      </nav>
      <h1>{currentDeck.name}: Add Card</h1>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddCard;