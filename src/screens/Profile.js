import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../components/Footer'
import { useLoginContext } from '../context/LoginContext'
import axios from 'axios';
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const Profile = ({ route, navigation }) => {
    //Login Cotext api
    const { loginDetails, setLoginDetails } = useLoginContext();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            axios.get(`${serverLink}/api/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${loginDetails.token}`,
                }
            }).then(res => {
                if (res.status === 200) {
                    setUserData(res.data);
                }
            }).catch(error => {
                Alert.alert((error.response.status).toString());
                console.log(error.response.data);
            });
        }

        fetchUserDetails();
    }, []);

    const logout = () => {
        axios.post(`${serverLink}/api/user/logout`, null, {
            headers: {
                'Authorization': `Bearer ${loginDetails.token}`,
            }

        }).then(res => {
            if (res.status === 204) {
                setLoginDetails({
                    isLoggedIn: false,
                    token: '',
                    refreshToken: ''
                });
                navigation.navigate("Movie Info");
            }
        }).catch(err => {
            Alert.alert((err.response.status).toString());
            console.log(err.response.data);
        })
    }

    const removeAccount = () => {
        axios.delete(`${serverLink}/api/user`, {
            headers: {
                'Authorization': `Bearer ${loginDetails.token}`,
            }
        }).then(res => {
            if (res.status === 200) {
                setLoginDetails({
                    isLoggedIn: false,
                    token: '',
                    refreshToken: ''
                });
                Alert.alert("Account Deleted");
                navigation.navigate("Movie Info");
            }
        }).catch(err => {
            Alert.alert((err.response.status).toString(), err.response.message);
            console.log(err.response.data);
        })
    }

    return (
        <SafeAreaView className="flex-1 items-center mt-[3vh]">
            {
                userData.length === 0 ? (<ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', top: 130 }} />) :
                    (<View className="bg-white py-[4vh] w-[90vw] rounded-md pl-[6vw]">
                        <View className="flex flex-row">
                            <MaterialIcons style={{ verticalAlign: "middle", color: "#22c55e" }} name="verified-user" size={35} color="black" />
                            <View className="ml-[6vw]">
                                <Text className="text-gray-400 tracking-wider">Name</Text>
                                <Text className="font-semibold tracking-wider text-indigo-900">{userData.profileInfo.name} ({userData.profileInfo.role})</Text>
                            </View>
                        </View>
                        <View className="flex flex-row mt-[2vh]">
                            <MaterialIcons style={{ verticalAlign: "middle", color: "#22c55e" }} name="email" size={35} />
                            <View className="ml-[6vw]">
                                <Text className="text-gray-400 tracking-wider">Email</Text>
                                <Text className="font-semibold tracking-wider text-indigo-900">{userData.profileInfo.email}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row mt-[2vh]">
                            <MaterialIcons style={{ verticalAlign: "middle", color: "#22c55e" }} name="phone" size={35} />
                            <View className="ml-[6vw]">
                                <Text className="text-gray-400 tracking-wider">Mobile Number</Text>
                                <Text className="font-semibold tracking-wider text-indigo-900">{userData.profileInfo.mobileNumber}</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="mx-[2vw] mt-[5vh]" onPress={logout}>
                            <Text className={`w-[75vw] rounded bg-rose-600 py-3 px-4 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-rose-600/20 transition-all hover:shadow-lg hover:rose-600/60 focus:opacity-[0.90] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mx-[2vw] mt-[2vh]" onPress={removeAccount}>
                            <Text className={`w-[75vw] rounded bg-transparent py-3 px-4 text-center align-middle text-xs font-bold uppercase text-rose-600 border-2 border-rose-600`}>Remove Account</Text>
                        </TouchableOpacity>
                    </View>)
            }
            <StatusBar style="dark" />
            <Footer navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

export default Profile