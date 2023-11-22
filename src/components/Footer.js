import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLoginContext } from '../context/LoginContext';

const Footer = (props) => {
    //Login Cotext api
    const { loginDetails } = useLoginContext();

    const handleSerach = () => {
        if (props.route.name === "Movie Info") {
            props.searchRef?.current.focus();
            props.searchState?.setsearchOpened(true);
        } else {
            props.navigation.navigate("Movie Info");
        }
    }

    return (
        <SafeAreaView className="px-[12vw] py-[1.6vh] backdrop-blur bg-black/90 rounded-2xl min-h-[7vh] absolute left-[4vw] right-[4vw] bottom-3 w-[92vw] flex-1 items-center flex-row justify-between">
            <TouchableOpacity disabled={props.route.name === "Movie Info"} onPress={() => props.navigation.navigate("Movie Info")}>
                {props.route.name === "Movie Info" ? <FontAwesome name="home" size={20} color="#e11d48" /> : <FontAwesome name="home" size={20} color="white" />}
                <Text className="-ml-2 text-xs text-white">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={props.searchState?.seachOpened} onPress={handleSerach}>
                {props.searchState?.seachOpened ? <FontAwesome name="search" size={20} color="#e11d48" /> : <FontAwesome name="search" size={20} color="white" />}
                <Text className="-ml-2 text-xs text-white">Search</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={props.route.name === "filter"} onPress={() => props.navigation.navigate("Filters")}>
                {props.route.name === "Filters" ? <FontAwesome name="filter" size={20} color="#e11d48" /> : <FontAwesome name="filter" size={20} color="white" />}
                <Text className="-ml-2 text-xs text-white">Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={["Login", "Profile"].includes(props.route.name)} onPress={() => props.navigation.navigate(loginDetails.isLoggedIn ? "Profile" : "Login")}>
                {["Login", "Profile"].includes(props.route.name) ? <FontAwesome name="user" size={20} color="#e11d48" /> : <FontAwesome name="user" size={20} color="white" />}
                <Text className="-ml-2 text-xs text-white">{loginDetails.isLoggedIn ? "Profile" : "Login"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


export default Footer;