import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
const serverLink = "https://puce-odd-rooster.cyclic.app";
const key = '4034acde' || 76593128;

const MovieReviews = ({ setLikesData, imdbID }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetchReviews();
    },[]);

    const fetchReviews = () => {
        console.log(imdbID)
        axios.get(`${serverLink}/api/reviews/${imdbID}`).then(res => {
            if(res.status === 200){
                setReviews(res.data.reviewResults);
                setLikesData(reviews[0].likes);
            }
        }).catch(err=>{
            if(err.response.status === 404){
                setReviews([]);
                setLikesData([]);
            }
        })
    }
    return (
        <SafeAreaView>
            <View className="mb-[10vh]">
                <Text>This is reviews</Text>
            </View>
        </SafeAreaView>
    )
}

export default MovieReviews
