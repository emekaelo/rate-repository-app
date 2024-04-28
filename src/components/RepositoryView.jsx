import RepositoryItem from "./RepositoryItem";
import {useParams} from "react-router-native";
import {useRepository} from "../hooks/useRepository";

export const RepositoryView = () => {
    const {id} = useParams();
    const {repository} = useRepository(id);

    return (
        <RepositoryItem {...repository} />
    );
};
