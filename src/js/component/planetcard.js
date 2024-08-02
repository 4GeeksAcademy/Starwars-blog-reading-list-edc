import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext';


export default function Planetcard({ item, index }) {
  const [planet, setPlanet] = useState([])
  const { store, actions } = useContext(Context);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    async function getPlanet() {
      let response = await fetch("https://www.swapi.tech/api/planets")
      let data = await response.json()
      setPlanet(data.results)
    }
    getPlanet()

  }, [])
  const handleImgError = (uid) => {
    setImgError((prevState) => ({
      ...prevState, 
      [uid]: true, 
    }));
  };
  const NO_IMG_URL = "https://via.placeholder.com/238x238";
  const GUIDE_URL = "https://starwars-visualguide.com/assets/img/planets";
  const handleFavorites = (planet) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets");
    if (isFavorite) {
      actions.removeFavorites(planet.uid, "planets"); // Make sure this correctly identifies the planet to remove
    } else {
      actions.addFavorites(planet.name, planet.uid, "planets");
    }
  };
  return (
    <div className="d-flex col-10 overflow-auto mt-5 mx-auto">
      {planet?.map((planet, index) => {
        const isFavorite = store.favorites.some((fav) => fav.uid === planet.uid && fav.type === "planets");
        return (
          <div key={index} className="card me-1" style={{ "minWidth": "15rem" }}>
            <img 
              className="card-img-top" 
              src={imgError[planet.uid] ? NO_IMG_URL : `${GUIDE_URL}/${planet.uid}.jpg`} 
              onError={() => handleImgError(planet.uid) }
              alt="Card image cap" 
            />
            <div className="card-body">
              <h5 className="card-title">{planet.name}</h5>
              <Link to={"/planets/" + planet.uid} className="btn btn-primary">Go somewhere</Link>
              <button type="button" className="btn btn-outline-warning btn-heart ms-1" onClick={() => handleFavorites(planet)}>
                <i className="fa-solid fa-heart heartBtn" style={{ color: isFavorite ? '#CC0020' : '#FFC107' }}></i>
              </button>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}
