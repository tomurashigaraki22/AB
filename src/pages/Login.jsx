import React, { useContext, useEffect, useState } from "react";
import Log from "../components/Log";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { AppContext } from "../../context";

const Login = () => {
  const {darkTheme, setDarkTheme} = useContext(AppContext)
  useEffect(() => {
    console.log(darkTheme)
  }, [])

  return (
<div className={`${darkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="md:mt-10 lg:mt-15">
        <p className="text-green-700 font-bold text-3xl mb-[-50px]">AlphaBridge Capital Investment</p>
      </div>
      <Log darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
    </div>
  );
};

export default Login;
