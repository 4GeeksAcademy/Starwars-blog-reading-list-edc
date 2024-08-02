import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'

export default function Planetdetails() {
const[planet,setPlanet]=useState()
const [descriptionTag, setDescriptionTag] = useState()
const {id}=useParams()
    useEffect(()=>{
        async function getPlanet() {
            let response=await fetch("https://www.swapi.tech/api/planets/"+id)
        let data=await response.json()
        setPlanet(data.result.properties)
        setDescriptionTag(data.result)
        }
        getPlanet()
        
    },[id])
  return (
    <div>
      <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Card image cap" style={{ width: "30rem", height: "48rem" }}/>
        <h1>{planet?.name}</h1>
        <div>description: {descriptionTag?.description}</div>
        <div>diameter: {planet?.diameter}</div>
        <div>rotation_period: {planet?.rotation_period}</div>
        <div>orbital_period: {planet?.orbital_period}</div>
        <div>gravity: {planet?.gravity}</div>
        <div>population: {planet?.population}</div>
        <div>climate: {planet?.climate}</div>
        <div>terrain: {planet?.terrain}</div>
        <div>surface_water: {planet?.surface_water}</div>
    </div>
    // "diameter": "12500",
    //         "rotation_period": "24",
    //         "orbital_period": "364",
    //         "gravity": "1 standard",
    //         
    //         "climate": "temperate",
    //         "terrain": "grasslands, mountains",
    //         "surface_water": "40",
    //         "created": "2024-07-27T09:41:35.357Z",
    //         "edited": "2024-07-27T09:41:35.357Z",
    //         "name": "Alderaan",
  )
}
