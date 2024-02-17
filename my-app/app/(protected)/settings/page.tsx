"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
    const session = useSession();

    const signOut = () => {
        logout();
    };

    return ( 
        <div className="bg-white p-10 rounded-xl">
            <button onClick={signOut} type="submit">
                Sign Out
            </button>
        </div>
     );
}
 
export default SettingsPage;