import React, { useState } from "react";
import { HiClipboardCopy } from "react-icons/hi";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_TEST } from "../../config";

const Pay = () => {
    const location = useLocation()
    const {payment, plan, user} = location.state;
    const [rscreen, setrscreen] = useState(null)
    const [copied, setCopied] = useState(false);
    const [verify, setverify] = useState(false);
    const [wrong, setwrong] = useState(false)
    const navigate = useNavigate()
    const [screenshot, setScreenshot] = useState(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("0x8FE830d10dBFf6D06fabf5626C49E47e6F64546f");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const receiveScreenshot = async () => {
        if (screenshot !== null){
            try {
                const formdata = new FormData();
                console.log('Screenshot: ', rscreen)
                formdata.append('plan', plan)
                formdata.append('screenshot', rscreen)
                formdata.append('username', user)
                const response = await fetch(`${BASE_TEST}/paymentvalidation`, {
                    method: "POST",
                    body: formdata
                })
                if (!response.ok){
                    return
                }
                const resp2 = await response.json()
                if (resp2.status === 200){
                    console.log('Success')
                    setverify(true)
                    navigate('/home')
                }
                else{
                    console.log("Failure")
                    console.log(resp2)
                    setwrong(false)
                }
            } catch (error) {
                console.error(error)
            }
            
        }
        
    }

    const handleScreenshotChange = (event) => {
        const file = event.target.files[0];
        setrscreen(file)
        const reader = new FileReader();
    
        reader.onload = (event) => {
            setScreenshot(event.target.result);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    

    return(
        <div>
            <Navbar/>
            <div>
                <p className="text-xl font-bold text-green-700">Investment Plan: {plan}</p>
            </div>
            <div>
                <p className="text-lg text-left font-bold mt-4">Plan: {plan}</p>
            </div>
            {verify && <p className="font-bold text-md mt-3 text-green-700">Screenshot has been sent for verification (Takes about 2-3 business days)</p>}
            <p className="text-left mt-5 font-bold text-green-700 mr-2">Payment Address (ERC 20 USDT)</p>
            <div className="flex flex-row items-center">
                <input
                    placeholder="0x8FE830d10dBFf6D06fabf5626C49E47e6F64546f"
                    color="gray"
                    disabled={true}
                    className="shadow-md text-lg font-bold text-green-700 p-3 border-2 border-black rounded-md mt-5 w-[90%]"
                />
                <HiClipboardCopy 
                    color="black"
                    size={50} 
                    className="text-gray-500 ml-2 cursor-pointer mt-5" 
                    onClick={copyToClipboard} 
                />
            </div>
            {copied && <span className="text-green-600 ml-2 font-bold mt-5">Copied!</span>}
            <p className="text-lg font-bold mt-4 text-left text-green-700">Amount: {payment} BTC (USDT EQUIVALENT)</p>

            <div className="mt-10 flex flex-col items-center">
                <label htmlFor="screenshot" className="text-left mt-5 font-bold text-green-700">Screenshot of Transaction</label>
                <input
                    type="file"
                    id="screenshot"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="mt-2"
                />
                {screenshot !== null && <img src={screenshot} alt="Screenshot" className="w-full"/>}
            </div>
            <div className="border-2 border-green-700 bg-green-700 cursor-pointer rounded-md mt-10 p-2 group hover:bg-black hover:border-black transition" onClick={() => {
                receiveScreenshot();
            }}>
                <p className="text-xl font-bold text-white">Submit Payment</p>
            </div>
        </div>
    );
}

export default Pay;
