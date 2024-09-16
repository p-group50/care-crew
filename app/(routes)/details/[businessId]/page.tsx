"use client"
import SignIn from '@/app/(auth)/sign-in/page';
import globalApi from '@/app/_services/global-api';
import { BusinessById } from '@/app/_services/types';
import { useSession } from '@descope/nextjs-sdk/client';
import React, { useEffect, useState } from 'react'
import { BusinessInfo } from '../_components/business-info';
import { SuggestedBusinessList } from '../_components/suggested-business-list';
import { BusinessDescription } from '../_components/business-description';
import { Review } from '../_components/review';
import { FetchReviews } from '../_components/fetchReviews';



const BusinessDetail = ({ params }: any) => {

  // check if user is authenticated and load business from session
  const { isAuthenticated, isSessionLoading } = useSession();
  
  const [businessById, setBusinessById] = useState<BusinessById | null >(null);
  // const [reviews, setReviews] = useState<Reviews[]>([]);
  
  // useEffect(() => {
  //   params && getBusinessById();
  // },[params])
  useEffect(() => {
    if (params && params.businessId) {
      getBusinessById(params.businessId);
    }
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  },[]);

  //get business details by the business id from the url 
  const getBusinessById = (businessId: string) => {
    // globalApi.getBusinessById(params.businessId)
    globalApi.getBusinessById(businessId)
    .then(response => {
      setBusinessById(response.businessList)
      console.log("biz list id: ", response.businessList)
    })
  };

  const checkUserAuth = () => {
    //if session is loading run dis
    if (isSessionLoading) {
      return(
        <div>Loading...</div>
      )
    }

    //if session is not authenticated, redirect to login page
    if (!isAuthenticated) {
      SignIn();
    } 
  }

    if (!businessById) {
     return <div>Loading...</div>; // You can customize the loading state as needed
    }


  return isAuthenticated && businessById && (
    <div className='py-8 md:py-20 px-10 md:px-36'>
      <BusinessInfo businessById={businessById} />

      {/* displays te business description */}
      <div className="grid grid-cols-3 mt-16">
        <div className="col-span-3 md:col-span-2 order-last md:order-first">
          <div className="">
            <BusinessDescription businessById={businessById}/>
          </div>
          
          <div className=''>
            <Review business={businessById}/>
          </div>

          <div className="">
            <FetchReviews  businessId={businessById.id}/>
          </div>
        </div>


        {/* displays suggested or similar businesses */}
        <div className="">
          <SuggestedBusinessList suggestedBusinesses={businessById}  />
        </div>
      </div>

    </div> 
  )
}

export default BusinessDetail









// "use client"
// import SignIn from '@/app/(auth)/sign-in/page';
// import globalApi from '@/app/_services/global-api';
// import { BusinessById } from '@/app/_services/types';
// import { useSession } from '@descope/nextjs-sdk/client';
// import React, { useEffect, useState } from 'react';
// import { BusinessInfo } from '../_components/business-info';

// const BusinessDetail = ({ params }: any) => {
//   // check if user is authenticated and load business from session
//   const { isAuthenticated, isSessionLoading } = useSession();
//   const [businessById, setBusinessById] = useState<BusinessById | null>(null);

//   useEffect(() => {
//     if (params && params.businessId) {
//       getBusinessById(params.businessId);
//     }
//   }, [params]);

//   useEffect(() => {
//     checkUserAuth();
//   }, []);

//   //get business details by the business id from the url 
//   const getBusinessById = (businessId: string) => {
//     globalApi.getBusinessById(businessId)
//       .then(response => {
//         setBusinessById(response.businessList[0]); // Assuming it's an array and you want the first item
//         console.log("biz list id: ", response.businessList[0]);
//       })
//       .catch(error => {
//         console.error("Error fetching business by id: ", error);
//       });
//   };

//   const checkUserAuth = () => {
//     //if session is loading run dis
//     if (isSessionLoading) {
//       return <div>Loading...</div>;
//     }

//     //if session is not authenticated, redirect to login page
//     if (!isAuthenticated) {
//       SignIn();
//     }
//   };

//   if (!isAuthenticated) {
//     return null;
//   }

//   if (!businessById) {
//     return <div>Loading...</div>; // You can customize the loading state as needed
//   }

//   return (
//     <div className='py-8 md:py-20 px-10 md:px-36'>
//       <BusinessInfo businessById={businessById} />
//     </div>
//   );
// }

// export default BusinessDetail;
