import {StyleSheet, View} from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#e1e4e8"
    },
    title: {
        textAlign: "center",
        margin: 16,
        marginTop: 24
    }
});

const Main = () => {
    return (
        <>
            <AppBar />
            <View style={styles.container}>
                <RepositoryList />
            </View>
        </>
    );
};

export default Main;