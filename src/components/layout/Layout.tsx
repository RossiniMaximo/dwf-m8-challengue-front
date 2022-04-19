import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import css from "./layout.css";
import logo from "../../images/logo.png";
import { useUserData, useLogOut, useCheckLogStatus } from "../../hooks";

export function Layout() {
  const { logState, setLoged } = useCheckLogStatus();
  const [status, setStatus] = useState();
  const [user, setUser] = useUserData();
  const email = user.email;
  const navigate = useNavigate();
  const navMenu: any = React.createRef();
  const hmbgMenu: any = React.createRef();

  function goData() {
    /* console.log("user status  GoData", user); */
    if (!user.logged) {
      navigate("/login");
      navMenu.current.style.display = "none";
      hmbgMenu.current.style.display = "flex";
    } else {
      navigate("/data");
      navMenu.current.style.display = "none";
      hmbgMenu.current.style.display = "flex";
    }
  }
  function goReportedPets() {
    /* console.log("user status ", user); */
    if (!user.logged) {
      navigate("/login");
      navMenu.current.style.display = "none";
      hmbgMenu.current.style.display = "flex";
    } else {
      navigate("/reported");
      navMenu.current.style.display = "none";
      hmbgMenu.current.style.display = "flex";
    }
  }
  function goReportPet() {
    /* console.log("user status", user); */
    if (!user.logged) {
      navigate("/login");
      navMenu.current.style.display = "none";
      hmbgMenu.current.style.display = "flex";
    } else {
      navigate("/report-pet");
      navMenu.current.style.display = "none";
      hmbgMenu.current.style.display = "flex";
    }
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
    const storagedUserStatus = JSON.parse(localStorage.getItem("user-data"));
    const userStatus = storagedUserStatus?.logged;
    /* console.log("storagedUserStatus", userStatus); */
    setStatus(userStatus);
    setUser({ ...user, logged: userStatus });
  }
  function logOut() {
    navigate("/");
    window.location.reload();
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
              {user.logged ? "Log Out" : ""}
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
