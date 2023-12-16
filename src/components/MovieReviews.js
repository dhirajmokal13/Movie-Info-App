import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Alert, Pressable, TextInput } from 'react-native'
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
    const [btnLoading, setBtnLoading] = useState(false);
    const [reviewData, setReviewData] = useState({
        review: '',
        rating: 0
    });

    const [userReview, setAddedReview] = useState({
        isUserAdded: false,
        reviewId: ''
    });

    //Login Cotext api
    const { loginDetails } = useLoginContext();

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        loginDetails.isLoggedIn && setAddedReview(isUserAddedReview(reviews, loginDetails.userId));
    }, [reviews]);

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

    const handleReviewRemove = () => {
        if (loginDetails.isLoggedIn && userReview.isUserAdded) {
            axios.delete(`${serverLink}/api/reviews`, {
                data: { reviewId: userReview.reviewId },
                headers: {
                    'Authorization': `Bearer ${loginDetails.token}`,
                }
            }).then(res => {
                fetchReviews();
                Alert.alert(res.data.status);
            }).catch(err => {
                console.log(err.response.status);
            })
        }
    }

    const isUserAddedReview = (reviews, userId) => {
        for (const review of reviews) {
            if (review.user_id._id === userId) {
                setReviewData({ review: review.review, rating: review.rating });
                return { isUserAdded: true, reviewId: review._id }
            }
        }
        setReviewData({ review: '', rating: 0 });
        return { isUserAdded: false, reviewId: '' }
    }

    const handleReviewChange = (key, value) => {
        setReviewData((prevData) => ({
          ...prevData,
          [key]: value,
        }));
      };

    const submitReview = () => {
        if (userReview.isUserAdded) {
            //update the review
            setBtnLoading(true);
            const Data = {
                reviewId: userReview.reviewId,
                review: reviewData.review,
                rating: reviewData.rating
            };

            axios.put(`${serverLink}/api/reviews/`, Data, {
                headers: {
                    'Authorization': `Bearer ${loginDetails.token}`,
                }
            }).then(res => {
                setBtnLoading(false);
                if (res.status === 200) {
                    setShowModal(false);
                    Alert.alert(res.data.status);
                    fetchReviews();
                }
            }).catch(err => {
                setBtnLoading(false);
                console.log(err.response);
            })
        } else {
            if(reviewData.review ==="") return Alert.alert("Enter Valid Data");
            setBtnLoading(true);
            const data = {
                movie_id: imdbID,
                review: reviewData.review,
                rating: reviewData.rating
            };
            axios.post(`${serverLink}/api/reviews/`, data, {
                headers: {
                    'Authorization': `Bearer ${loginDetails.token}`,
                }
            }).then(res => {
                setBtnLoading(false);
                Alert.alert(res.data.status);
                fetchReviews();
                setShowModal(false);
            }).catch(err => {
                setBtnLoading(false);
                console.log(err.response.status);
                setShowModal(false);
            })
        }
    }

    return (
        <SafeAreaView>

            <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)} className="relative bottom-[6]">
                <View className="pb-[2vh] flex" style={[{ backgroundColor: "white" }, styles.shadowContainer]}>
                    <View className="flex-row bg-gray-200 py-[1.8vh] rounded-t-xl relative">
                        <Text className="text-lg ml-[33%]">{userReview.isUserAdded ? "Edit Review" : "Add New Review"}</Text>
                        <Pressable className="absolute right-3 mt-[1.8vh]" onPress={() => setShowModal(false)}><Entypo name="cross" size={24} color="black" /></Pressable>
                    </View>
                    <View className="mx-[8vw] mt-[3vh] bg-gray-100 px-[6vw] py-[1.7vh] rounded-md">
                        <TextInput placeholder='Write Review' onChangeText={(value) => handleReviewChange("review", value)} multiline={true} numberOfLines={2} value={reviewData.review} />
                    </View>
                    <View className="mx-[8vw] mt-[2.5vh]">
                        <Rating imageSize={28} type="star" ratingCount={5} fractions={1} jumpValue={0.5} startingValue={reviewData.rating} onFinishRating={(value) => handleReviewChange("rating", value)} />
                    </View>
                    <View className="mx-[8vw] flex items-center mt-[3.8vh] mb-[0.9vh]">
                        <Pressable onPress={submitReview} className={`${btnLoading ? "bg-violet-400" : "bg-violet-800"} w-[26vw] rounded-lg py-[1.2vh]`}>
                            <Text className="text-center text-white">{btnLoading ? "Loading..." : "Submit"}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View className="mb-[11vh] flex items-center justify-center bg-white mx-[1.3vw] py-[2vh] rounded-lg">
                <Text className="text-xl mb-[0.9vh] font-semibold tracking-widest mt-[1vh]">Reviews</Text>
                {
                    reviews.length === 0 ? (
                        <View>
                            <Text className="text-base font-medium tracking-wider text-rose-700">There is not reviews yet</Text>
                            {
                                loginDetails.isLoggedIn ? (<Pressable className={`mt-[1.2vh] ${btnLoading ? "bg-pink-400" : "bg-pink-700"} py-[1vh] px-[2.5vw] rounded-md w-[29vw] ml-[10vw]`} onPress={() => setShowModal(true)}><Text className="text-white text-center">{btnLoading ? "Loading..." : "Add Reviews"}</Text></Pressable>) : (<Text className="text-center text-green-800 mt-[0.4vh]" onPress={() => navigation.navigate("Login")}>Login for review add</Text>)
                            }
                        </View>) : (
                        reviews?.map((data) => {
                            return (
                                <View key={data._id}>
                                    <View className="my-[2vh] flex-row self-start ml-[1vw]">
                                        <View className="w-[8vw] flex-column mr-[4vw]">
                                            <TouchableOpacity onPress={() => handleReviewLikes(data._id)}>
                                                <Entypo name={(data.likes).includes(loginDetails.userId) ? "heart" : "heart-outlined"} size={29} color={(data.likes).includes(loginDetails.userId) ? "red" : "black"} />
                                            </TouchableOpacity>
                                            <Text className="text-center">{data.likes.length}</Text>
                                        </View>
                                        <View className="flex-column relative">
                                            <View className="flex-row">
                                                <View className="flex-row w-[62vw]">
                                                    <Text className="mr-[2vw] text-indigo-900 font-semibold tracking-wider">{data.user_id.email}</Text>
                                                    <Text className="text-rose-700">({data.user_id.role})</Text>
                                                </View>
                                                {loginDetails.userId === data.user_id._id && (
                                                    <View>
                                                        <Entypo onPress={() => setShowMenu(!showMenu)} style={{ marginTop: 3, marginLeft: 9 }} name="dots-three-vertical" size={15} color="black" />
                                                        {showMenu && (
                                                            <View className="w-[18.5vw] absolute right-5 rounded-md z-[1]" style={styles.shadowContainer}>
                                                                <Text className="text-black my-1 text-center mt-4" onPress={() => { setShowModal(true), setShowMenu(false) }}>Edit</Text>
                                                                <Text className="text-black text-center my-4" onPress={() => { handleReviewRemove(), setShowMenu(false) }}>Delete</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                )}
                                            </View>
                                            <View className="flex-row mt-[1vh] relative">
                                                <Rating imageSize={15} type="star" ratingCount={5} fractions={1} jumpValue={0.5} startingValue={data.rating} readonly />
                                                <Text className="ml-[3vw] text-green-600">{formatDistanceToNow(new Date(data.reviewCreatedAt), { addSuffix: true })}</Text>
                                            </View>
                                            <View className="mt-[0.8vh] w-[68vw]">
                                                <Text className="text-gray-500">{data.review}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        !userReview.isUserAdded && loginDetails.isLoggedIn && (
                                            <Pressable className={`${btnLoading ? "bg-pink-400" : "bg-pink-700"} py-[1vh] px-[2.5vw] rounded-md w-[30vw] mt-[2vh] text-center ml-[27vw]`} onPress={() => setShowModal(true)}>
                                                <Text className="text-white text-center">{btnLoading ? "Loading..." : "Add Review"}</Text>
                                            </Pressable>
                                        )
                                    }
                                </View>
                            )
                        })
                    )

                }
                {

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