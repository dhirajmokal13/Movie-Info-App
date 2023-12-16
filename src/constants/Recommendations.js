const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;
import axios from "axios";

const Recommendations = () => {
    return new Promise(async (resolve, reject) => {
        axios.get(`${serverLink}/api/show/suggest`).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(500);
        })
    });
}

export default Recommendations;