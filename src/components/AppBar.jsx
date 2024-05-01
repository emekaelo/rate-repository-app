import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {Pressable} from "react-native";
import Text from "./Text";
import theme from "../theme";
import {Link} from "react-router-native";
import {ScrollView} from "react-native";
import {useApolloClient, useQuery} from "@apollo/client";
import {ME} from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
    container: {
        padding: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
    },
    text: {
        color: '#ffffff',
    },
    appBar: {flexDirection: "row", gap: 16}
});

const AppBar = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const {data} = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    });

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <View style={styles.appBar}>
                    <AppBarTab to="/">Repositories</AppBarTab>
                    {data?.me ?
                        <>
                            <AppBarTab to="new-review">Create a review</AppBarTab>
                            <AppBarTab handlePress={signOut}>Sign out</AppBarTab>
                        </> :
                        <AppBarTab to="/sign-in">Sign in</AppBarTab>}</View>
            </ScrollView>
        </View>
    );
};

const AppBarTab = ({children, to, handlePress}) => {
    return (
        <Link to={to} onPress={handlePress}>
            <Text style={styles.text} fontWeight="bold" fontSize="subheading">{children}</Text>
        </Link>
    )
}

export default AppBar;