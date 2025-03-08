import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { initialState, homeReducer } from "../reducers/homeReducer";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { title, search, profiles, page, count } = state;

  const { data: titles, error: titlesError } = useFetch(
    "https://web.ics.purdue.edu/~vherce/get-titles.php"
  );

  const { data: profileData, error: profilesError } = useFetch(
    `https://web.ics.purdue.edu/~vherce/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`
  );

  useEffect(() => {
    if (titles?.titles) {
      dispatch({ type: "SET_TITLES", payload: titles.titles });
    }
  }, [titles]);

  useEffect(() => {
    if (profileData?.profiles) {
      dispatch({ type: "FETCH_DATA", payload: profileData });
    }
  }, [profileData]);

  const handleTitleChange = (event) => {
    dispatch({ type: "SET_TITLE", payload: event.target.value });
  };

  const handleSearchChange = (event) => {
    dispatch({ type: "SET_SEARCH", payload: event.target.value });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <Wrapper>
      <h1>Profile App</h1>

      <div className={styles["filter-wrapper"]}>
        <div className={styles["filter--select"]}>
          <label htmlFor="title-select">Select a title:</label>
          <select id="title-select" onChange={handleTitleChange} value={title}>
            <option value="">All</option>
            {titlesError ? (
              <option disabled>Error loading titles</option>
            ) : (
              titles?.titles?.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))
            )}
          </select>
        </div>

        <div className={styles["filter--search"]}>
          <label htmlFor="search">Search by name:</label>
          <input type="text" id="search" onChange={handleSearchChange} value={search} />
        </div>

        <button onClick={handleClear} className={styles["clear-btn"]}>
          <span className="sr-only">Reset</span>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className={styles["profile-cards"]}>
        {profilesError ? (
          <p>Error fetching profiles</p>
        ) : profiles.length > 0 ? (
          profiles.map((profile) => (
            <Link to={`/profile/${profile.id}`} key={profile.id}>
              <Card {...profile} />
            </Link>
          ))
        ) : (
          <p>No profiles found!</p>
        )}
      </div>

      {count > 10 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: page - 1 })}
            disabled={page === 1}
          >
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <span>
            {page}/{Math.ceil(count / 10)}
          </span>

          <button
            onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}
            disabled={page >= Math.ceil(count / 10)}
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default HomePage;
