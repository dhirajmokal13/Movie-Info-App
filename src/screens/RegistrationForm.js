import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from 'react-native-select-dropdown';
import customDataValidation from "../hooks/UserInfoValidate";
import Footer from "../components/Footer";
import { mobileNumberPrefixes } from "../constant";
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const RegistrationForm = ({ route, navigation }) => {
    const [btnLoading, setBtnLoading] = useState(false);
    const defaultRegistrationdata = { name: '', email: '', countryCode: '+91-india', mobile: '', password: '', confirmPassword: '', role: 'User' }
    const [registrationData, setRegistrationData] = useState(defaultRegistrationdata);

    const registrationDataHandle = (name, value) => {
        //If key is mobile number and value is not numric value like string then don't set it.
        if (name === "mobile" && isNaN(value)) { return 0; }
        setRegistrationData({
            ...registrationData,
            [name]: value
        })
    }

    const handleRegistration = async () => {
        const dataValidation = customDataValidation();
        setBtnLoading(true);

        const faliedValidations = await validations(dataValidation, registrationData);
        if (faliedValidations.length === 0) {
            const userData = {
                'name': registrationData.name,
                'email': registrationData.email,
                'countryCode': registrationData.countryCode.split("-")[0],
                'mobileNumber': registrationData.mobile,
                'password': registrationData.password,
                'role': registrationData.role
            };

            axios.post(`${serverLink}/api/user`, userData).then(res => {
                if (res.data.status === "Success") {
                    Alert.alert(res.data.message);
                    setBtnLoading(false);
                    setRegistrationData(defaultRegistrationdata);
                }
            }).catch(err => {
                setBtnLoading(false);
                Alert.alert(err.response.data.message || err.response.data);
            })
        } else {
            Alert.alert('Validations Failed', faliedValidations.join("\n"));
            setBtnLoading(false);
        }
    }

    const validations = (dataValidation, registrationData) => {
        return new Promise(async (res, rej) => {
            try {
                const faliedValidations = [];

                //Name Validation
                (registrationData.name === '' || registrationData.name.length < 3) && faliedValidations.push("Enter Valid Name");

                //Email Validations
                const isEmailValid = await dataValidation.emailValidate(registrationData.email);
                if (isEmailValid === "Invalid Email Pattern") {
                    //If not valid email format then add error
                    faliedValidations.push("Enter Valid Email");
                } else {
                    //if user already have same email then add error
                    isEmailValid.userExist && faliedValidations.push("Email Already Exists");
                }

                //Mobile Number Validation
                !dataValidation.mobileValidate(registrationData.mobile) && faliedValidations.push("Enter Valid Mobile Number");

                //Password Validations
                const passValidate = dataValidation.passwordValidate(registrationData.password);
                !passValidate && faliedValidations.push("Enter Valid Password");

                //Chcek Pasword and Confirm Password Validation
                if (passValidate) { registrationData.password !== registrationData.confirmPassword && faliedValidations.push("Password and Confirm Password Didn't Match"); }

                //Resolved Reqest with Failed Validations List
                res(faliedValidations);
            } catch (err) {
                rej(err);
            }

        })
    }

    return (
        <SafeAreaView className="flex-1 items-center mt-[6vh]">
            <Text className="text-xl font-bold tracking-wider">Login Form</Text>
            <View className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" onChangeText={(txt) => { registrationDataHandle('name', txt) }} value={registrationData.name} placeholder="Name" />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" autoCapitalize="none" onChangeText={(txt) => { registrationDataHandle('email', txt) }} value={registrationData.email} placeholder="Email Address" />
                </View>
                <View className="relative w-full min-w-[200px] mb-3 flex flex-row border border-gray-300 bg-gray-300 rounded-md py-[0.4vh] pl-[0.8vw]">
                    <SelectDropdown data={mobileNumberPrefixes} defaultValue={registrationData.countryCode} search="true" searchPlaceHolder={registrationData.countryCode} statusBarTranslucent={true}
                        buttonTextStyle={styles.buttonTextStyle} buttonStyle={styles.buttonStyle} dropdownStyle={styles.dropdownStyle} searchInputStyle={styles.searchInputStyle} selectedRowStyle={styles.selectedRowStyle}
                        onSelect={item => { registrationDataHandle('countryCode', item) }} />
                    <TextInput className="px-4" onChangeText={(txt) => { registrationDataHandle('mobile', txt) }} value={registrationData.mobile} keyboardType="numeric" placeholder="Mobile Number" />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" autoCapitalize="none" autoCorrect={false} onChangeText={(txt) => { registrationDataHandle('password', txt) }} value={registrationData.password} placeholder="Password" secureTextEntry={true} />
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" autoCapitalize="none" autoCorrect={false} onChangeText={(txt) => { registrationDataHandle('confirmPassword', txt) }} value={registrationData.confirmPassword} placeholder="Confirm Password" secureTextEntry={true} />
                </View>
                <View className="relative w-full min-w-[200px] mb-3 border border-gray-300 bg-gray-300 px-4 rounded-md">
                    <Picker style={{ height: 53 }} onValueChange={(txt) => { registrationDataHandle('role', txt) }} selectedValue={registrationData.role}>
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Proffesional" value="Proffesional" />
                    </Picker>
                </View>
                <View className="relative w-full min-w-[200px] my-2">
                    <TouchableOpacity onPress={handleRegistration} disabled={btnLoading}>
                        <Text className={`block w-full select-none border-indigo-700 rounded-md ${btnLoading ? "bg-indigo-400" : "bg-indigo-700"} py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-700/20`}>{btnLoading ? "processing..." : "sign up"}</Text>
                    </TouchableOpacity>
                </View>
                <View className="relative w-full min-w-[200px] my-1">
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} disabled={btnLoading}>
                        <Text className="block w-full select-none rounded-md border border-indigo-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-indigo-700">Already Have Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="dark" />
            <Footer navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonTextStyle: {
        fontSize: wp(4)
    },
    buttonStyle: {
        width: wp(19),
        height: hp(5.3),
        borderRadius: 6
    },
    dropdownStyle: {
        width: wp(87),
        height: hp(43),
        borderRadius: 6
    },
    searchInputStyle: {
        width: wp(90),
        paddingHorizontal: wp(5)
    },
    selectedRowStyle: {
        backgroundColor: 'rgba(209 213 219 / 1.0)'
    }
});

export default RegistrationForm;