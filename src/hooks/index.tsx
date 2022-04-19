import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import { checkEmail, createToken } from "../api-calls";
import { pet, token, update, updatePetSelector, user } from "../atoms";
import { userPets } from "../atoms";
import { userLoged } from "../atoms";
import { petId } from "../atoms";

export const useUserLogUser = () => useRecoilState(userLoged);
export const useUserData = () => useRecoilState(user);
export const useUserEmail = () => useRecoilState(user);
export const usePetId = () => useRecoilState(petId);
export const usePetState = () => useRecoilState(pet);
export const useToken = () => useRecoilState(token);
export const useUpdateCheck = () => useRecoilState(update);
export const usePet = () => useRecoilState(pet);

// Esta es la función que se lleva a cabo en la escena de password se usa para crear un token
export function useCreateToken() {
  const [currentToken, setToken] = useRecoilState(token);
  async function login(email, password) {
    try {
      const { token } = await createToken(email, password);
      console.log("token", token);
      localStorage.setItem("auth_token", token);

      return true;
    } catch (e) {
      console.error("user o password incorrectas");
    }
  }
  return { login };
}

export function useCheckLogStatus() {
  const navigate = useNavigate();
  const [logState, setLoged] = useRecoilState(userLoged);
  return {
    logState,
    setLoged,
  };
}

export function useLocalStorage(key, initialValue) {
  const [storedData, setStoredData] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredData(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };
  return [storedData, setValue];
}

export function useLogOut() {
  localStorage.setItem("user-data", JSON.stringify({}));
  localStorage.setItem("auth_token", "");
  const [user, setUser] = useUserData();
  setUser({ email: "", fullname: "", userId: "", logged: false });
  const [logStatus, setLogStatus] = useUserLogUser();
  setLogStatus(false);
  const { setLoged } = useCheckLogStatus();
  setLoged(false);
}
