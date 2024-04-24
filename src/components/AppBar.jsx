import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import {Pressable} from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        padding: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
    },
    text: {
        color: '#ffffff',
    }
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
        <Pressable>
            <Text style={styles.text} fontWeight="bold" fontSize="subheading">Repositories</Text>
        </Pressable>
    )
}

export default AppBar;