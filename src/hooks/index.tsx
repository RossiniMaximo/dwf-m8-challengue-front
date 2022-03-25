import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createUser } from "../api-calls";
import {
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import { checkEmail, createToken } from "../api-calls";
import { pet, token, user } from "../atoms";
import { userData } from "../atoms";
import { userLoged } from "../atoms";
import { petId } from "../atoms";

export const useUserData = () => useRecoilState(user);
export const useUserEmail = () => useRecoilState(user);
export const usePetId = () => useRecoilState(petId);
export const usePetState = () => useRecoilState(pet);
export const useToken = () => useRecoilState(token);

// Esta es la función que se lleva a cabo en la escena de password se usa para crear un token
export function useCreateToken() {
  const [currentToken, setToken] = useRecoilState(token);
  async function login(email, password) {
    try {
      const { token } = await createToken(email, password);
      localStorage.setItem("auth_token", token);
      return true;
    } catch (e) {
      console.error("user o password incorrectas");
    }
  }
  return { login };
}

export function useCheckLogStatus() {
  const [logState, setLoged] = useRecoilState(userLoged);
  return {
    logState,
    setLoged,
  };
}
