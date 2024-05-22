import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import AllProducts from "../AllProducts/AllProducts";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import "./Home.css";

const Home = () => {
  const [vibeByNameData, setVibeByNameData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVibeByName = async () => {
      try {
        const response = await fetch(
          "https://api.furrl.in/api/v2/listing/getVibeByName",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "#HomeHunts",
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          const newData = {
            profileImageUrl: data.data.getVibeByName.profileImageUrl,
            name: data.data.getVibeByName.name,
          };
          setVibeByNameData(newData);
        } else {
          console.log("Error Fetching HomeHunts");
        }
      } catch (err) {
        console.log("Error Fetching: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVibeByName();
  }, []);

  return (
    <>
      <NavBar />
      <div className="home-hunts-cont">
        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            <img
              src={vibeByNameData?.profileImageUrl}
              alt={vibeByNameData?.name}
              className="home-hunts-profile-img"
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%)",
                textAlign: "center",
                color: "white",
                fontSize: "47px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                fontFamily: "sans-serif",
                fontStyle: "italic",
              }}
            >
              {vibeByNameData?.name}
            </div>
          </>
        )}
      </div>
      <AllProducts />
    </>
  );
};

export default Home;
