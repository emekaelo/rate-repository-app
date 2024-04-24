import Text from './Text';
import {Pressable, StyleSheet, View} from "react-native";
import {TextInput} from "react-native";
import {useFormik} from "formik";
import theme from "../theme";
import * as yup from 'yup';

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

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})

const SignIn = () => {
    const onSubmit = values => {
        console.log(values, formik);
    }

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
    );
};

export default SignIn;