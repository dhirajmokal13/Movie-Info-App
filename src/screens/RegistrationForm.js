import axios from "axios";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";

const RegistrationForm = () => {
    return (
        <TouchableOpacity className="flex-1 items-center justify-center mt-10">
            <Text className="text-xl font-bold tracking-wider">Login Form</Text>
            <View className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" placeholder="Name"/>
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" placeholder="Email Address"/>
                </View>
                <View className="relative w-full min-w-[200px] mb-3">
                    <TextInput className="border border-gray-300 bg-gray-300 py-2 px-4 rounded-md" keyboardType="numeric" placeholder="Mobile Number"/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RegistrationForm;