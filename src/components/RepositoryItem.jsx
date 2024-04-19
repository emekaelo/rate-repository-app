import React from 'react';
import {Text} from "react-native";

function RepositoryItem(props) {
    return (
        <>
        <Text>{props.fullName}</Text>
        <Text>{props.description}</Text>
        <Text>{props.language}</Text>
        <Text>{props.stargazersCount}</Text>
        <Text>{props.forksCount}</Text>
        <Text>{props.reviewCount}</Text>
        <Text>{props.ratingAverage}</Text>
        </>
    );
}

export default RepositoryItem;