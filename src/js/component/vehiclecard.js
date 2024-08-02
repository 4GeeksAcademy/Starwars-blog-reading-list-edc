import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../store/appContext';

export default function Vehiclecard() {
  const [vehicle, setVehicle] = useState([])
  const { store, actions } = useContext(Context);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    async function getVehicle() {
      let response = await fetch("https://www.swapi.tech/api/starships")
      let data = await response.json()
      setVehicle(data.results)
    }
    getVehicle()

  }, [])
  const handleImgError = (uid) => {
    setImgError((prevState) => ({
      ...prevState, 
      [uid]: true, 
    }));
  };
  const NO_IMG_URL = "https://via.placeholder.com/238x159";
  const GUIDE_URL = "https://starwars-visualguide.com/assets/img/starships";

  const handleFavorites = (vehicle) => {
    const isFavorite = store.favorites.some(
        (fav) => fav.uid === vehicle.uid && fav.type === "starships"
    );
    if (isFavorite) {
        actions.removeFavorites(vehicle.uid, "starships"); // Make sure this correctly identifies the vehicle to remove
    } else {
        actions.addFavorites(vehicle.name, vehicle.uid, "starships");
    }
  };

  return (
    <div className="d-flex col-10 overflow-auto mt-5 mx-auto">
      {vehicle?.map((vehicle, index) => {
        const isFavorite = store.favorites.some((fav) => fav.uid === vehicle.uid && fav.type === "starships");
        return (
          <div key={index} className="card ms-1" style={{ "minWidth": "15rem" }}>
            <img className="card-img-top" onError={() => handleImgError(vehicle.uid) } src={imgError[vehicle.uid] ? NO_IMG_URL : `${GUIDE_URL}/${vehicle.uid}.jpg`} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{vehicle.name}</h5>
              <Link to={"/starships/" + vehicle.uid} className="btn btn-primary">Go somewhere</Link>
              <button type="button" className="btn btn-outline-warning btn-heart ms-1" onClick={() => handleFavorites(vehicle)}>
                <i className="fa-solid fa-heart heartBtn" style={{ color: isFavorite ? '#CC0020' : '#FFC107' }}></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  )
}
