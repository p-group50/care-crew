'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingHistory from './_components/booking-history';
import globalApi from "@/app/_services/global-api"
import { useUser } from "@descope/nextjs-sdk/client"
import { useEffect, useState } from "react" 
import { GetBookingHistoryResponse } from "@/app/_services/types";

const MyBooking = () => {
  const { user } = useUser();

  const [bookingHistory, setBookingHistory] = useState<GetBookingHistoryResponse[] | any>([])

  useEffect(() => {
    user && getBookingHistory()
  }, [user])

  // gets booked services
  const getBookingHistory = () => {
    globalApi.getBookingHistory(user.email as string)
    .then(response => {
      // console.log('resp', response.bookings);
      setBookingHistory(response.bookings);
    })
  }


  // This function filters booking history based on the specified type. 
  // If the type is 'booked', it returns items with a date greater than the current date. 
  // Otherwise, it returns items with a date less than the current date.
  const filterData = (type: string) => {
    const result = bookingHistory.filter((item: { date: string | any }) =>
      type == 'booked' 
      ? new Date(item.date) > new Date()
      : new Date(item.date) < new Date()
    )
    return result;
  }

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="booked">
          <BookingHistory bookingHistory={filterData('booked')}/>
        </TabsContent>
        <TabsContent value="completed"> 
          <BookingHistory bookingHistory={filterData('completed')}/>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default MyBooking