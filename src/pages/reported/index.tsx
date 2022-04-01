import React from "react";
import css from "./reported.css";
import { useGetUserPets, useUserData } from "../../hooks";
import { UserPetCard } from "../../components/userPetCard";

// Tengo que traer de alguna manera traer el array mascotas reportadas y
// si es nulo tengo que imprimir un texto que diga que no hay reportes hechos,
// si por el contrario , el usuario ha cometido reportes, se debe mostrar una
// card con la imagen , nombre y apellido de la mascota.

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
