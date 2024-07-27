import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import starWarsLogo from "../../img/star-wars-logo-png-transparent[1].png";

export const Navbar = ({ category }) => {
	const { store, actions } = useContext(Context);
	const handleDeleteFavorite = (name) => {
		actions.removeFavorites(name);
	};
	const logoStyle = {
		width: "200px",
		height: "200px",
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img id="sw-logo" className="ms-5" src={starWarsLogo} style={logoStyle} alt="logo" />
			</Link>
			<div class="dropdown">
				<button className="btn btn-secondary dropdown-toggle me-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites [{store.favorites.length}]
				</button>
				<ul class="dropdown-menu">
					{store.favorites.length > 0 ? (
						store.favorites.map((favs, index) => (
							<li key={index} className="dropdown-item">
								<Link to={"/details/" + favs.type + "/" + favs.uid}>
									<span>
										{favs.name}
									</span>
								</Link>
								<span onClick={() => handleDeleteFavorite(favs.uid)}>
									<i className="fa-regular fa-trash-can"></i>
								</span>
							</li>
						))
					) : (
						<li className="dropdown-item">
							(empty)
						</li>

					)}

				</ul>
			</div>
		</nav>
	);
};
