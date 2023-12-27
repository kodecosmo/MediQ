import { useEffect } from "react";

const useAutoLogin = () => { 

    useEffect(() => {

        const token = localStorage.getItem('token');
        
        if (token) {
            // TODO: Send the token to the server for verification
            // If the token is valid, log in the user automatically
            console.log('Auto login with token:', token);
        }
        
    }, []);

}

export default useAutoLogin