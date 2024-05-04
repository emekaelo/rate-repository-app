import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../graphql/queries";

export const useRepository = (variables) => {
    const {data, error, loading, fetchMore} = useQuery(GET_REPOSITORY, {
        variables,
        fetchPolicy: 'cache-and-network'
    })

    const handleFetchMore = () => {
        const canFetchMore= !loading && data?.repository.reviews.pageInfo.hasNextPage

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data?.repository.reviews.pageInfo.endCursor,
                ...variables,
            }
        })
    }

    return {repository: data?.repository, loading, error, fetchMore: handleFetchMore}
}