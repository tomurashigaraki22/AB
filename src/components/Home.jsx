import React, { useContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode'
import { AppContext } from "../../context";
import { CiCirclePlus } from "react-icons/ci";
import Navbar from "./Navbar";
import { AdvancedChart, CryptocurrencyMarket, MarketData, MarketOverview, MiniChart, SymbolInfo, Screener, TechnicalAnalysis } from "react-tradingview-embed";
import { useNavigate } from "react-router-dom";



const Home = () => {
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
            if (token === null){
                settokennull(true)
            }
            settoken(token)
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
        <div>
            <Navbar/>
            <div className="flex flex-row items-start space-x-3">
                <p className="text-black text-2xl font-bold">Hello,</p>
                <p className="text-gray-400 text-2xl font-bold pt-[0.2%]">{username}</p>
            </div>
            <div className="flex flex-col items-start mt-5 space-y-2 border border-green-500 p-3 rounded-lg bg-green-500">
                <div className="flex flex-row items justify-between w-full">
                <p className="text-2xl font-bold text-white">Tier: {tier}</p>
                <CiCirclePlus color="white" size={34}/>
                </div>
                <p className="text-xl font-bold text-white">Account Balance: $ {balance}</p>
                <p className="text-sm text-white font-bold">Available Withdrawal Balance: ${balance}</p>
            </div>
            <div className="mt-[50px] mb-[50px]">
                <div>
                    <MiniChart widgetProps={{"theme": "dark", "height": "200px", "symbol": "BTC",}}/>
                </div>
            </div>
            <div>
                {tier === "FREE" ? (
                    <>
                    <p className="text-xl font-bold mt-10 text-green-700">Active Investments</p>
                    <div className="mt-5">
                        <p className="text-l font-bold">Your money works for you, and you earn profits by investing in our world-class investment plans</p>
                        <div className="border border-gray-600 p-8 flex flex-col items-center space-y-10 rounded-lg mt-10">
                            <p>You currently have no active investments at the moment</p>
                            <div onClick={() => {
                                navigate('/invest', {state: {decodedToken: decodedT}})
                            }} className="border-2 cursor-pointer border-green-500 bg-green-500 rounded-md px-3 py-2 w-[50%] hover:bg-black hover:border-black">
                                <p className="text-l font-bold text-white">Invest Now</p>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                    <div className="border border-gray-600 p-4 rounded-md">
                        <p className="font-bold">You have 1 investment ongoing</p>
                        <p className="text-green-500 font-bold">Your Rank is: {tier}</p>
                        {tier === "VIP 1" && <p className="text-l font-bold text-gray-600">Returns for TIER {tier} is 0.4 BTC</p>}
                        {tier === "VIP 2" && <p className="text-l font-bold text-gray-600">Returns for TIER {tier} is 0.8 BTC</p>}
                        {tier === "VIP 3" && <p className="text-l font-bold text-gray-600">Returns for TIER {tier} is 1.6 BTC</p>}
                        {tier === "VIP 4" && <p className="text-l font-bold text-gray-600">Returns for TIER {tier} is 2.8 BTC</p>}
                        {tier === "VIP 5" && <p className="text-l font-bold text-gray-600">Returns for TIER {tier} is 4 BTC</p>}
                    </div>
                    
                    </>
                )}
                
            </div>
            <div className="mt-10">
                <p className="text-xl font-bold">Market Overview</p>
                <div>
                    <CryptocurrencyMarket widgetProps={{"colorTheme": "dark", "height": "200px"}}/>
                </div>
            </div>
            <div className="flex flex-col items-center mt-10">
                <p className="text-xl font-bold text-green-500">Technical Analysis</p>
                <div>
                    <TechnicalAnalysis widgetProps={{ "colorTheme": "dark", "height": "200px"}}/>
                </div>
            </div>
        </div>
    );
}

export default Home;