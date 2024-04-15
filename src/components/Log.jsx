import React, { useContext, useEffect, useState } from "react";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import { BASE_TEST } from "../../config";
import { CiSun } from "react-icons/ci";
import { AppContext } from "../../context";
import jwt_decode from 'jwt-decode'
import { useGoogleLogin } from "@react-oauth/google";

const Log = ({ darkTheme, setdarkTheme }) => {
  const {toggleBlack, settoken} = useContext(AppContext)
  const navigate = useNavigate()
  const { login, register } = useKindeAuth()
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [incorrect, setincorrect] = useState(false)
  const [unknown, setunknown] = useState(false)
  const [correct, setcorrect] = useState(false)

  const signin = async (name, password) => {
    const formdata = new FormData()
    formdata.append('username', name)
    formdata.append('password', password)
    const response = await fetch(`${BASE_TEST}/login`, {
      method: 'POST',
      body: formdata
    })
    if (!response.ok){
      return
    }
    const resp2 = await response.json()
    if (resp2.status === 200){
      console.log('Correct')
      setcorrect(true)
      settoken(resp2.token)
      localStorage.setItem('token', resp2.token)
      navigate('/home')
    }
    else if (resp2.status === 404){
      console.log("Incorrect whatever")
      setincorrect(true)
    }
    else{
      console.log("unknown error")
      setunknown(true)
      console.log(resp2)
    }

  }


  const log = useGoogleLogin({
    onSuccess: async (codeResponse) =>  {
      console.log(codeResponse)
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`, {
        method: 'GET'
      })
      if (!response.ok){
        return
      }
      const resp2 = await response.json()
      if (resp2.error){
        return
      }
      else{
        signin(resp2.name, resp2.email)
      }
    }
  });

  return (
    <section className={`h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ${darkTheme ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://previews.123rf.com/images/anawat/anawat1601/anawat160100946/50305534-close-up-of-stacking-gold-coins-on-white-background-plant-growing-on-gold-coin-saving-and-investment.jpg"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-green-600 hover:bg-green-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineGoogle
              size={20}
              className="flex justify-center items-center w-full"
              onClick={() => {
                log();
              }}
            />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <div>
          {correct && <p className="text-green-700 text-md">Log In success, redirecting now...</p>}
          {incorrect && <p className="text-red-600 text-md py-2">Incorrect username or password, try again</p>}
          {unknown && <p className="text-red-600 text-md py-2">Unknown error occurred, But your funds are safe!</p>}
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-green-600 hover:text-green-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={() => signin(name, password)}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/#/register"
          >
            Register
          </a>
          
        </div>
        <div className="flex items-center justify-center pt-3">
          <CiSun
            color="black"
            size={30}
            onClick={() => toggleBlack()}
          />
        </div>

        
      </div>
    </section>
  );
};

export default Log;