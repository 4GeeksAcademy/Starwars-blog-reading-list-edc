import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export default function Characterdetails() {
  const [character, setCharacter] = useState()
  const [descriptionTag, setDescriptionTag] = useState()
  const { id } = useParams()
  useEffect(() => {
    async function getCharacter() {
      let response = await fetch("https://www.swapi.tech/api/people/" + id)
      let data = await response.json()
      setCharacter(data.result.properties)
      setDescriptionTag(data.result)
    }
    getCharacter()

  }, [])
  return (
    <div className="container">
      <div className="col-6">
        <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="Card image cap" style={{ width: "30rem", height: "48rem" }} />
      </div>
      <div className="col-6">
        <h1>{character?.name}</h1>
        <div>name: {character?.name}</div>
        <div>description: {descriptionTag?.description}</div>
        <div>height: {character?.height}</div>
        <div>hair_color: {character?.hair_color}</div>
        <div>skin_color: {character?.skin_color}</div>
        <div>eye_color: {character?.eye_color}</div>
        <div>birth_year: {character?.birth_year}</div>
        <div>gender: {character?.gender}</div>
      </div>

      {/* "height": "172",
            "mass": "77",
            
            "birth_year": "19BBY",
            "gender": "male",
            "created": "2024-07-27T09:41:35.354Z",
            "edited": "2024-07-27T09:41:35.354Z",
            "name": "Luke Skywalker",
            "homeworld": "https://www.swapi.tech/api/planets/1",
            "url": "https://www.swapi.tech/api/people/1" */}
    </div>
  )
}
