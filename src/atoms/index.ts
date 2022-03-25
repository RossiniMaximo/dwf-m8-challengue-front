// Creo que tengo que crear un atomo para guardar si el user esta logged o no.
// Y afectar con los hooks a este atomo
// Usando esa info para hacer que mi app reaccione o actue en base a ellos.

import { getMe } from "../api-calls";
import { atom, selector, useSetRecoilState } from "recoil";
import { useEffect } from "react";

// Este endpoint guarda el valor del email del user.
export const user = atom({
  key: "userEmail",
  default: {
    email: "",
    fullname: "",
  },
});

// Este selector se encarga de traer la respuesta de la llamada a la API
// Para obtener la información del token del usuario.

export const userData = selector({
  key: "userData",
  get: async ({ get }) => {
    const userData = await getMe();
    return userData;
  },
});

// Este atomo guarda si hay un usuario logeado o no.
// Este va a servir para hacer la acción de llevarnos  a la escena login si es que no hay
// ningun user logeado.
// Se va a invocar en la escena de la password luego de haber comprobado que la contraseña es existente.
// Sino se va a invocar desde la escena datos una vez registrado exitosamente.

export const userLoged = atom({
  key: "userLoged",
  default: false,
});

export const token = atom({
  key: "saveToken",
  default: "",
});

export const petId = atom({
  key: "petIdAtom",
  default: "",
});

export const pet = atom({
  key: "petAtom",
  default: {
    petName: "",
    lat: 0,
    length: 0,
    img: "",
  },
});
