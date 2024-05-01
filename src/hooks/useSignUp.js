import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../graphql/mutations";
import {useNavigate} from "react-router-native";

export const useSignUp = () => {
    const [createUser, result] = useMutation(CREATE_USER);
    const navigate = useNavigate()

    const createNewUser = async ({username, password}) => {
        const {data} = await createUser({variables:{username, password}})

        if (data.createUser) {
            navigate('/sign-in')
            return {data}
        }
    }

    return [createNewUser, result]
}
