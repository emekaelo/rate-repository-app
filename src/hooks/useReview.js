import {useMutation} from "@apollo/client";
import {CREATE_REVIEW} from "../graphql/mutations";
import {useNavigate} from "react-router-native";

export const useReview = () => {
    const [createReview, result] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate()

    const createNewReview = async (review) => {
        const {data} = await createReview({variables: {review}})

        if (data.createReview) {
            navigate(`/${data.createReview.repositoryId}`)
            return {data}
        }
    }
    return [createNewReview, result]
};
