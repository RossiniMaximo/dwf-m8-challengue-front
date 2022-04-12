import React from "react";
import css from "./reported.css";
import { useGetUserPets, useLocalStorage, useUserData } from "../../hooks";
import { UserPetCard } from "../../components/userPetCard";

export function ReportedPetsPage() {
  const [user, setUser] = useUserData();
  const petsArr = useGetUserPets();
  console.log("petsArr", petsArr);
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
      <h2 className={css.title}>Your reports : {petsArr.length} </h2>
      {petsArr
        ? petsArr?.map((p) => {
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
