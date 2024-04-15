import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'

const Invest = () => {
    // Define ranks and their requirements
    const [isLoading, setIsLoading] = useState(true);
    const [decodedToken, setDecodedToken] = useState(null);
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getToken = () => {
            const token = localStorage.getItem('token');
            setDecodedToken(token ? jwt_decode(token) : null);
        };

        const getDetails = () => {
            if (decodedToken) {
                setUsername(decodedToken.username);
                setBalance(decodedToken.balance);
            }
            setIsLoading(false);
        };

        getToken();
        setTimeout(() => {
            getDetails();
        }, 3000);
    }, [decodedToken]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with your preferred loading indicator
    }


    return (
        <div>
            <div>
                <Navbar/>
                <p className="text-2xl font-bold mt-10 text-left mb-5">Investment Plans</p>
                <div>
                    <p className="text-xl font-bold">Invest In A Plan</p>
                    <div className="flex flex-col items-center mt-3 border-2 border-gray-600 bg-green-700 p-5 rounded-md">
                        <p className="text-l font-bold text-white">Make your money work for you and earn profits by investing in our world-class investment plans</p>
                        <div className="flex flex-col items-start border border-black rounded-lg mt-5 px-3 py-2 w-[70%]">
                            <p className="text-l font-bold text-white">Account Balance:</p>
                            <p className="font-bold text-white">$ {balance}</p>
                        </div>
                        <div className="flex flex-col items-center lg:flex-row lg:flex-wrap md:justify-center">
                            <p className="text-xl font-bold text-white mt-5 ">Choose A Plan</p>
                            <div onClick={() => {
                                            navigate('/pay', { state: { payment: "0.01", plan: "VIP1", user: username } });
                                        }} className="flex flex-col items-center space-y-5 border-2 bg-white border-black p-7 rounded-lg mt-10">
                                <p className="text-xl font-bold text-black mt-8">VIP 1</p>
                                <div>
                                    <p className="text-black font-bold text-lg">Amount: 0.01 BTC</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-black text-left mb-5">Benefits: </p>
                                    <div>
                                        <ol className="flex flex-col items-center space-y-5">
                                            <li><p className="text-black font-bold">Reward of 0.04 BTC after 2 months</p></li>
                                            <li><p className="text-black font-bold">Can withdraw 0.02 BTC with $200 fee</p></li>
                                        </ol>
                                    </div>
                                    <div className="border-2 border-black p-2 group rounded-lg hover:bg-green-700 hover:border-green-700 cursor-pointer bg-black mt-[150px]">
                                        <p className="text-white font-bold group-hover:text-black">
                                            INVEST
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-5 border-2 bg-white border-black p-7 rounded-lg mt-10">
                                <p className="text-xl font-bold text-black mt-8">VIP 2</p>
                                <div>
                                    <p className="text-black font-bold text-lg">Amount: 0.02 BTC</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-black text-left mb-5">Benefits: </p>
                                    <div>
                                        <ol className="flex flex-col items-center space-y-5">
                                            <li><p className="text-black font-bold">Reward of 0.08 BTC after 2 months</p></li>
                                            <li><p className="text-black font-bold">Can withdraw 0.04 BTC with $200 fee</p></li>
                                        </ol>
                                    </div>
                                    <div onClick={() => {
                                            navigate('/pay', { state: { payment: "0.02", plan: "VIP2", user: username } });
                                        }} className="border-2 border-black p-2 group rounded-lg hover:bg-green-700 hover:border-green-700 cursor-pointer bg-black mt-[150px]">
                                        <p className="text-white font-bold group-hover:text-black">
                                            INVEST
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-5 border-2 bg-white border-black p-7 rounded-lg mt-10">
                                <p className="text-xl font-bold text-black mt-8">VIP 3</p>
                                <div>
                                    <p className="text-black font-bold text-lg">Amount: 0.03 BTC</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-black text-left mb-5">Benefits: </p>
                                    <div>
                                        <ol className="flex flex-col items-center space-y-5">
                                            <li><p className="text-black font-bold">Reward of 0.12 BTC after 2 months</p></li>
                                            <li><p className="text-black font-bold">Can withdraw 0.06 BTC with $200 fee</p></li>
                                        </ol>
                                    </div>
                                    <div onClick={() => {
                                            navigate('/pay', { state: { payment: "0.03", plan: "VIP3", user: username } });
                                        }} className="border-2 border-black p-2 group rounded-lg hover:bg-green-700 hover:border-green-700 cursor-pointer bg-black mt-[150px]">
                                        <p className="text-white font-bold group-hover:text-black">
                                            INVEST
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-5 border-2 bg-white border-black p-7 rounded-lg mt-10">
                                <p className="text-xl font-bold text-black mt-8">VIP 4</p>
                                <div>
                                    <p className="text-black font-bold text-lg">Amount: 0.04 BTC</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-black text-left mb-5">Benefits: </p>
                                    <div>
                                        <ol className="flex flex-col items-center space-y-5">
                                            <li><p className="text-black font-bold">Reward of 0.16 BTC after 2 months</p></li>
                                            <li><p className="text-black font-bold">Can withdraw 0.08 BTC with $200 fee</p></li>
                                        </ol>
                                    </div>
                                    <div onClick={() => {
                                            navigate('/pay', { state: { payment: "0.04", plan: "VIP4", user: username } });
                                        }} className="border-2 border-black p-2 group rounded-lg hover:bg-green-700 hover:border-green-700 cursor-pointer bg-black mt-[150px]">
                                        <p className="text-white font-bold group-hover:text-black">
                                            INVEST
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-5 border-2 bg-white border-black p-7 rounded-lg mt-10">
                                <p className="text-xl font-bold text-black mt-8">VIP 5</p>
                                <div>
                                    <p className="text-black font-bold text-lg">Amount: 0.05 BTC</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-black text-left mb-5">Benefits: </p>
                                    <div>
                                        <ol className="flex flex-col items-center space-y-5">
                                            <li><p className="text-black font-bold">Reward of 0.2 BTC after 2 months</p></li>
                                            <li><p className="text-black font-bold">Can withdraw 0.1 BTC with $200 fee</p></li>
                                        </ol>
                                    </div>
                                    <div onClick={() => {
                                            navigate('/pay', { state: { payment: "0.05", plan: "VIP5", user: username } });
                                        }} className="border-2 border-black p-2 group rounded-lg hover:bg-green-700 hover:border-green-700 cursor-pointer bg-black mt-[150px] transition">
                                        <p className="text-white font-bold group-hover:text-black transition">
                                            INVEST
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invest;
