import { useState, useEffect } from 'react';
import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = (variables) => {
    // GraphQL approach
    const {data, error, loading, refetch, fetchMore} = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables
    })

    // Rest api approach
    // const [repositories, setRepositories] = useState();
    // const [loading, setLoading] = useState(false);

    // const fetchRepositories = async () => {
    //     setLoading(true);
    //
    //     // Replace the IP address part with your own IP address!
    //     const response = await fetch('http://192.168.1.100:5000/api/repositories');
    //     const json = await response.json();
    //
    //     setLoading(false);
    //     setRepositories(json);
    // };
    //
    // useEffect(() => {
    //     fetchRepositories();
    // }, []);

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data?.repositories.pageInfo.endCursor,
                ...variables,
            }
        })
    }

    return { repositories: data?.repositories, loading, refetch, error, fetchMore: handleFetchMore };
};

export default useRepositories;