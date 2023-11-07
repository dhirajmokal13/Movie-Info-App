const serverLink = "https://puce-odd-rooster.cyclic.app"
import axios from "axios";

const customDataValidation = () => {
    return {
        emailValidate: (email) => {
            if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                return new Promise(async (resolve, reject) => {
                    axios.get(`${serverLink}/api/user/exists/${email}`).then(res => {
                        resolve(res.data);
                    }).catch(err => {
                        err.response.status === 500 && reject("Internal Server Error");
                    })
                })
            } else {
                return "Invalid Email Pattern";
            }
        },
        mobileValidate: (mobile) => {
            return /^[0-9]{10}$/.test(mobile);
        },
        passwordValidate: (password) => {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
        }
    };
};

export default customDataValidation;