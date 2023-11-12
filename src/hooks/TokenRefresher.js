import axios from "axios";
import { useLoginContext } from "../context/LoginContext";
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const TokenRefresher = () => {
    //Login Cotext api
    const { loginDetails, setLoginDetails } = useLoginContext();
    return (new Promise((resolve, reject) => {
        axios.patch(`${serverLink}/api/user/token/refresh`, null, {
            headers: {
                'Authorization': `Bearer ${loginDetails.refreshToken}`,
            }
        }).then(res => {
            resolve(res.data);
            setLoginDetails({
                isLoggedIn: true,
                token: res.data.jwtToken,
                refreshToken: res.data.jwtRefreshToken,
                userId: res.data.userId
            });
        }).catch(err => {
            reject(err.responce.data);
            console.log(err.responce.data);
        })
    }))
}

export default TokenRefresher