import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { Rating } from 'react-native-ratings';
import { Entypo } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import Modal from "react-native-modal";
import { useLoginContext } from '../context/LoginContext';
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const MovieReviews = ({ setLikesCount, imdbID, navigation }) => {
    const [reviews, setReviews] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    //Login Cotext api
    const { loginDetails } = useLoginContext();

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        axios.get(`${serverLink}/api/reviews/${imdbID}`).then(res => {
            if (res.status === 200) {
                setReviews(res.data.reviewResults);
                setLikesCount(res.data.totalLikes);
            }
        }).catch(err => {
            if (err.response.status === 404) {
                setReviews([]);
                setLikesCount(0);
            }
        });
    }

    const handleReviewLikes = (reviewId) => {
        if (loginDetails.isLoggedIn) {
            axios.patch(`${serverLink}/api/reviews/likes`, { reviewId },
                {
                    headers: {
                        'Authorization': `Bearer ${loginDetails.token}`,
                    }
                }).then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        fetchReviews();
                    }
                }).catch(err => {
                    console.log(err);
                })
        } else {
            Alert.alert("Please Login");
        }
    }

    return (
        <SafeAreaView>
            
            <Modal isVisible={showModal}  onBackdropPress={()=>setShowModal(false)} className="my-[20vh]">
                <View style={[{ flex: 1, backgroundColor: "white" }, styles.shadowContainer]}>
                    <Text>I am the modal content!</Text>
                </View>
            </Modal>

            <View className="mb-[10vh] flex items-center justify-center bg-white mx-[1.3vw] py-[2vh] rounded-md">
                <Text className="text-xl mb-[0.9vh] font-semibold tracking-widest">Reviews</Text>
                {
                    reviews.length === 0 ? (
                        <View>
                            <Text className="text-base font-medium tracking-wider text-rose-700">There is not reviews yet</Text>
                            {
                                loginDetails.isLoggedIn ? (<Text>Add Reviews</Text>) : (<Text className="text-center text-green-800 mt-[0.4vh]" onPress={() => navigation.navigate("Login")}>Login for review add</Text>)
                            }
                        </View>) : (
                        reviews?.map((data) => {
                            return (
                                <View className="my-[2vh] flex-row self-start ml-[6vw]" key={data._id}>

                                    <View className="w-[8vw] flex-column mr-[4vw]">
                                        <TouchableOpacity onPress={() => handleReviewLikes(data._id)}>
                                            <Entypo name={(data.likes).includes(loginDetails.userId) ? "heart" : "heart-outlined"} size={29} color={(data.likes).includes(loginDetails.userId) ? "red" : "black"} />
                                        </TouchableOpacity>
                                        <Text className="text-center">{data.likes.length}</Text>
                                    </View>
                                    <View className="flex-column relative">
                                        <View className="flex-row">
                                            <Text className="mr-[2vw] text-indigo-900 font-semibold tracking-wider">{data.user_id.email}</Text>
                                            <Text className="text-rose-700">({data.user_id.role})</Text>
                                            {loginDetails.userId === data.user_id._id && (
                                                <View className="">
                                                    <Entypo onPress={() => setShowMenu(!showMenu)} style={{ marginTop: 3, marginLeft: 4 }} name="dots-three-vertical" size={15} color="black" />
                                                    {showMenu && (
                                                        <View className="w-[18.5vw] absolute right-5 rounded-md z-[1]" style={styles.shadowContainer}>
                                                            <Text className="text-black my-1 text-center mt-4" onPress={() => { setShowModal(true), setShowMenu(false) }}>Edit</Text>
                                                            <Text className="text-black my-1 text-center my-4" onPress={() => { console.log("Delete"), setShowMenu(false) }}>Delete</Text>
                                                        </View>
                                                    )}
                                                </View>
                                            )}
                                        </View>
                                        <View className="flex-row mt-[1vh] relative">
                                            <Rating imageSize={15} type="star" ratingCount={5} fractions={1} jumpValue={0.5} startingValue={data.rating} readonly />
                                            <Text className="ml-[3vw] text-green-600">{formatDistanceToNow(new Date(data.reviewCreatedAt), { addSuffix: true })}</Text>
                                        </View>
                                        <View className="flex-row mt-[0.8vh]">
                                            <Text className="text-gray-500">{data.review}</Text>
                                        </View>
                                    </View>

                                </View>
                            )
                        })
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
});

export default MovieReviews