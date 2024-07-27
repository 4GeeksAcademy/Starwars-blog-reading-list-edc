import React from "react";
import Charactercard from "../component/charactercard";
import Vehiclecard from "../component/vehiclecard";
import Planetcard from "../component/planetcard";
import "../../styles/home.css";

export const Home = () => (
	<div className="text-center mt-5">
		<Charactercard/>
		<Vehiclecard/>
		<Planetcard/>
	</div>
);
