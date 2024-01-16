import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useFilterContext } from '../context/FiltersContext';
import Footer from '../components/Footer'
import { Picker } from '@react-native-picker/picker'

const Filters = ({ route, navigation }) => {
    const { filterDetails, setFilterDetails } = useFilterContext();

    const handleFilter = (Type, value) => {
        setFilterDetails({ ...filterDetails, [Type]: value === "none" ? false : value });
    }
    
    return (
        <SafeAreaView className="flex-1 items-center mt-[8vh]">
            <View className="flex flex-row">
                <View className="relative w-[40vw] mr-[2.8vw] border border-gray-300 bg-gray-300 px-4 rounded-md">
                    <Picker className="relative w-[45vw] bg-gray-300 py-[3vh] px-5vw" onValueChange={(value) => handleFilter("Type", value)} selectedValue={filterDetails.Type || "none"}>
                        <Picker.Item label="None" value="none" />
                        <Picker.Item label="Movies" value="movie" />
                        <Picker.Item label="Series" value="series" />
                        <Picker.Item label="Episode" value="episode" />
                    </Picker>
                </View>
                <View className="relative w-[40vw] ml-[2.8vw] border border-gray-300 bg-gray-300 px-4 rounded-md">
                    <Picker className="relative w-[45vw] bg-gray-300 py-[3vh] px-5vw" onValueChange={(value) => handleFilter("Year", value)} selectedValue={filterDetails.Year || "none"}>
                        <Picker.Item label="None" value="none" />
                        {Array.from({ length: new Date().getFullYear() - 1888 + 1 }, (_, index) => (
                            <Picker.Item key={index} label={`Year ${1888 + index}`} value={1888 + index} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View className="relative w-[95vw] mt-[4vh] flex-1 items-center">
                <TouchableOpacity onPress={() => navigation.navigate("Movie Info")}>
                    <Text className="block w-[85vw] select-none rounded-md bg-indigo-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-indigo-700/20">Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterDetails({ Type: false, Year: false })} className="mt-[3vw]">
                    <Text className="block w-[85vw] select-none rounded-md border border-indigo-700 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-indigo-700">Clear</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="dark" />
            <Footer navigation={navigation} route={route} />
        </SafeAreaView>
    )
}

export default Filters