import {AUTHENTICATE} from "../graphql/mutations";
import {useApolloClient, useMutation} from "@apollo/client";
import UseAuthStorage from "./useAuthStorage";
import {useNavigate} from "react-router-native";

export const useSignIn = () => {
    const authStorage = UseAuthStorage()
    const apolloClient = useApolloClient()
    const navigate = useNavigate()
    const [authenticate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({username, password}) => {
        // call the mutate function here with the right arguments
        const {data} = await authenticate({variables: {credentials: {username, password}}})
        if (data.authenticate) {
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore();
            navigate('/')
            return {data}
        }
    };

    return [signIn, result];
};