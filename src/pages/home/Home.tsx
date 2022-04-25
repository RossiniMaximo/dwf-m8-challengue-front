import React, { useEffect, useState } from "react";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { PetCard } from "../../components/homePetsCard/PetCard";
import css from "./home.css";
import { getNearbyPets } from "../../api-calls";
import { useLocalStorage, useLogOut } from "../../hooks";
import { useUserData, useUserLogUser } from "../../hooks";
import img from "../../images/image.png";

export function Home() {
  const [logged, setLogged] = useUserLogUser();
  const [user, setUser] = useUserData();
  const [userData, setUserData] = useLocalStorage("user-data", {});
  const [results, setResults] = useState([]);
  const [provided, setProvided] = useState(false);
  if (userData) {
    console.log("userData", userData);
    setUser(userData);
    setLogged(userData.logged);
  }

  function handleClick(e) {
    const buttonEl = e.target;
    setProvided(true);
    buttonEl.classList.add(css.dissapear);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("lat", lat);
      console.log("lng", lng);
      const call = await getNearbyPets(lat, lng);
      setResults(call);
      console.log("call", call);
    });
  }

  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className={css.home_container}
    >
      <Text children={"Lost Pets"} style={css.title} />
      <div className={css.text_container}>
        {!provided ? (
          <Text
            children={
              "Give the app access to your location in order to show lost pets"
            }
            style={css.subtitle}
          />
        ) : (
          ""
        )}

        <div className={css.button_container}>
          <Button
            clickHandler={handleClick}
            children={"Provide location"}
            style={css.button}
          />
        </div>
      </div>
      <div className={css.cards_container}>
        {results
          ? results.map((r) => {
              return (
                <PetCard
                  petname={r.petName}
                  imgURL={r.imgURL}
                  key={r.objectID}
                  petId={r.objectID}
                  location={r.location}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
