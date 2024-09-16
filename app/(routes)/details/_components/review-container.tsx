// import { useEffect, useState } from "react";
// import { FetchReviews } from "@/components/FetchReviews";
// import client from "@/lib/graphql-client"; // Replace with your actual GraphQL client setup
// import { Reviews, BusinessById } from "@/app/_services/types";
// import { gql } from "graphql-request";

// export const ReviewsContainer = () => {
//   const [reviewList, setReviewList] = useState<Reviews[]>([]);
//   const businessById: BusinessById = { id: businessId }; // Replace with your actual business ID

//   useEffect(() => {
//     const fetchReviews = async () => {
//       const query = gql`
//         query GetReviewsByBusiness($businessId: ID!) {
//           reviews(where: { businessList: { id: $businessId } }) {
//             id
//             content
//             userEmail
//             businessList {
//               id
//             }
//           }
//         }
//       `;
//       const response = await client.request<{ reviews: Reviews[] }>(query, { businessId: businessById.id });
//       setReviewList(response.reviews);
//     };

//     fetchReviews();
//   }, [businessById]);

//   return (
//     <div>
//       <h1>Business Reviews</h1>
//       <FetchReviews reviewList={reviewList} businessId={businessById} />
//     </div>
//   );
// };
