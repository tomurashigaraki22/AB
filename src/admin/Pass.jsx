import React, { useContext, useState } from "react";
import { AppContext } from "../../context";


const Pass = () => {
    const {adminpass, setadminpass} = useContext(AppContext)
    const [signing, setsigning] = useState(false)
    const submits = () => {
        setsigning(true)
        if (adminpass === 'abcinvest123'){
            localStorage.setItem('adminauthenticated', true)
            setsigning(false)
            window.location.reload()
        }
        setsigning(false)
        localStorage.setItem('adminauthenticated', false)
    }

    return(
        <div className="flex flex-col items-center">
            <div>
                <p className="text-2xl font-bold text-green-700 p-8">AlphaBridge Capital Investment</p>
            </div>
            <div className="flex flex-col items-center space-y-10 mb-10">
                <p className="text-xl font-bold">Input Your Admin Password below</p>
                <input
                placeholder="Password"
                color="gray"
                value={adminpass}
                onChange={(e) => setadminpass(e.target.value)}
                className="w-[80%] border-2 border-green-700 p-3 rounded-lg"
                />
            </div>
            <div onClick={() => submits()} className="cursor-pointer border w-[50%] rounded-lg border-green-700 bg-green-700 group hover:bg-black transition">
                <p className="text-xl font-bold text-white">{signing ? 'Signing In': 'Submit'}</p>
            </div>
        </div>
    );
}

export default Pass;