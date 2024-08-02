const getState = ({ getStore, getActions, setStore }) => {
	let apiUrl = "https://www.swapi.tech/api/"
	return {
		store: {
			characters: [],
			planets: [],
			vehicles: [],
			favorites: [],
			
		},
		actions: {
			getCharacters: () => {
				fetch(apiUrl + "people")
				.then(resp => resp.json())
				.then(data => setStore({characters:data.results}))
				.catch(error => console.log(error))
			},
			getPlanets: () => {
				fetch(apiUrl + "planets")
				.then(resp => resp.json())
				.then(data => setStore({planets:data.results}))
				.catch(error => console.log(error))
			},
			getStarships: () => {
				fetch(apiUrl + "starships")
				.then(resp => resp.json())
				.then(data => setStore({starships:data.results}))
				.catch(error => console.log(error))
			},
			addFavorites: (name, uid, type) => {
				const store = getStore();
				const newFavorite = { name, uid, type }; // Include type
				const newFavorites = [...store.favorites, newFavorite];
				setStore({ favorites: newFavorites });
			  },
			  getFavorites: (favItem) => {
				const store = getStore();
				store.favorites.push(favItem);
				setStore({ favorites: store.favorites });
			  },
			  removeFavorites: (uid, type) => {
                const store = getStore();
                const newFavorites = store.favorites.filter(
                    (favorite) => favorite.uid !== uid || favorite.type !== type
                );
                setStore({ favorites: newFavorites });
            },
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
