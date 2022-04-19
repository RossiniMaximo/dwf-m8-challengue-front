import React, { useState } from "react";
import css from "./reported.css";
import { useLocalStorage, useUserData } from "../../hooks";
import { UserPetCard } from "../../components/userPetCard";
import { getUserPets } from "../../api-calls";

export function ReportedPetsPage() {
  const [user, setUser] = useUserData();
  const [pets, setPets] = useState([]);
  const [flag, setFlag] = useState(false);

  async function getPets() {
    const pets = await getUserPets(user.userId);
    if (!flag) {
      setFlag(true);
      setPets(pets);
      console.log("pets", pets);
    }
  }
  getPets();

  const [storagedUserData, setStoragedUserData] = useLocalStorage(
    "user-data",
    {}
  );
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info("This page is reloaded");
    if (storagedUserData) {
      console.log("storaged data in local storage", storagedUserData);
      setUser(storagedUserData);
    }
  }
  return (
    <div className={css.container}>
      <h2 className={css.title}>Your reports : {pets.length} </h2>
      {pets
        ? pets.map((p) => {
            return (
              <div className={css.card_container}>
                <UserPetCard
                  imgURL={p.imgURL}
                  petName={p.petName}
                  petId={p.id}
                  key={p.id}
                />
              </div>
            );
          })
        : "There is no pet reported."}
    </div>
  );
}
