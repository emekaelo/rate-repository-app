import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {Pressable} from "react-native";
import Text from "./Text";
import theme from "../theme";
import {Link} from "react-router-native";
import {ScrollView} from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
    },
    text: {
        color: '#ffffff',
    },
    appBar: {flexDirection: "row", gap: 8}
});

const onPress = () => {

}

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab />
        </View>
    );
};

const AppBarTab = () => {
    return (
        <>
            <View>
                <ScrollView horizontal>
                    <View style={styles.appBar}>
                        <Link to="/">
                            <Text style={styles.text} fontWeight="bold" fontSize="subheading">Repositories</Text>
                        </Link>
                        <Link to="/sign-in">
                            <Text style={styles.text} fontWeight="bold" fontSize="subheading">Sign in </Text>
                        </Link>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default AppBar;