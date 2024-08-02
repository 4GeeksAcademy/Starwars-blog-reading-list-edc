import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import starWarsLogo from "../../img/star-wars-logo-png-transparent[1].png";

export const Navbar = ({ category }) => {
	const { store, actions } = useContext(Context);
	const handleDeleteFavorite = (uid, type) => {
		actions.removeFavorites(uid, type);
	};
	const logoStyle = {
		width: "200px",
		height: "200px",
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-5 py-0">
			<Link to="/">
				<img id="sw-logo" src={starWarsLogo} style={logoStyle} alt="logo" />
			</Link>
			<div class="dropdown">
				<button className="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites [{store.favorites.length}]
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					{store.favorites.length > 0 ? (
						store.favorites.map((favs, index) => (
							<li key={index} className="dropdown-item d-flex justify-content-between">
								<Link to={`/${favs.type}/${favs.uid}`}>
									<span>
										{favs.name}
									</span>
								</Link>
								<span onClick={() => handleDeleteFavorite(favs.uid, favs.type)}>
									<i className="fa-regular fa-trash-can ps-2"></i>
								</span>
							</li>
						))
					) : (
						<li className="dropdown-item text-center">
							(empty)
						</li>

					)}

				</ul>
			</div>
		</nav>
	);
};
