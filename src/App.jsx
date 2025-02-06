import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import image_man from "./assets/headshot-man.png";
import image_woman from "./assets/headshot-woman.png";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ProfileForm from "./components/ProfileForm";


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
  //Variable to store the animation state
  const [animation, setAnimation] = useState(false);
  //function to update the animation state
  const handleAnimation = () => {
    setAnimation(false);
  };

  //Variable to store the mode state
  const [mode, setMode] = useState("light");
  //function to update the mode state
  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // get titles
  const titles = [...new Set(profiles.map((profile) => profile.title))];

  const [title, setTitle] = useState("");
  //update the title on change of the drowndrop
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setAnimation(true);
  };

  const [search, setSearch] = useState("");
  //update the search on change of the input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setAnimation(true);
  };

  //clear the title and search
  const handleClear = () => {
    setTitle("");
    setSearch("");
    setAnimation(true);
  };

  //filter the profiles based on the title
  const filtedProfiles = profiles.filter(
    (profile) =>
     (title === "" || profile.title === title) &&
      profile.name.toLowerCase().includes(search.toLowerCase())
  );
  const buttonStyle = {
    border: "1px solid #ccc",
  };

  return (
    <>
      <header>
        <Navbar mode={mode} updateMode={handleModeChange}/>
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <ProfileForm />
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
            <button onClick={handleClear} style={buttonStyle}>
              <span className="sr-only">Reset</span>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="profile-cards">
            {filtedProfiles.map((profile) => (
              <Card
                key={profile.email}
                {...profile}
                animate={animation}
                updateAnimate={handleAnimation}
              />
            ))}
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default App;