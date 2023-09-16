import { ChangeEvent, useEffect, useState } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import "./App.css";
import { getData } from "./utils/data.utils";

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState("");

  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setMonsters(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredMonsters(
      monsters.filter((monster) =>
        monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
      )
    );
  }, [searchField, monsters]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void =>
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
