import Text from './Text';
import {Pressable, StyleSheet, View} from "react-native";
import {TextInput} from "react-native";
import {useFormik} from "formik";
import theme, {style} from "../theme";
import * as yup from 'yup';
import {useSignIn} from "../hooks/useSignIn";

const styles = StyleSheet.create({
    form: style.form,
    button: style.button,
    input: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.colors.appBar,
        borderRadius: 4,
        padding: 8
    }
})

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})


export const SignInContainer = ({onSubmit}) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })

    return (
        <View style={styles.form}>
            <TextInput style={{
                ...styles.input,
                borderColor: formik.errors.username ? theme.colors.danger : theme.colors.appBar
            }}
                       placeholder="Username"
                       value={formik.values.username}
                       onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text color="error">{formik.errors.username}</Text>
            )}
            <TextInput style={{
                ...styles.input,
                borderColor: formik.errors.username ? theme.colors.danger : theme.colors.appBar
            }}
                       placeholder="Password"
                       value={formik.values.password}
                       onChangeText={formik.handleChange('password')}
                       secureTextEntry={true}
            />
            {formik.touched.password && formik.errors.password && (
                <Text color="error">{formik.errors.password}</Text>
            )}
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.button}>Sign in</Text>
            </Pressable>
        </View>
    )
}

const SignIn = () => {
    const [signIn, result] = useSignIn();

    const onSubmit = values => {
        const { username, password } = values;

        try {
            const data = signIn({username, password})
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <SignInContainer onSubmit={onSubmit} />
    );
};

export default SignIn;