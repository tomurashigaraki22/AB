import React, { useState, useEffect } from "react";
import { BASE_TEST } from "../../config";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [dict, setDict] = useState([]);
    const navigate = useNavigate();
    const [userrankid, setuserrankid] = useState()
    const [rankchange, setrankchange] = useState()
    const [rankchanged, setrankchanged] = useState()
    const [balancechanged, setbalancechanged] = useState()
    const [userbalid, setuserbalid] = useState()
    const [userbalance, setuserbalance] = useState()

    useEffect(() => {
        async function getTransactions() {
            try {
                const formdata = new FormData();
                formdata.append('password', 'abcinvest123');
                const response = await fetch(`${BASE_TEST}/getthistory`, {
                    method: "POST",
                    body: formdata
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const resp2 = await response.json();
                console.log('Response', response)
                if (resp2.status === 200) {
                    console.log('Success');
                    console.table(resp2.dict);
                    setDict(resp2.dict);
                } else if (resp2.status === 404) {
                    console.log('No transaction');
                    console.log('a', resp2);
                } else {
                    console.log('Unauthorized access');
                    console.log('b', resp2);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error as needed, such as setting an error state or displaying an error message
            }
        }
        getTransactions();
    }, []);
    

    const changeRank = async () => {
        const formdata = new FormData();
        formdata.append('userid', userrankid)
        formdata.append('rankchange', rankchange)
        const response = await fetch(`${BASE_TEST}/changerank`, {
            method: "POST",
            body: formdata
        })
        if (!response.ok){
            return
        }
        const resp2 = await response.json()
        if (resp2.status === 200){
            console.log("Success")
            setrankchanged(true)
        }
        else if(resp2.status === 404){
            console.log('No such user found')
            setrankchanged(false)
        }
        else{
            console.log('Error')
            setrankchanged(false)
        }
    }

    const changeBalance = async () => {
        const formdata = new FormData();
        formdata.append('userid', userbalid)
        formdata.append('balance', userbalance)
        const response = await fetch(`${BASE_TEST}/changebalance`, {
            method: "POST",
            body: formdata
        })
        if (!response.ok){
            return
        }
        const resp2 = await response.json()
        if (resp2.status === 200){
            console.log("Success")
            setbalancechanged(true)
        }
        else if(resp2.status === 404){
            console.log('No such user found')
            setbalancechanged(false)
        }
        else{
            console.log('Error')
            console.log(resp2)
            setbalancechanged(false)
        }
    }

    const handleClick = (imageSrc) => {
        if (!imageSrc) {
            console.error('Image source is undefined');
            return;
        }
    
        const ts = imageSrc.split('/');
        const s = ts[ts.length - 1];
        console.log(s);
        window.location.href = `${BASE_TEST}/uploads/${s}`;
        // You can display the image in a modal or a separate component
    };
    

    return (
        <div>
            <div>
                <p className="text-2xl font-bold text-green-700">Admin Panel For ABC Investment</p>
            </div>
            <div>
                <div>
                    <p className="text-lg font-bold mt-10">Transactions</p>
                </div>
                <div className="flex flex-col items-center justify-center mt-10 max-w-full">
                <table className="table-auto border-2 border-gray-500 rounded-lg max-w-full sm:max-w-screen-sm">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-r-2 border-gray-500">Username</th>
                                <th className="px-4 py-2 border-r-2 border-gray-500">Transaction</th>
                                <th className="px-4 py-2 border-r-2 border-gray-500">Plan</th>
                                <th className="px-4 py-2 border-r-2 border-gray-500">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dict.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="border-2 border-gray-500 px-4 py-2">{transaction.username}</td>
                                    <td className="border-2 border-gray-500 px-4 py-2">{transaction.transaction}</td>
                                    <td className="border-2 border-gray-500 px-4 py-2">{transaction.plan}</td>
                                    <td className="border-2 border-gray-500 px-4 py-2" onClick={() => handleClick(transaction.transaction)}>See image</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col items-center space-y-10">
                    <p className="text-xl font-bold mt-10">Modify User Ranks</p>
                    {rankchanged === true && <p className="text-red-600 font-bold">Rank Changed successfully</p>}
                    {rankchanged === false && <p className="text-red-600 font-bold">User not found or can't connect to server</p>}
                    <input 
                    placeholder="Input user Id"
                    value={userrankid}
                    onChange={(e) => setuserrankid(e.target.value)}
                    color="gray"
                    className="w-[80%] border-2 border-gray-600 rounded-md p-3"
                    />
                    <input
                    placeholder="Input Rank (VIP1, VIP2 - VIP6)"
                    color="gray"
                    value={rankchange}
                    onChange={(e) => setrankchange(e.target.value)}
                    className="w-[80%] border-2 border-gray-600 rounded-md p-3"
                    />
                    <div onClick={() => changeRank()} className="border-2 cursor-pointer group hover:bg-black border-gray-600 px-3 py-2 rounded-md">
                        <p className="text-lg font-bold group-hover:text-white">Increase Rank</p>
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-10">
                    <p className="text-xl font-bold mt-10">Modify User Balance</p>
                    {balancechanged === true && <p className="text-red-600 font-bold">Balance Changed successfully</p>}
                    {balancechanged === false && <p className="text-red-600 font-bold">User not found or can't connect to server</p>}
                    <input 
                    placeholder="Input user Id"
                    color="gray"
                    value={userbalid}
                    onChange={(e) => setuserbalid(e.target.value)}
                    className="w-[80%] border-2 border-gray-600 rounded-md p-3"
                    />
                    <input
                    placeholder="Input New Balance in USD"
                    color="gray"
                    value={userbalance}
                    onChange={(e) => setuserbalance(e.target.value)}
                    className="w-[80%] border-2 border-gray-600 rounded-md p-3"
                    />
                    <div onClick={() => changeBalance()} className="border-2 cursor-pointer group hover:bg-black border-gray-600 px-3 py-2 rounded-md">
                        <p className="text-lg font-bold group-hover:text-white">Modify User Balance</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
