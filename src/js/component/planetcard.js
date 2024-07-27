import React ,{useState, useEffect }from 'react'
import { Link } from 'react-router-dom'

export default function Planetcard() {
    const [planet,setPlanet]=useState([])
    useEffect(()=>{
        async function getPlanet() {
            let response=await fetch("https://www.swapi.tech/api/planets")
        let data=await response.json()
        setPlanet(data.results)
        }
        getPlanet()
        
    },[])
    const handleFavorites = (planet) => {
        const isFavorite = store.favorites.some((fav) => fav.uid === planet.uid);
        if (isFavorite) {
          actions.removeFavorites(planet.name); // Make sure this correctly identifies the planet to remove
        } else {
          actions.addFavorites(planet.name, planet.uid, "planets");
        }
      };
  return (
    <div className="d-flex col-10 overflow-auto mt-5 mx-auto">
        {planet?.map((planet,index)=>(
            <div key={index}className="card" style={{"minWidth": "25rem"}}>
            <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">{planet.name}</h5>
              <Link to={"/planets/"+planet.uid} className="btn btn-primary">Go somewhere</Link>
            </div>
          </div>
        ))}
    </div>
  )
}
