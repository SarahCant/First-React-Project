import { useState, useEffect } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    getUsers();

    async function getUsers() {
      const data = localStorage.getItem("users"); // Get data from local storage

      let userData = [];

      if (data) {
        userData = JSON.parse(data);
      } else {
        userData = await fetchUsers();
      }

      //userData.sort((user1, user2) => user1.name.localeCompare(user2.name)); // Sort by name initially

      setUsers(userData); // Set the users state with the data from local storage
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
    );
    const data = await response.json();
    localStorage.setItem("users", JSON.stringify(data));
    return data;
  }

  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const titles = [...new Set(users.map((user) => user.title))];

  if (filter !== "") {
    filteredUsers = filteredUsers.filter((user) => user.title === filter);
  }

  // Sorting based on the selected sort option (sort by name, title, or mail)
  filteredUsers.sort((user1, user2) => user1[sort].localeCompare(user2[sort]));

  return (
    <section className="page">
      <form role="search" className="grid-filter">
        <label>
          Search by name
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Filter by title
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">Select title</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={(e) => setSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="title">Title</option>
            <option value="mail">Mail</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </section>
    </section>
  );
}
