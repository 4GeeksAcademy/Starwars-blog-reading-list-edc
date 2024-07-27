import React ,{useState, useEffect }from 'react'
import { Link } from 'react-router-dom'

export default function Vehiclecard() {
    const [vehicle,setVehicle]=useState([])
    useEffect(()=>{
        async function getVehicle() {
            let response=await fetch("https://www.swapi.tech/api/starships")
        let data=await response.json()
        setVehicle(data.results)
        }
        getVehicle()
        
    },[])
    const handleFavorites = (vehicle) => {
        const isFavorite = store.favorites.some((fav) => fav.uid === vehicle.uid);
        if (isFavorite) {
          actions.removeFavorites(vehicle.name); // Make sure this correctly identifies the vehicle to remove
        } else {
          actions.addFavorites(vehicle.name, vehicle.uid, "vehicles");
        }
      };
  return (
    <div className="d-flex col-10 overflow-auto mt-5 mx-auto">
        {vehicle?.map((vehicle,index)=>(
            <div key={index}className="card" style={{"minWidth": "25rem"}}>
            <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/starships/${vehicle.uid}.jpg`} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">{vehicle.name}</h5>
              <Link to={"/starships/"+vehicle.uid} className="btn btn-primary">Go somewhere</Link>
            </div>
          </div>
        ))}
    </div>
  )
}
