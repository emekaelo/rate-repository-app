import {FlatList} from "react-native";
import {ItemSeparator} from "./RepositoryList";
import {ReviewItem} from "./RepositoryView";
import {useCurrentUser} from "../hooks/useCurrentUser";

export const MyReviews = () => {
    const {currentUser} = useCurrentUser(true);

    const reviews = currentUser?.reviews
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <ReviewItem review={item} />}
            keyExtractor={({id}) => id}
        />
    );
};