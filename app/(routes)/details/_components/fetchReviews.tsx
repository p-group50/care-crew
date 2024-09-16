import { useEffect, useState } from "react";
import { getReviews } from "@/app/_services/global-api";
import { Review } from "@/app/_services/types";
import { User2 } from "lucide-react";

interface FetchReviewsProps {
  businessId: string;
}

export const FetchReviews = ({ businessId }: FetchReviewsProps) => {
  // State to store the array of reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getReviews(businessId);

        // Log the result to ensure you're getting what you expect
        console.log('API response:', result);

        // Check if businessList is an object and contains reviews
        if (result.businessList && result.businessList.review) {
          // Set the reviews from the businessList
          setReviews(result.businessList.review);
        } else {
          console.error("No reviews found for this business.");
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [businessId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews found.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-5">Reviews</h2>
    
      <div className="">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-y-4 mt-3">

            <div className="">
              <div className="flex justify-between items-center gap-x-3">

                <div className="flex justify-between">
                  <User2 className="rounded-full text-primary/40 size-6"/>
                  <p className="text-gray-600 text-sm">{review.userEmail}</p>
                </div>

                  <p className="text-xs text-gray-500">{review.updatedAt.split('T')[0]}</p>
              </div>
              <p className="pl-8">{review.content}</p>
            </div>
            
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};











// import { getReviews } from "@/app/_services/global-api";
// import { Business, Review } from "@/app/_services/types"
// import { useEffect, useState } from "react";

// interface FetchReviewsProps {
//   businessId: string;
// }
// export const FetchReviews = ({ businessId }: FetchReviewsProps) => { 

// const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchReviews = async () => {

//     try {
//       const result = await getReviews(businessId);
      
//       // Log the result to ensure you're getting what you expect
//       console.log('API response:', result);

//       // Ensure businessList is an array before setting it
//       // if (Array.isArray(result.businessList)) {

//       // Access the reviews array directly from the businessList object
//         if (result.businessList && result?.businessList?.length > 0) {
//         console.log('result.businessList is =>',result.businessList )
//         setReviews(result?.businessList[0].review);
//       } else {
//         console.error("Expected an array for businessList");
//         setReviews([]);
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//     fetchReviews();
//   }, [businessId]);


//   if (loading) {
//     return <p>Loading reviews...</p>;
//   }

//   if (reviews.length === 0) {
//     return <p>No reviews found.</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-bold">Reviews</h2>
//       <div className="">
//         {reviews.map((review) => (
//             <div key={review.id} className="">
//               <p>User email: {review.userEmail}</p>
//               <p>Review: {review.content}</p>
//               <hr />
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// }
