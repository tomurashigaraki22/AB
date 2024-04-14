import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";


const Profile = () => {
    const [username, setUsername] = useState();
    const [balance, setBalance] = useState();
    const location = useLocation();
    const navigate = useNavigate()
    const { token }  = location.state;

    useEffect(() => {
        const getDetails = () => {
            setUsername(token.username);
            setBalance(token.balance);
        }
        getDetails();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <div>
                <div>
                    <p className="text-2xl font-bold text-green-700">{username}'s Profile</p>
                </div>
                <div>
                    <BsPersonCircle color="black" size={200} className="mt-10"/>
                </div>
                <div>
                    <p className="text-xl font-bold text-green-700 mt-5">Balance: ${balance}</p>
                </div>
            </div>

            <div onClick={() => {
                navigate('/home')
            }} className="fixed bottom-0 group hover:bg-black cursor-pointer hover:border-black border-2 border-green-700 mb-5 p-2 rounded-lg bg-green-700 w-[70%]">
                <p className="text-lg font-bold text-white text-center">Back To Home</p>
            </div>
        </div>
    );
}

export default Profile;
