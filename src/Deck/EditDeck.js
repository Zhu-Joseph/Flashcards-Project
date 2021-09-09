import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { updateDeck, readDeck } from '../utils/api';
import ErrorMessage from '../Layout/ErrorMessage';

function EditDeck() {
  const { deckId } = useParams();
  const [formData, setFormData] = useState("Loading");
  const [error, setError] = useState(undefined);
  const history = useHistory()

  useEffect(() => {
    readDeck(deckId).then(setFormData);
  }, [deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleReset = (event) => {
    readDeck(deckId).then(setFormData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(formData, abortController.signal).then().catch(setError);
    history.goBack()
    if (error) {
      return <ErrorMessage error={error} />;
    }
  };
  // console.log(formData)
// SEARCHING FOR DECK DATA
  // if (1 > 0) {

    // let name = ""
    // let description = ""
    // let id = ""

    // if(formData[0]) {
    //   name = formData[0].name
    //   description = formData[0].description
    //   id = formData[0].id

    // } else {
    //   name = formData.name
    //   description = formData.description
    //   id = formData.id
    // }


      return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">
                <span className="oi oi-home" /> Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{formData.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder={formData.name}
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder={formData.description}
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <input
            className="btn btn-secondary mr-2"
            type="reset"
            onClick={handleReset}
            value="Reset"
          ></input>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>      
    );
  // }

  // else {
  //   return (
  //     <div>
  //       <nav aria-label="breadcrumb">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <a href="/">
  //               <span className="oi oi-home" /> Home
  //             </a>
  //           </li>
  //           <li className="breadcrumb-item">
  //             <Link to={`/decks/${deckId}`}>{formData.name}</Link>
  //           </li>
  //           <li className="breadcrumb-item active" aria-current="page">
  //             Edit Deck
  //           </li>
  //         </ol>
  //       </nav>
  //       <h1>Edit Deck</h1>
  //       <form onSubmit={handleSubmit}>
  //         <div className="form-group">
  //           <label htmlFor="name" className="form-label">
  //             Name
  //           </label>
  //           <input
  //             type="text"
  //             className="form-control"
  //             id="name"
  //             name="name"
  //             placeholder={formData.name}
  //             onChange={handleChange}
  //             value={formData.name}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label htmlFor="description" className="form-label">
  //             Description
  //           </label>
  //           <textarea
  //             className="form-control"
  //             id="description"
  //             name="description"
  //             placeholder={formData.description}
  //             onChange={handleChange}
  //             value={formData.description}
  //           />
  //         </div>
  //         <input
  //           className="btn btn-secondary mr-2"
  //           type="reset"
  //           onClick={handleReset}
  //           value="Reset"
  //         ></input>
  //         <button type="submit" className="btn btn-primary">
  //           Submit
  //         </button>
  //       </form>
  //     </div>      
  //   );
  // }

}




export default EditDeck;