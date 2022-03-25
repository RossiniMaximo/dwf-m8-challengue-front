// Me falta contactarme con el endpoint para crear un usuario.

import { json } from "stream/consumers";
import { token } from "../atoms";
import { useToken } from "../hooks";

let key;

// Este endpoint sirve para chequear si en la tabla User hay algun usuario dado de alta
// con el email pasado
// chequea en la api si el email existe

export async function checkEmail(email) {
  const res = await fetch("http://localhost:3001/find-user", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await res.json();
  console.log("data", data);
  return {
    exists: data,
  };
}

// Esta funcion se contacta con el endpoint que nos permite verificar si hay algun usuario en la tabla Auth
//  que coincida con el email y la password pasadas.
export async function createToken(email, password) {
  // obtiene un token
  const res = await fetch("http://localhost:3001/auth/token", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  key = data;
  console.log("data del auth", data);
  return {
    token: data,
  };
}

export async function lookForPassword(password) {
  const res = await fetch("http://localhost:3001/find-password", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
}

// obtiene la data del  user vinculada al token
export async function getMe() {
  return {
    data: "1234asdf",
  };
}

export async function createUser(user, password) {
  console.log(user, password);
  console.log(user.email);
  const res = await fetch("http://localhost:3001/auth", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user,
      password,
    }),
  });
  const data = await res.json();
  console.log("data del createUser", data);
  return data;
}

export async function getNearbyPets() {
  const res = await fetch("http://localhost:3001/nearby-missed-pets");
  const data = await res.json();
  console.log("dat del getNearby pets", data);

  return data;
}

// Metodo para enviar mail reportando información acerca de una mascota
// extraviada
export async function reportInfo(pet) {
  const res = await fetch("http://localhost:3001/report-info", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ pet }),
  });
  const data = await res.json();
  console.log("data del reportInfo", data);
  return data;
}

export async function reportPet(pet) {
  /*  console.log("token key", key.token); */
  console.log("pet que llega", pet);

  const data = await fetch("http://localhost:3001/pet", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: "bearer" + " " + key.token,
    },
    body: JSON.stringify({ pet }),
  });
  console.log("data del report pet", data);
  return data;
}
