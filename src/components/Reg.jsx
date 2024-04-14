import React, {useState, useEffect, useContext} from "react";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { BiLogIn, BiLogoFacebook } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BASE_TEST } from "../../config";
import { AppContext } from "../../context";

const Reg = () => {
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const {settoken} = useContext(AppContext)
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [incorrect, setincorrect] = useState(false)
  const [unknown, setunknown] = useState(false)
  const [correct, setcorrect] = useState(false)

  const register = async () => {
    const formdata = new FormData()
    formdata.append('username', username)
    formdata.append('password', password)
    const response = await fetch(`${BASE_TEST}/signup`, {
      method: 'POST',
      body: formdata
    })
    console.log(response)
    if (!response.ok){
      return
    }
    const resp2 = await response.json()
    if (resp2.status === 200){
      console.log('Correct')
      setcorrect(true)
      settoken(resp2.token)
      setincorrect(false)
      navigate('/home')
    }
    else if (resp2.status === 500){
      console.log('incorrect')
      setincorrect(true)
      setcorrect(false)
      setunknown(false)
    }
    else{
      console.log('Unknown')
      setunknown(true)
      setcorrect(false)
      setincorrect(false)
    }

  }
    return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
      <img
          src="https://previews.123rf.com/images/anawat/anawat1601/anawat160100946/50305534-close-up-of-stacking-gold-coins-on-white-background-plant-growing-on-gold-coin-saving-and-investment.jpg"
          alt="ABC Investment"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign up with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9  rounded-full bg-green-600 hover:bg-green-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <BiLogoFacebook
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-green-600 hover:bg-green-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineTwitter
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-green-600 hover:bg-green-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineGoogle
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <div>
          {correct && <p className="text-green-700 text-md">Sign Up success, redirecting now...</p>}
          {incorrect && <p className="text-red-600 text-md py-2">Invalid username type, try again</p>}
          {unknown && <p className="text-red-600 text-md py-2">Unknown error occurred, But your funds are safe!</p>}
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Full Name eg(FirstName LastName)"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="email"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Username"
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
            <span>Agree to Terms</span>
          </label>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={register}
          >
            Register
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reg;
