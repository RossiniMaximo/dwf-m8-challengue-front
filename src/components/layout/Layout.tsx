import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import css from "./layout.css";
import logo from "../../images/logo.png";
import { useUserData, useLogOut } from "../../hooks";

export function Layout() {
  const [status, setStatus] = useState();
  const [user, setUser] = useUserData();
  const email = user.email;
  const navigate = useNavigate();
  const navMenu: any = React.createRef();
  const hmbgMenu: any = React.createRef();
  function goData() {
    console.log("status in goData", status);
    status ? navigate("/data") : navigate("/login");
  }
  function goReportedPets() {
    status ? navigate("/reported") : navigate("/login");
  }
  function goReportPet() {
    status ? navigate("/report-pet") : navigate("login");
  }
  function goHome() {
    status ? navigate("/") : navigate("login");
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
    const storagedUserStatus = JSON.parse(localStorage.getItem("user-data"));
    console.log("storagedUserStatus", storagedUserStatus);
    const userStatus = storagedUserStatus?.logged;
    console.log("UserStatus", userStatus);
    setStatus(userStatus);
  }
  function logOut() {
    useLogOut();
  }

  return (
    <div className={css.container}>
      <header className={css.header}>
        <img onClick={goHome} className={css.logo} src={logo} alt="logo" />
        <div onClick={checkLogged} ref={navMenu} className={css.nav_menu}>
          <a onClick={goData} className={css.links}>
            Me
          </a>
          <a onClick={goReportedPets} className={css.links}>
            Reports
          </a>
          <a onClick={goReportPet} className={css.links}>
            Reportar pet
          </a>
          <a onClick={navMenuHandler} className={css.links}>
            Close
          </a>
          <div className={css.lower_text}>
            <p className={css.email}>{email}</p>
            <p onClick={logOut} className={css.cerrar_sesion}>
              Log Out
            </p>
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
