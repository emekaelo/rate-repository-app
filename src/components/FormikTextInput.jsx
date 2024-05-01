import {StyleSheet, TextInput, View} from 'react-native';
import {useField} from 'formik';
import theme from "../theme";
import Text from "./Text";


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.colors.appBar,
        borderRadius: 4,
        padding: 8
    }
})

const FormikTextInput = ({style, ...props}) => {
    const [field, meta, helpers] = useField(props);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput multiline={props.type === 'textarea'} secureTextEntry={props.type === 'password'} style={{
                ...styles.input,
                borderColor: meta.error ? theme.colors.danger : theme.colors.appBar,
                ...style
            }} onChangeText={(value) => helpers.setValue(value)}
                       onBlur={() => helpers.setTouched(true)}
                       value={field.value}
                       error={showError} {...props} />
            {showError && <Text color="error">{meta.error}</Text>
            }
        </>
    )
};
export default FormikTextInput;