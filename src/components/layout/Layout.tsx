import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import css from "./layout.css";
import logo from "../../images/logo.png";
import { useCheckLogStatus } from "../../hooks";

export function Layout() {
  const { logState } = useCheckLogStatus();
  const navigate = useNavigate();
  const navMenu: any = React.createRef();
  const hmbgMenu: any = React.createRef();
  function goData() {
    navigate("/data");
  }
  function goReportedPets() {
    navigate("/reported");
  }
  function goReportPet() {
    navigate("/report-pet");
  }
  function goHome() {
    navigate("/");
  }

  let flag = true;
  function clickHandler() {
    flag
      ? (navMenu.current.style.display = "flex")
      : (navMenu.current.style.display = "none");
    flag
      ? (hmbgMenu.current.style.display = "none")
      : (hmbgMenu.current.style.display = "block");
  }
  function navMenuHandler() {
    navMenu.current.style.display = "none";
    hmbgMenu.current.style.display = "flex";
  }
  function checkLogged() {
    const userStatus = logState;
    if (userStatus == false) {
      navigate("/login");
    }
    if (!userStatus) {
      console.log("Inicia sesión o registrate");
    }
  }
  return (
    <div className={css.container}>
      <header className={css.header}>
        <img onClick={goHome} className={css.logo} src={logo} alt="logo" />
        <div onClick={checkLogged} ref={navMenu} className={css.nav_menu}>
          <a onClick={goData} className={css.links}>
            Mis datos
          </a>
          <a onClick={goReportedPets} className={css.links}>
            Mascotas reportadas
          </a>
          <a onClick={goReportPet} className={css.links}>
            Reportar mascota
          </a>
          <a onClick={navMenuHandler} className={css.links}>
            Cerrar
          </a>
          <div className={css.lower_text}>
            <p className={css.email}>maximorossini2016@gmail.com</p>
            <p className={css.cerrar_sesion}>cerrar sesión</p>
          </div>
        </div>
        <div
          ref={hmbgMenu}
          onClick={clickHandler}
          className={css.hamburguerMenu}
        >
          <div className={css.hamburguerMenu_lines}></div>
          <div className={css.hamburguerMenu_lines}></div>
          <div className={css.hamburguerMenu_lines}></div>
        </div>
      </header>
      <Outlet />
      <footer className={css.footer}></footer>
    </div>
  );
}
