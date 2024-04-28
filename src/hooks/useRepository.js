import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../graphql/queries";

export const useRepository = (repositoryId) => {
    const {data, error, loading} = useQuery(GET_REPOSITORY, {
        variables: {repositoryId},
        fetchPolicy: 'cache-and-network'
    })

    return {repository: data?.repository, loading, error}
}