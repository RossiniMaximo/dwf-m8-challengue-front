import React, { useState } from "react";
import css from "./reported.css";

// Tengo que traer de alguna manera traer el array mascotas reportadas y
// si es nulo tengo que imprimir un texto que diga que no hay reportes hechos,
// si por el contrario , el usuario ha cometido reportes, se debe mostrar una
// card con la imagen , nombre y apellido de la mascota.

export function ReportedPetsPage() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Your reports : </h2>
    </div>
  );
}
