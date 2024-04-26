import {StyleSheet} from 'react-native';
import Main from "./src/components/Main";
import {NativeRouter} from "react-router-native";
import {ApolloProvider} from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
    return (
        <NativeRouter>
            <ApolloProvider client={apolloClient}>
                <AuthStorageContext.Provider value={authStorage}>
                    <Main />
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
