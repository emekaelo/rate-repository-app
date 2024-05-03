import {useMutation} from "@apollo/client";
import {DELETE_REVIEW} from "../graphql/mutations";
import {ME} from "../graphql/queries";

export const useDeleteReview = () => {
   const [deleteReview, result] = useMutation(DELETE_REVIEW, {
      refetchQueries: [{query: ME, variables: {includeReviews: true}}]
   });

   const removeReview = async (deleteReviewId) => {
      const {data} = await deleteReview({variables: {deleteReviewId}})

      if (data?.deleteReview) {
         return {data}
      }
   }

   return [removeReview, result];
};
