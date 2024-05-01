import RepositoryItem from "./RepositoryItem";
import {useParams} from "react-router-native";
import {useRepository} from "../hooks/useRepository";
import {FlatList, StyleSheet, View} from "react-native";
import {ItemSeparator} from "./RepositoryList";
import Text from "./Text";
import theme from "../theme";
import {format} from "date-fns";

const styles = StyleSheet.create({
    review: {
        flexDirection: "row",
        gap: 8,
        padding: 16,
        backgroundColor: "#fff"
    },
    rating: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        width: 40,
        height: 40,
        fontSize: 16,
        fontWeight: 700,
        borderRadius: 20,
        padding: 11,
    }
})

const ReviewItem = ({review}) => {

    return (
        <View style={styles.review}>
            <View>
                <Text style={styles.rating}>{review.rating}</Text>
            </View>
            <View>
                <Text fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
                <Text>{format(review.createdAt, "dd.MM.yyyy")}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
}

export const RepositoryView = () => {
    const {id} = useParams();
    const {repository} = useRepository(id);

    const reviews = repository?.reviews
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <ReviewItem review={item} />}
            keyExtractor={({id}) => id}
            ListHeaderComponent={() =>
                <RepositoryItem {...repository} />}
            ListHeaderComponentStyle={{marginBottom: 10}}
        />
    );
};
