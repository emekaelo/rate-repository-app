import Text from './Text';
import {Pressable, StyleSheet, View} from "react-native";
import {TextInput} from "react-native";
import {useFormik} from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
    form: {
        gap: 8,
        margin: 8
    },
    input: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.colors.appBar,
        borderRadius: 4,
        padding: 8
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 8,
        borderRadius: 4,
        color: '#fff',
        textAlign: "center"
    }
})

const initialValues = {
    username: '',
    password: ''
}

const SignIn = () => {
    const onSubmit = values => {
        console.log(values);
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })

    return (
        <View style={styles.form}>
            <TextInput style={styles.input}
                       placeholder="Username"
                       value={formik.values.username}
                       onChangeText={formik.handleChange('username')}
            />
            <TextInput style={styles.input}
                       placeholder="Password"
                       value={formik.values.password}
                       onChangeText={formik.handleChange('password')}
                       secureTextEntry={true}
            />
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.button}>Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;