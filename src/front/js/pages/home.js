import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <Navbar></Navbar>
      <div className="text-center mt-5">Welcome to the application</div>;
    </div>
  );
};
