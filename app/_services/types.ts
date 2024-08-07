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

// export interface Booking {
//   businessList: Business[];
//   date: string; // Assuming date is in string format (ISO 8601)
//   time: string; // Assuming time is in string format (e.g., "14:00")
// }

// Define the response structure for the booking history query
// export interface BookingHistoryType {
//   name: string;
//   images: Image[];
//   contactPerson: string;
//   address: string;
// }

// export interface Image {
//   url: string;
// }

// export interface BookingHistoryResponse {
//   bookings: Booking[];
// }

// // Example usage
// export interface GetBookingHistoryResponse {
//   bookingHistory: BookingHistoryResponse;
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
// Define the full mutation type
export interface CreateBookingMutation {
  createBooking: {
    data: CreateBookingInput;
  };
}