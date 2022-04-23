import React, { useEffect, useState } from "react";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { PetCard } from "../../components/homePetsCard/PetCard";
import css from "./home.css";
import { getNearbyPets } from "../../api-calls";
import { useLocalStorage } from "../../hooks";
import { useUserData, useUserLogUser } from "../../hooks";
import img from "../../images/background.png";

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

  async function handleClick(e) {
    const buttonEl = e.target;
    setProvided(true);
    buttonEl.classList.add(css.dissapear);
    const res = await getNearbyPets();
    setResults(res);
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
        {results?.map((r) => {
          return (
            <PetCard
              petname={r.petName}
              imgURL={r.imgURL}
              key={r.objectID}
              petId={r.objectID}
            />
          );
        })}
      </div>
    </div>
  );
}
