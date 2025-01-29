import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import image_man from "./assets/headshot-man.png";
import image_woman from "./assets/headshot-woman.png";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import { useState } from "react";

const App = () => {
  const profiles = [
    {
      img: image_man,
      name: "John Doe",
      title: "Software Engineer",
      email: "a@a.com",
    },
    {
      img: image_woman,
      name: "Lily Smith",
      title: "UX designer",
      email: "b@a.com",
    },
    {
      img: image_man,
      name: "Bob Johnson",
      title: "Web developer",
      email: "c@a.com",
    },
    {
      img: image_woman,
      name: "Ava Smith",
      title: "Web developer",
      email: "d@a.com",
    },
    {
      img: image_man,
      name: "Tom Smith",
      title: "Software Engineer",
      email: "e@a.com",
    },
    {
      img: image_woman,
      name: "Eva Smith",
      title: "Graphic designer",
      email: "f@a.com",
    },
  ];

  // get titles
  const titles = [...new Set(profiles.map((profile) => profile.title))];

  const [title, setTitle] = useState("");
  //update the title on change of the drowndrop
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  const [search, setSearch] = useState("");
  //update the search on change of the input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  //clear the title and search
  const handleClear = () => {
    setTitle("");
    setSearch("");
  };

  //filter the profiles based on the title
  const filtedProfiles = profiles.filter(
    (profile) =>
      (title === "" || profile.title === title) &&
      profile.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Wrapper>
          <h1>Profile App Labs</h1>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <div className="filter-wrapper">
            <div className="filter--select">
              <label htmlFor="title-select">Select a title:</label>
              <select
                id="title-select"
                onChange={handleTitleChange}
                value={title}
              >
                <option value="">All</option>
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter--search">
              <label htmlFor="search">Search by name:</label>
              <input
                type="text"
                id="search"
                onChange={handleSearchChange}
                value={search}
              />
            </div>
            <button onClick={handleClear}>Clear</button>
          </div>
          <div className="profile-cards">
            {filtedProfiles.map((profile) => (
              <Card key={profile.email} {...profile} />
            ))}
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default App;