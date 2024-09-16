import request, { gql, GraphQLClient } from "graphql-request";
import { 
  CreateBookingMutation,
  // CreateBookingMutation,
  CreateReviewMutation,
  GetBookedSlotResponse,
  GetBookingHistoryResponse,
  GetBusinessByCategoryResponse, 
  GetBusinessByIdResponse, 
  GetBusinessListResponse, 
  GetCategoryResponse,
  GetReviewListResponse,
  PublishBookingMutation,
} from "./types";

// the api key that connects to hygrah cms
const contentApi = process.env.NEXT_PUBLIC_CONTENT_API!;
const token = process.env.HYGRAPH_PAT_API!; // Ensure this environment variable is updated

const client = new GraphQLClient(contentApi, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// fetch the category data from the hygrah cms API
const getCategory = async (): Promise<GetCategoryResponse> => {
  const query = gql`
  query category {
    categories {
      bgColor {
        hex
      }
      id
      name
      icon {
        url
      }
    }
  }
`
// using the graphql-request library to make a request to the hygrah cms api
// and return the result of the request
const result = await request<GetCategoryResponse>(contentApi!, query)
return result;
}

// fetch the list of services or jobs from the backend; 
// TODO: searchTerm is optional 
export const getBusinessList = async (searchTerm: string = ''): Promise<GetBusinessListResponse> => {
  const query = gql`
  query businessList($searchTerm: String)  {
    businessLists(where: {name_contains: $searchTerm})  {
      about
      address
      category {
        name
      }
      contactPerson
      email
      images {
        url
      }
      id
      name
    }
  }
`
// Default to an empty string if no search term is provided
const variables = { searchTerm: searchTerm || '' };
const result = await request<GetBusinessListResponse>(contentApi!, query, variables)
return result;
}

const getBusinessByCategory = async (category: any): Promise<GetBusinessByCategoryResponse> => {
  const query = gql`
  query getBusinessByCategory {
    businessLists(where: {category: {name: "`+ category +`"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      images {
        url
      }
      id
      name
    }
  }
  `
  const result = await request<GetBusinessByCategoryResponse>(contentApi!, query)
  return result;
}

// const getBusinessById = async (id: any): Promise<GetBusinessByIdResponse> => {
//   const query = gql`
//   query getBusinessById {
//     businessList(where: {id: "`+ id +`"}) {
//       about
//       address
//       category {
//         name
//       }
//       contactPerson
//       email
//       id
//       name
//       images {
//         url
//       }
//     }
//   }
//   `
//   const result = await request<GetBusinessByIdResponse>(contentApi!, query)
//   return result;
// }
const getBusinessById = async (id: string): Promise<GetBusinessByIdResponse> => {
  const query = gql`
    query getBusinessById {
      businessList(where: {id: "${id}"}) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;
  const result = await request<GetBusinessByIdResponse>(contentApi!, query);
  return result;
}

// query to get already booked slots
const getBookedSlots = async (businessId: string, date: any): Promise<GetBookedSlotResponse> => {
  const query = gql`
    query bookingSlot {
      bookings(where: { businessList: {
          id: "${businessId}"
        }, 
          date: "${date}"
        }) {
      date
      time
      }
    }
  `;
  const result = await request<GetBookedSlotResponse>(contentApi!, query);
  return result;
}

// query to get booking history
const getBookingHistory = async (userEmail: string):Promise<GetBookingHistoryResponse> => {
  // userEmail = userName in hygraph 
  // TODO: make the change from userName to userEmail after fix in this query
  const query = gql`
    query bookingHistory {
      bookings(
      where: {userName: "${userEmail}"}
      orderBy: publishedAt_DESC
      ) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
    }
  }
  `;
  const result = await request<GetBookingHistoryResponse>(contentApi!, query);
  return result;

}


export const getReviews = async (id: string): Promise<GetReviewListResponse> => {
  const query = gql`
    query reviewList {
      businessList(where: {id: "${id}"}) {
        review (orderBy: publishedAt_DESC){
          content
          userEmail
          id
          updatedAt
        }
      }
    }
  `;
  const result = await request<GetReviewListResponse>(contentApi!, query);
  return result;
};
// const getReviews = async (businessId: string):Promise<GetReviewListResponse> => {
//   const query = gql`
//     query reviewList {
//       reviews(where: 
//       {businessList: {id: "${businessId}"}
//       }) {
//       content
//       userEmail
//       businessList {
//         id
//       }
//     }
//   }
//   `;
//   const result = await request<GetReviewListResponse>(contentApi!, query);
//   return result;
// }





//MUTATION
// TODO: fix issue wid username being inserted in user email column and vice versa
// create and publish bookings in hygraph

// already in types remove if not needed here
// export interface CreateBookingMutation {
//   createBooking: {
//     id: string;
//   };
// }
// export interface PublishBookingMutation {
//   publishBooking: {
//     id: string;
//   };
// }


// global-api.ts
const createNewBooking = async (
  businessId: string, 
  date: string, 
  time: string, 
  userEmail: string, 
  userName: string
): Promise<CreateBookingMutation> => {
  const mutationQuery = gql`
    mutation CreateBooking {
      createBooking(
        data: {
          bookingStatus: Booked, 
          businessList: { connect: { id: "${businessId}" } }, 
          date: "${date}", 
          time: "${time}", 
          userName: "${userName}",
          userEmail: "${userEmail}"
        }
      ) {
        id
      }
    }
  `;
  const result = await request<CreateBookingMutation>(contentApi!, mutationQuery);
  return result;
};

const publishBooking = async (bookingId: string): Promise<PublishBookingMutation> => {
  const mutationQuery = gql`
    mutation PublishBooking {
      publishBooking(where: { id: "${bookingId}" }, to: PUBLISHED) {
        id
      }
    }
  `;
  const result = await request<PublishBookingMutation>(contentApi!, mutationQuery);
  return result;
};


//altered to work wid undefined values 
// const createNewBooking = async (
//   businessId: string, 
//   date: string, 
//   time: string, 
//   userEmail: string, 
//   userName: string
// ): Promise<CreateBookingMutation> => {
//   const mutationQuery = gql`
//     mutation CreateBooking {
//       createBooking(
//         data: {
//           bookingStatus: Booked, 
//           businessList: { connect: { id: "${businessId}" } }, 
//           date: "${date || 'N/A'}", 
//           time: "${time || 'N/A'}", 
//           userName: "${userName || 'Anonymous'}",
//           userEmail: "${userEmail || 'noemail@example.com'}"
//         }
//       ) {
//         id
//       }
//     }
//   `;
//   const result = await request<CreateBookingMutation>(contentApi!, mutationQuery);
//   return result;
// };
//\end code


// Separate publish function
// export const publishBooking = async (bookingId: string): Promise<PublishBookingMutation> => {
//   const mutationQuery = gql`
//     mutation PublishBooking {
//       publishBooking(where: {id: "${bookingId}"}, to: PUBLISHED) {
//         id
//       }
//     }
//   `;
//   const result = await request<PublishBookingMutation>(contentApi!, mutationQuery);
//   return result;
// };




// const createNewBooking = async (
//   businessId: any, 
//   date?:string | any, 
//   time?:string | any, 
//   userEmail?:string | any,
//   userName?:string | any,
// ): Promise<CreateBookingMutation> => {

//   const mutationQuery = gql`
//     mutation CreateBooking {
//       createBooking(
//         data: {
//           bookingStatus: Booked, 
//           businessList: {
//             connect: {id: "${businessId}" }
//           }, 
//           date: "`+ date +`", 
//           time: "`+ time +`", 
//           userName: "`+ userName +`"
//           userEmail: "`+ userEmail +`", 
//         }
//       ) {
//         id
//       }
//       publishManyBookingsConnection(to: PUBLISHED) {
//         edges {
//           node {
//             userName
//             userEmail
//             time
//             bookingStatus
//             date
//           }
//         }
//       }
//     }
//   `;
//   const result = await request<CreateBookingMutation>(contentApi!, mutationQuery);
//   return result; 
// }


// global-api.ts
const createReview = async (
  businessId: string, 
  userEmail: string, 
  content: string
): Promise<CreateReviewMutation> => {
  const createReviewMutation = gql`
    mutation CreateReview {
      createReview(
        data: {
          businessList: { connect: { id: "${businessId}" } }, 
          content: "${content}", 
          userEmail: "${userEmail}"
        }
      ) {
        id
      }
    }
  `;

  const createResult = await request<CreateReviewMutation>(contentApi!, createReviewMutation);

  const publishReviewMutation = gql`
    mutation PublishReview {
      publishReview(where: { id: "${createResult.createReview.id}" }, to: PUBLISHED) {
        id
      }
    }
  `;

  const publishResult = await request<CreateReviewMutation>(contentApi!, publishReviewMutation);

  return publishResult;
};



//TODO: use if new or above dont work
// const createReview = async (
//   businessId: any, 
//   userEmail: string, 
//   content: string): Promise<CreateReviewMutation> => {
//   const mutationQuery = gql`
//     mutation CreateReview {
//       createReview(
//         data: {businessList: 
//           {connect: {id: "${businessId}"}
//         }, content: "${content}", 
//         userEmail: "${userEmail}"
//       }
//       ) {
//       content
//       id
//       userEmail
//     }
//     publishManyReviewsConnection(to: PUBLISHED) {
//       edges {
//         node {
//           userEmail
//           content
//         }
//       }
//     }
//   }
//   `;
//   const result = await request<CreateReviewMutation>(contentApi!, mutationQuery);
//   return result; 
// }

export default { 
  getCategory,
  getBusinessList,
  getBusinessByCategory,
  getBusinessById,
  getBookedSlots,
  getBookingHistory,
  getReviews,

  createReview, 
  createNewBooking,
  publishBooking,
};