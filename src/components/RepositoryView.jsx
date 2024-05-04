import RepositoryItem from "./RepositoryItem";
import {useNavigate, useParams} from "react-router-native";
import {useRepository} from "../hooks/useRepository";
import {Alert, FlatList, Pressable, StyleSheet, View} from "react-native";
import {ItemSeparator} from "./RepositoryList";
import Text from "./Text";
import theme, {style} from "../theme";
import {format} from "date-fns";
import {useDeleteReview} from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        padding: 16,
        gap: 10
    },
    review: {
        flexDirection: "row",
        gap: 8,
    },
    rating: {
        wrapper: {
            borderColor: theme.colors.primary,
            borderWidth: 2,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontSize: 16,
            fontWeight: 700,
        }
    },
    button: style.button
})

export const ReviewItem = ({review}) => {
    const navigate = useNavigate();
    const [removeReview, result] = useDeleteReview()

    const createTwoButtonAlert = () => {

        Alert.alert('Delete review', 'Are you sure you want to delete this review', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete', onPress: () => {
                    removeReview(review.id)
                }
            },
        ]);
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.review}>
                <View style={styles.rating.wrapper}>
                    <Text style={styles.rating.text}>{review.rating}</Text>
                </View>
                <View>
                    <Text fontSize="subheading"
                          fontWeight="bold">{review.repository ? review.repository.fullName : review.user.username}</Text>
                    <Text>{format(review.createdAt, "dd.MM.yyyy")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            <View>
                {review.repository &&
                    <View style={{flexDirection: "row", gap: 16}}>
                        <Pressable style={{flex: 1}} onPress={() => navigate(`/${review.repository.id}`)}>
                            <Text style={styles.button}>View repository</Text>
                        </Pressable><Pressable style={{flex: 1}} onPress={createTwoButtonAlert}>
                        <Text style={{...styles.button, backgroundColor: theme.colors.danger}}>Delete review</Text>
                    </Pressable>
                    </View>}
            </View>
        </View>
    )
}

export const RepositoryView = () => {
    const {id} = useParams();
    const {repository, fetchMore} = useRepository({repositoryId: id, first: 5});


    const reviews = repository?.reviews
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    const onEndReached = () => {
        fetchMore();
    }

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <ReviewItem review={item} />}
            keyExtractor={({id}) => id}
            ListHeaderComponent={() =>
                <RepositoryItem {...repository} />}
            ListHeaderComponentStyle={{marginBottom: 10}}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
        />
    );
};
