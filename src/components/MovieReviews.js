import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useLoginContext } from '../context/LoginContext';
const serverLink = process.env.EXPO_PUBLIC_SERVER_ADDRESS;

const MovieReviews = ({ setLikesCount, imdbID, navigation }) => {
    const [reviews, setReviews] = useState([]);
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
    return (
        <SafeAreaView>
            <View className="mb-[10vh] flex items-center justify-center bg-white px-[1.5vw] mx-[1.3vw] py-[2vh] rounded-md">
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
                                <View className="my-[1vh]" key={data._id}>
                                    <Text>{data.review}</Text>
                                </View>
                            )
                        })
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default MovieReviews
