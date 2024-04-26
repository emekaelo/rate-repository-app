import {AUTHENTICATE} from "../graphql/mutations";
import {useMutation} from "@apollo/client";

export const useSignIn = () => {
    const [authenticate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        await authenticate({variables: {credentials: {username, password}}})
    };

    return [signIn, result];
};