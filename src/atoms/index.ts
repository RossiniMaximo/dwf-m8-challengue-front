import { getUserPets, updatePet } from "../api-calls";
import { atom, selector, useSetRecoilState } from "recoil";
import { useEffect } from "react";

export const user = atom({
  key: "user",
  default: {
    email: "",
    fullname: "",
    userId: null,
    logged: false,
  },
});

export const userPets = selector({
  key: "userPets",
  get: async ({ get }) => {
    const userData = get(user);
    console.log("userData ID", userData);
    const userId = userData.userId;
    if (userId) {
      const pets = await getUserPets(userId);
      console.log("userPets selector", pets);
      return pets;
    }
  },
});

export const updatePetSelector = selector({
  key: "petUpdater",
  get: async ({ get }) => {
    const id = get(petId);
    const data = get(pet);
    const res = await updatePet(data, id);
    /* console.log("res", res); */
    return res;
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
    img: null,
  },
});

export const update = atom({
  key: "updateAtom",
  default: false,
});
