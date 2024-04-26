import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace;
    }

    getAccessToken() {
        // Get the access token for the storage
        const authToken = AsyncStorage.getItem(`${this.namespace}`)
        return authToken ? authToken : ''
    }

    setAccessToken(accessToken) {
        // Add the access token to the storage
        AsyncStorage.setItem(`${this.namespace}`, accessToken)
    }

    removeAccessToken() {
        // Remove the access token from the storage
        AsyncStorage.removeItem(`${this.namespace}`)
    }
}

export default AuthStorage;