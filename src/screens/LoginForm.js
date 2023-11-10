import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import Footer from "../components/Footer";
import { useLoginContext } from "../context/LoginContext";
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const LoginForm = ({ route, navigation }) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const loginDataHandle = (name, value) => {
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const [loginLoad, setLoginLoad] = useState(false);

    //Login Cotext api
    const { loginDetails, setLoginDetails } = useLoginContext();

    const handleLogin = async () => {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginData.email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(loginData.password)) {
            //Set button is loading
            setLoginLoad(true);
            axios.post(`${serverLink}/api/user/login`,
                { 'email': loginData.email, 'password': loginData.password }).then(res => {
                    if (res.data.status === "Login Success") {
                        //Setting up Login Credentials to Context Api
                        setLoginDetails({
                            isLoggedIn: true,
                            token: res.data.jwtToken,
                            refreshToken: res.data.jwtRefreshToken
                        });
                        //Remove button is loading
                        setLoginData(false);
                        Alert.alert("Login Success");
                        navigation.navigate("Movie Info");
                    }
                }).catch(err => {
                    //Remove button is loading
                    setLoginLoad(false);
                    switch (err.response.status) {
                        case 401:
                            Alert.alert(err.response.data.message);
                            break;
                        default:
                            Alert.alert("Internal Server Error");
                    }
                });
        } else {
            Alert.alert("Enter valid Data");
        }
    }

    return (
        <SafeAreaView className="flex-1 items-center mt-[8vh]">
            <Text className="text-xl font-bold tracking-wider">Login Form</Text>
            <View className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
                <View className="relative w-full min-w-[200px]">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" autoCapitalize="none" placeholder="Email Address" onChangeText={(txt) => loginDataHandle('email', txt)} value={loginData.email} />
                </View>
                <View className="relative w-full min-w-[200px] my-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" autoCapitalize="none" autoCorrect={false} placeholder="Password" onChangeText={(txt) => loginDataHandle('password', txt)} secureTextEntry={true} />
                </View>
                <View className="relative w-full min-w-[200px] my-2">
                    <TouchableOpacity onPress={handleLogin} disabled={loginLoad}>
                        <Text className={`block w-full select-none rounded-md ${loginLoad ? "bg-pink-400" : "bg-pink-600"} py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-pink-600/20`}>{loginLoad ? "Logging..." : "Login"}</Text>
                    </TouchableOpacity>
                </View>
                <View className="relative w-full min-w-[200px] my-1">
                    <TouchableOpacity disabled={loginLoad} onPress={() => navigation.navigate("Registration")}>
                        <Text className="block w-full select-none rounded-md border border-pink-600 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-pink-600">sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

export default LoginForm