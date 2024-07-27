import React ,{useState, useEffect , useContext }from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export default function Charactercard({item, index}) {
    const [characters,setCharacters]=useState([]);
    const {store, actions} = useContext(Context);
    useEffect(()=>{
        async function getCharacters() {
            let response=await fetch("https://www.swapi.tech/api/people")
        let data=await response.json()
        setCharacters(data.results)
        }
        getCharacters()
        
    },[])
    const handleFavorites = (character) => {
      const isFavorite = store.favorites.some((fav) => fav.uid === character.uid);
      if (isFavorite) {
        actions.removeFavorites(character.name); // Make sure this correctly identifies the character to remove
      } else {
        actions.addFavorites(character.name, character.uid, "characters");
      }
    };
    // const isFavorite = store.favorites.some((fav) => fav.uid === character.uid);
    // const addToFavorites = () => {
    //   const isFavorite = store.favorites.some(fav => fav.name === item.name);
    //   if (isFavorite) {
    //     const indexToDelete = store.favorites.findIndex (fav => fav.name === item.name);
    //     if (indexToDelete !== -1) {
    //       actions.removeFavorites(indexToDelete);
    //     }
    //   } else {
    //     actions.getFavorites({name: item.name, index})
    //   }
    // }
  return (
    <div className="d-flex col-10 overflow-auto mt-5 mx-auto">
        {characters?.map((character,index)=>{
          const isFavorite = store.favorites.some((fav) => fav.uid === character.uid);
          return (
            <div key={index}className="card" style={{"minWidth": "25rem"}}>
            <img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <Link to={"/character/"+character.uid} className="btn btn-primary">Go somewhere</Link>
              <button type="button" className="btn btn-outline-warning btn-heart" onClick={handleFavorites}>
              <i className="fa-solid fa-heart heartBtn" style={{ color: isFavorite ? '#CC0020' : '#FFC107' }}></i>
              </button>
            </div>
          </div>
          );
})}
    </div>
  )
}
