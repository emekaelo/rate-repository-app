import {StyleSheet, View} from 'react-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import Text from "./Text";
import {Navigate, Route, Routes} from "react-router-native";
import SignIn from "./SignIn";
import {RepositoryView} from "./RepositoryView";

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
                <Routes>
                    <Route path="/" element={<RepositoryList />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/:id" element={<RepositoryView />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </View>
        </>
    );
};

export default Main;