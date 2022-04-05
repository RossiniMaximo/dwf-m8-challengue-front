import React from "react";
import css from "./reported.css";
import { useGetUserPets, useUserData } from "../../hooks";
import { UserPetCard } from "../../components/userPetCard";

export function ReportedPetsPage() {
  const [user, setUser] = useUserData();
  const petsArr = useGetUserPets();
  console.log("petsArr", petsArr);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Your reports : </h2>
      {petsArr.map((p) => {
        return (
          <div className={css.card_container}>
            <UserPetCard imgURL={p.imgURL} petName={p.petName} petId={p.id} />
          </div>
        );
      })}
    </div>
  );
}
