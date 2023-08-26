import { useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";

const App = () => {
	const [monsters, setMonsters] = useState([]);
	const [searchField, setSearchField] = useState("");
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => setMonsters(users));
	}, []);

	useEffect(() => {
		setFilteredMonsters(
			monsters.filter((monster) =>
				monster.name
					.toLowerCase()
					.includes(searchField.toLocaleLowerCase())
			)
		);
	}, [searchField, monsters]);

	const onSearchChange = (e) =>
		setSearchField(e.target.value.toLocaleLowerCase());

	return (
		<div className="App">
			<h1 className="app-title">Monsters Rolodex</h1>

			<SearchBox
				onChangeHandler={onSearchChange}
				placeholder="Search Monsters"
				className="monster-search-box"
			/>

			<CardList monsters={filteredMonsters} />
		</div>
	);
};

export default App;
