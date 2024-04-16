import React from "react";
import Admin from "../admin/Admin";
import Pass from "../admin/Pass";



const AdminPage = () => {
    const isauth = localStorage.getItem('adminauthenticated')


    return(
        <div>
            {isauth ? (
                <div>
                    <Admin/>
                </div>
            ) : (
                <div>
                    <Pass/>
                </div>
            )}
        </div>
    );
}

export default AdminPage;