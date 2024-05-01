import {Pressable, StyleSheet, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import * as yup from 'yup'
import Text from "./Text";
import {style} from "../theme";
import {useSignUp} from "../hooks/useSignUp";

const styles = StyleSheet.create({
    form: style.form,
    button: style.button
})

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
}

const validateSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(5, 'Username must be at least 5 characters').max(30, 'Username must not be more than 30 characters'),
    password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters').max(50, 'Password must not be more than 50 characters'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match")
        .required('Password confirmation is required')
})

export const SignUpContainer = ({onSubmit}) => {
    return (
        <View style={styles.form}>
            <FormikTextInput name="username" type="text" placeholder="Username" />
            <FormikTextInput name="password" type="password" placeholder="Password" />
            <FormikTextInput name="passwordConfirmation" type="password" placeholder="Password confirmation" />
            <Pressable onPress={onSubmit}>
                <Text style={styles.button}>Sign up</Text>
            </Pressable>
        </View>
    );
};


export const SignUp = () => {
    const [createNewUser, result] = useSignUp()
    const onSubmit = values => {
        try {
            createNewUser(values)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
            {({handleSubmit}) => <SignUpContainer onSubmit={handleSubmit} />}
        </Formik>
    );
};
