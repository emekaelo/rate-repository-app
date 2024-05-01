import Text from "./Text";
import * as yup from 'yup'
import {Formik} from "formik";
import {Pressable, StyleSheet, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme, {style} from "../theme";
import {useReview} from "../hooks/useReview";

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: null
}

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner's username is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup.number().required('Rating is required')
        .min(0, 'Value must be greater than or equal to 0')
        .max(100, 'Value must be less than or equal to 100').typeError('Must be a number'),
})

const styles = StyleSheet.create({
    form: style.form,
    button: style.button
})

export const ReviewContainer = ({onSubmit}) => {

    return (
        <View style={styles.form}>
            <FormikTextInput name="ownerName" type="text" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" type="text" placeholder="Repository name" />
            <FormikTextInput name="rating" type="number" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="text" type="textarea" placeholder="Review" />
            <Pressable onPress={onSubmit}>
                <Text style={styles.button}>Create a review</Text>
            </Pressable>
        </View>
    );
};


export const Review = () => {
    const [createNewReview, result] = useReview()
    const onSubmit = (values) => {
        const review = {...values, rating: Number(values.rating)}
        try {
            createNewReview(review)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({handleSubmit}) => <ReviewContainer onSubmit={handleSubmit} />}
        </Formik>
    );
};
