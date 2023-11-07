import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import customDataValidation from "../hooks/UserInfoValidate";
const serverLink = "https://puce-odd-rooster.cyclic.app"

const RegistrationForm = () => {
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        role: 'User'
    });

    const registrationDataHandle = (name, value) => {
        setRegistrationData({
            ...registrationData,
            [name]: value
        })
    }

    const handleRegistration = async () => {
        const dataValidation = customDataValidation();
        if (registrationData.name === '' || registrationData.name.length <= 3) {
            Alert.alert("Enter Valid Name");
        } else {
            const isEmailValid = await dataValidation.emailValidate(registrationData.email);
            if (isEmailValid.userExist === true || isEmailValid === "Invalid Email Pattern") {
                if (isEmailValid === "Invalid Email Pattern") {
                    Alert.alert("Enter Valid Email");
                } else {
                    Alert.alert("Email Already Exists");
                }
            } else {
                if (dataValidation.mobileValidate(registrationData.mobile) === false) {
                    Alert.alert("Enter Valid Mobile Number");
                } else {
                    if (dataValidation.passwordValidate(registrationData.password) === false) {
                        Alert.alert("Enter Valid Password");
                    } else {
                        if (registrationData.password !== registrationData.confirmPassword) {
                            Alert.alert("Password and Confirm Password Didn't Match");
                        } else {

                            const userData = {
                                'name': registrationData.name,
                                'email': registrationData.email,
                                'mobileNumber': registrationData.mobile,
                                'password': registrationData.password,
                                'role': registrationData.role
                            };

                            axios.post(`${serverLink}/api/user`, userData).then(res => {
                                if (res.data.status === "Success") {
                                    Alert.alert(res.data.message);
                                    setRegistrationData({
                                        name: '',
                                        email: '',
                                        mobile: '',
                                        password: '',
                                        confirmPassword: '',
                                        role: 'User'
                                    });
                                }
                            }).catch(err => {
                                Alert.alert(err.response.data.message || err.response.data);
                            })
                        }
                    }
                }
            }
        }
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-center mt-10">
            <Text className="text-xl font-bold tracking-wider">Login Form</Text>
            <View className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" onChangeText={(txt) => { registrationDataHandle('name', txt) }} value={registrationData.name} placeholder="Name" />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" onChangeText={(txt) => { registrationDataHandle('email', txt) }} value={registrationData.email} placeholder="Email Address" />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" onChangeText={(txt) => { registrationDataHandle('mobile', txt) }} value={registrationData.mobile} keyboardType="numeric" placeholder="Mobile Number" />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" onChangeText={(txt) => { registrationDataHandle('password', txt) }} value={registrationData.password} placeholder="Password" secureTextEntry={true} />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" onChangeText={(txt) => { registrationDataHandle('confirmPassword', txt) }} value={registrationData.confirmPassword} placeholder="Confirm Password" secureTextEntry={true} />
                </View>
                <View className="relative w-full min-w-[200px] mb-3 border border-gray-300 bg-gray-300 px-4 rounded-md">
                    <Picker style={{ height: 50 }} onValueChange={(txt) => { registrationDataHandle('role', txt) }} selectedValue={registrationData.role}>
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Proffesional" value="Proffesional" />
                    </Picker>
                </View>
                <View className="relative w-full min-w-[200px] my-2">
                    <TouchableOpacity>
                        <Text className="block w-full select-none rounded-md bg-indigo-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-700/20" onPress={handleRegistration}>sign up</Text>
                    </TouchableOpacity>
                </View>
                <View className="relative w-full min-w-[200px] my-1">
                    <TouchableOpacity>
                        <Text className="block w-full select-none rounded-md border border-indigo-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-indigo-700">Already Have Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegistrationForm;