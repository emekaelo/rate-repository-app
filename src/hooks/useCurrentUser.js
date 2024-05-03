import {useQuery} from "@apollo/client";
import {ME} from "../graphql/queries";

export const useCurrentUser = (includeReviews = false) => {
    const {data, loading, error} = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: {includeReviews}
    });

    return {currentUser: data?.me, loading, error}
}