import React, { useContext, useState, useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AppContext } from "../../context";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [tokennull, settokennull] = useState(false)
    const {token} = useContext(AppContext)
    const [decodedT, setdecodedT] = useState(null)
    const navigate = useNavigate()

    const [tokens, settoken] = useState()
    const [username, setusername] = useState()
    const [tier, settier] = useState('')
    const [balance, setbalance] = useState('')


    useEffect(() => {
        const getToken = () => {
            const token = localStorage.getItem('token')
            setdecodedT(jwt_decode(token))
        }
        const getDeets = () => {
            try {
                console.log(tokens)
                const decoded = jwt_decode(token)
                const username = decoded.username
                setdecodedT(decoded)
                console.log(decoded)
                settier(decoded.rank)
                setbalance(decoded.balance)
                setusername(username)
            } catch (error) {
                console.error(error)
            }
            
        }
        getToken();
        if (tokennull){
            return
        }
        else{
            getDeets();
        }
    }, [])
    
    return(
        <div className="flex flex-row items-start justify-between mb-10">
            <div>
                <p className="text-xl font-bold">ABC Invest</p>
            </div>
            <div onClick={() => {
                navigate('/profile', {state: {token: decodedT}})
            }} className="cursor-pointer">
                <BsPersonCircle color="black" size={35}/>
            </div>
        </div>
    );
}

export default Navbar;