// interface to query category from hygraph
//types for category data
export interface Category {
  name: string;
  id: string;
  bgColor?: { 
    hex: string | any
  };
  icon?: {
    url: string | any
  };
}
export interface GetCategoryResponse {
  categories: Category[];
}

// interface for businessList or available services data 
export interface Business {
  about: string;
  address: string;
  category: {
    name: string;
  };
  contactPerson: string;
  email: string;
  images: {
    url: string;
  }[];
  id: string;
  name: string;
}
export interface GetBusinessListResponse {
  businessLists: Business[];
}

// interface for service by categories data
export interface BusinessByCategory {
  name: string; // recently added remove if value not displayed
  about: string;
  address: string;
  category: {
    name: string;
  };
  contactPerson: string;
  email: string;
  id: string;
  images: {
    url: string;
  }[];
}
export interface GetBusinessByCategoryResponse {
  [x: string]: any; // dynamic types from params
  businessByCategories: BusinessByCategory[];
}

export interface BusinessById {
  about: string;
  address: string;
  category: {
    name: string;
  };
  contactPerson: string;
  email: string;
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}
export interface GetBusinessByIdResponse {
  [x: string]: any; //dynamic url from params
  businessById: BusinessById[];
}


export interface BookedSlot {
  about: string;
  address: string;
  category: {
    name: string;
  };
  contactPerson: string;
  email: string;
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}
export interface GetBookedSlotResponse {
  [x: string]: any; //dynamic url from params
  businessById: BusinessById[];
}

// Define the structure of a booked slot
export interface BookedSlot {
  date: string; // Assuming the date is in string format
  time: string; // Assuming the time is in string format
}
// Define the response structure for the booked slots query
export interface GetBookedSlotResponse {
  bookings: BookedSlot[]; // An array of booked slots
}




export interface BookingHistory {
  bookings: {
    businessList: {
      name: string;
      images: {
        url: string;
      }[];
      contactPerson: string;
      address: string;
    };
    date: string;
    time: string;
  }[];
}
export interface GetBookingHistoryResponse {
  [x: string]: any; //dynamic url from params
  business: Business[];
}

// Type for a single review
export interface Review {
  content: string;
  userEmail: string;
  id: string;
  updatedAt: string;
}
// Type for a single business in the business list
export interface BusinessWithReviews {
  review: Review[];
}
// Type for the entire response from the query
export interface GetReviewListResponse {
  businessList: BusinessWithReviews;
}


// export interface Reviews {
//   content: string;
//   userEmail: string;
//   businessList: {
//     id: string;
//   };
// }
// export interface GetReviewListResponse {
//   [x: string]: any;
//   reviews: Reviews[];
//   businessById: BusinessById[];
// }





//MUTATION TYPES

// booking mutation
// Define types for individual fields
export interface BusinessListConnect {
  id: string;
}

export interface BusinessList {
  connect: BusinessListConnect;
}

// Define the enum for booking statuses
export enum BookingStatus {
  Booked = 'Booked',
  Canceled = 'Canceled',
  Completed = 'Completed'
}

// Define the input data type for createBooking mutation
export interface CreateBookingInput {
  bookingStatus: BookingStatus;
  businessList: BusinessList;
  date: string;
  time: string;
  userEmail: string;
  userName: string;
  id: string;
}
//TODO: uncomment if one below does not work
// Define the full mutation type
// export interface CreateBookingMutation {
//   createBooking: {
//     data: CreateBookingInput;
//   };
// }
export interface CreateBookingMutation {
  createBooking: {
    id: string;
  };
}

export interface PublishBookingMutation {
  publishBooking: {
    id: string;
  };
}




export interface Review {
  content: string;
  id: string;
  userEmail: string;
}

export interface PublishManyReviewsConnection {
  edges: {
    node: {
      userEmail: string;
      content: string;
    };
  }[];
}

export interface CreateReviewMutation {
  createReview: Review;
  publishManyReviewsConnection: PublishManyReviewsConnection;
}
