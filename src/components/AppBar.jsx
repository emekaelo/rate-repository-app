import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Text from "./Text";
import theme from "../theme";
import {Link, useNavigate} from "react-router-native";
import {ScrollView} from "react-native";
import {useApolloClient} from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import {useCurrentUser} from "../hooks/useCurrentUser";

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
    const navigate = useNavigate()
    const {currentUser} = useCurrentUser();


    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate("/sign-in")
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <View style={styles.appBar}>
                    <AppBarTab to="/">Repositories</AppBarTab>
                    {currentUser ?
                        <>
                            <AppBarTab to="new-review">Create a review</AppBarTab>
                            <AppBarTab to="my-review">My reviews</AppBarTab>
                            <AppBarTab handlePress={signOut}>Sign out</AppBarTab>
                        </>
                        :
                        <>
                            <AppBarTab to="/sign-in">Sign in</AppBarTab>
                            <AppBarTab to="/sign-up">Sign up</AppBarTab>
                        </>
                    }
                </View>
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