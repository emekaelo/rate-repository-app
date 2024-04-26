import React from 'react';
import {StyleSheet, View} from "react-native";
import {Image} from "react-native";
import Text from "./Text";
import theme from "../theme";
import {formatInThousands} from "../utils/formatInThousands";

const styles = StyleSheet.create({
    repoItem: {
        padding: 8,
        backgroundColor: '#fff'
    },
    repoDetails: {
        flexDirection: "row",
        gap: 16
    },
    repoInfo: {
        gap: 4,
        flexWrap: 'wrap',
        flex: 1,
    },
    language: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 8,
        color: '#fff',
        borderRadius: 4,
        alignSelf: 'flex-start'
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 12
    }
})

function RepositoryItem(props) {

    return (
        <View style={styles.repoItem} testID="repositoryItem">
            <View style={styles.repoDetails}>
                <Image style={{width: 50, height: 50, borderRadius: 4}} source={{uri: props.ownerAvatarUrl}} />
                <View style={styles.repoInfo}>
                    <Text fontSize="subheading" fontWeight="bold">{props.fullName}</Text>
                    <Text>{props.description}</Text>
                    <Text style={styles.language}>{props.language}</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <View>
                    <Text fontWeight="bold">{formatInThousands(props.stargazersCount)}</Text>
                    <Text>Stars</Text>
                </View>
                <View>
                    <Text fontWeight="bold">{formatInThousands(props.forksCount)}</Text>
                    <Text>Forks</Text>

                </View>
                <View><Text fontWeight="bold">{props.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View><Text fontWeight="bold">{props.ratingAverage}</Text>
                    <Text>Ratings</Text>
                </View>
            </View>
        </View>
    );
}

export default RepositoryItem;