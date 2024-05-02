import { useState, useEffect } from 'react';
import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = (sortRule) => {
    // GraphQL approach
    const {data, error, loading, refetch} = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: sortRule
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

    return { repositories: data?.repositories, loading, refetch, error };
};

export default useRepositories;