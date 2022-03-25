import React, { useEffect, useState } from "react";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { PetCard } from "../../components/petCard/PetCard";
import css from "./home.css";
import { getNearbyPets } from "../../api-calls";

export function Home() {
  const [results, setResults] = useState([]);
  async function handleClick(e) {
    const buttonEl = e.target;
    buttonEl.classList.add(css.dissapear);
    const res = await getNearbyPets();
    setResults(res);
  }
  useEffect(() => {
    console.log("results changed", results);
  }, [results]);
  return (
    <div className={css.home_container}>
      <Text children={"Mascotas perdidas"} style={css.title} />
      <div className={css.text_container}>
        <Text
          children={
            "Conceder ubicación para mostrar mascotar extraviadas cerca tuyo"
          }
          style={css.subtitle}
        />
        <div className={css.button_container}>
          <Button
            clickHandler={handleClick}
            children={"conceder ubicación"}
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
