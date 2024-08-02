import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'

export default function Vehicledetails() {
const[vehicle,setVehicle]=useState()
const [descriptionTag, setDescriptionTag] = useState()
const {id}=useParams()
    useEffect(()=>{
        async function getVehicle() {
            let response=await fetch("https://www.swapi.tech/api/starships/"+id)
        let data=await response.json()
        setVehicle(data.result.properties)
        setDescriptionTag(data.result)
        }
        getVehicle()
        
    },[id])
  return (
    <div>
      <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`} alt="Card image cap" style={{ width: "30rem", height: "48rem" }}/>
        <h1>{vehicle?.name}</h1>
        <div>model: {vehicle?.model}</div>
        <div>description: {descriptionTag?.description}</div>
        <div>starship_class: {vehicle?.starship_class}</div>
        <div>manufacturer: {vehicle?.manufacturer}</div>
        <div>cost_in_credits: {vehicle?.cost_in_credits}</div>
        <div>length: {vehicle?.length}</div>
        <div>crew: {vehicle?.crew}</div>
        <div>passengers: {vehicle?.passengers}</div>
        <div>max_atmosphering_speed: {vehicle?.max_atmosphering_speed}</div>
        <div>hyperdrive_rating: {vehicle?.hyperdrive_rating}</div>
        <div>MGLT: {vehicle?.MGLT}</div>
        <div>cargo_capacity: {vehicle?.cargo_capacity}</div>
        <div>consumables: {vehicle?.consumables}</div>
        <div>pilots: {vehicle?.pilots}</div>
            {/* "model": "Sentinel-class landing craft", */}
            {/* "starship_class": "landing craft",
            "manufacturer": "Sienar Fleet Systems, Cyngus Spaceworks",
            "cost_in_credits": "240000",
            "length": "38",
            "crew": "5",
            "passengers": "75",
            "max_atmosphering_speed": "1000",
            "hyperdrive_rating": "1.0",
            "MGLT": "70",
            "cargo_capacity": "180000",
            "consumables": "1 month",
            "pilots": [],
            "created": "2020-09-17T17:55:06.604Z",
            "edited": "2020-09-17T17:55:06.604Z",
            "name": "Sentinel-class landing craft",
            "url": "https://www.swapi.tech/api/starships/5" */}
    </div>
  )
}
