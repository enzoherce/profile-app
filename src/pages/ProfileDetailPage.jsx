import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import styles from "../styles/profiledetail.module.css";
import { useAuth } from "../hooks/useAuth"; 

const ProfileDetailPage = () => {
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const { isLogin } = useAuth();

  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~vherce/fetch-data-with-id.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  return (
    <Wrapper>
      <h1>{profile.name}</h1>
      <div className={styles["flex-container"]}>
        <p>{profile.title}</p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>{profile.bio}</p>
        <img src={profile.image_url} alt={profile.name} />
        {isLogin && (
          <Link to="edit" className={styles["button"]}>
            Edit Profile
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

export default ProfileDetailPage;
