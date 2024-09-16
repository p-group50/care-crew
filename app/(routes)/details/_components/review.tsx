// review.tsx
import globalApi from "@/app/_services/global-api";
import { BusinessByCategory } from "@/app/_services/types";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@descope/nextjs-sdk/client";
import { useState } from "react"
import { toast } from "sonner";

interface ReviewProps {
  business?: BusinessByCategory;
  children?: React.ReactNode;
}

export const Review = ({ business }: ReviewProps) => {
  const [content, setContent] = useState('');
  const { user } = useUser(); 
  
  if (!user || !business) return null; // Ensure user and business are defined

  const createReview = () => {
    // Check if business ID and user email are defined before making the API call
    if (business.id && user.email) {
      globalApi.createReview(business.id, user.email, content).then((response) => {
        console.log('review response is', response);

        setContent(''); // Clear the textarea after review submission
        toast("Your review has been submitted successfully!"); // Display the toast

      }).catch(error => {
        console.error("Failed to submit review:", error);
        toast("There was an error submitting your review.");
      });
    } else {
      console.error("Business ID or user email is undefined.");
      toast("Unable to submit your review.");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Review</h2>

      <div className="">
        <Textarea
          name="review"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a review..."
          className="resize-none mt-4"
        />

        <Button 
          onClick={createReview}
          className="mt-4"
        >
          Send
        </Button>
      </div>
    </div>
  );
}






















// import globalApi from "@/app/_services/global-api";
// import { BusinessByCategory } from "@/app/_services/types";
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { useUser } from "@descope/nextjs-sdk/client";
// import { useState } from "react"

// interface ReviewProps {
//   business?: BusinessByCategory;
//   children?: React.ReactNode;
// }

// export const Review = ({ business }: ReviewProps) => {
//   const [content, setContent] = useState('');
//   const { user } = useUser(); 

//   if (!user || !business) return null; // Ensure user and business are defined

//   const createReview = () => {
//     // Check if business ID and user email are defined before making the API call
//     if (business.id && user.email) {
//       globalApi.createReview(business.id, user.email, content).then((response) => {
//         console.log('review response is', response);
//       });
//     } else {
//       console.error("Business ID or user email is undefined.");
//     }
//   };

//   return (
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold">Review</h2>

//       <div className="">
//         <Textarea
//           name="review"
//           rows={3}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write a review..."
//           className="resize-none mt-4"
//         />

//         <Button 
//           onClick={createReview}
//           className="mt-4"
//         >
//           Send
//         </Button>
//       </div>
//     </div>
//   )
// }
