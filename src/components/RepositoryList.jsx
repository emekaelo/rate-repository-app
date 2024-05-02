import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import {useNavigate} from "react-router-native";
import {Picker} from "@react-native-picker/picker";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";
import {log} from "expo/build/devtools/logger";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const repositories = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    },
    {
        id: 'rails.rails',
        fullName: 'rails/rails',
        description: 'Ruby on Rails',
        language: 'Ruby',
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
    },
    {
        id: 'django.django',
        fullName: 'django/django',
        description: 'The Web framework for perfectionists with deadlines.',
        language: 'Python',
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 73,
        reviewCount: 5,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
    },
    {
        id: 'reduxjs.redux',
        fullName: 'reduxjs/redux',
        description: 'Predictable state container for JavaScript apps',
        language: 'TypeScript',
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
    },
];
const sortOptions = [
    {label: 'Latest', value: 'latest'},
    {label: 'Highest rated', value: 'highest'},
    {label: 'Lowest rated', value: 'lowest'},
]

const SortPicker = ({setSortRule}) => {
    const [selectedValue, setSelectedValue] = useState("latest")

    const getSelectedSort = (selectedSort) => {
        switch (selectedSort) {
            case 'latest':
                return {orderBy: "CREATED_AT", orderDirection: "DESC"}
            case 'highest':
                return {orderBy: "RATING_AVERAGE", orderDirection: "DESC"}
            case 'lowest':
                return {orderBy: "RATING_AVERAGE", orderDirection: "ASC"}
        }
    }

    return (
        <Picker
            prompt="Select an item"
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
                setSelectedValue(itemValue)
                setSortRule(getSelectedSort(itemValue))
            }
            }>
            {sortOptions.map((option) => (<Picker.Item key={option.value} label={`${option.label} repositories`} value={option.value} />))}
        </Picker>
    )
}

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({repositories, children}) => {
    const navigate = useNavigate()
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];


    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => (
                <Pressable onPress={() => {
                    navigate(`/${item.id}`)
                }}>
                    <RepositoryItem
                        key={item.key}
                        {...item}>
                    </RepositoryItem>
                </Pressable>
            )}
            ListHeaderComponent={children}
        />
    );
}

const RepositoryList = () => {
    const [sortRule, setSortRule] = useState({orderDirection: 'DESC', orderBy: 'CREATED_AT'});
    const {repositories} = useRepositories(sortRule)

    return (
        <RepositoryListContainer repositories={repositories}>
            <SortPicker setSortRule={setSortRule} />
        </RepositoryListContainer>
    )
};

export default RepositoryList;