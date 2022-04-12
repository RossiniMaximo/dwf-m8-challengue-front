import React, { useEffect, useState } from "react";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { PetCard } from "../../components/homePetsCard/PetCard";
import css from "./home.css";
import { getNearbyPets } from "../../api-calls";
import { useLocalStorage } from "../../hooks";
import { useUserData, useUserLogUser } from "../../hooks";

export function Home() {
  const [logged, setLogged] = useUserLogUser();
  const [user, setUser] = useUserData();
  const [userData, setUserData] = useLocalStorage("user-data", {});
  const [results, setResults] = useState([]);

  if (userData) {
    console.log("userData", userData);
    setUser(userData);
    setLogged(userData.logged);
  }

  async function handleClick(e) {
    const buttonEl = e.target;
    buttonEl.classList.add(css.dissapear);
    const res = await getNearbyPets();
    setResults(res);
  }

  return (
    <div className={css.home_container}>
      <Text children={"Lost Pets"} style={css.title} />
      <div className={css.text_container}>
        <Text
          children={
            "Give the app access to your location in order to show lost pets"
          }
          style={css.subtitle}
        />
        <div className={css.button_container}>
          <Button
            clickHandler={handleClick}
            children={"Grant location"}
            style={css.button}
          />
        </div>
      </div>
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
  );
}
