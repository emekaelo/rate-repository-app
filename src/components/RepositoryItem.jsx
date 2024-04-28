import React from 'react';
import {Pressable, StyleSheet, View} from "react-native";
import {Image} from "react-native";
import Text from "./Text";
import theme from "../theme";
import {formatInThousands} from "../utils/formatInThousands";
import {useParams} from "react-router-native";
import * as Linking from "expo-linking";

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
        marginTop: 12,
        marginBottom: 12
    },
    githubBtn: {
        alignSelf: "stretch",
        textAlign: "center"
    }
})

function RepositoryItem(props) {
    const {id} = useParams()

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
            {id && <Pressable onPress={() => {
                Linking.openURL(props.url)
            }}>
                <Text style={{...styles.language,...styles.githubBtn}}>Open in GitHub</Text>
            </Pressable>}
        </View>
    );
}

export default RepositoryItem;