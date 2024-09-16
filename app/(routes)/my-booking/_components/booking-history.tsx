import { AlarmCheck, Calendar, MapPin, User } from "lucide-react"
import Image from "next/image"


const BookingHistory = ({ bookingHistory}: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {bookingHistory.map((booking: any, index: any) => (
        <div key={index} className="flex gap-4 border p-4 rounded-lg">
          <Image 
            alt="" 
            src={booking?.businessList?.images[0]?.url}
            width={80}
            height={80}
            className="rounder-lg object-contain"
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-bold"> {booking.businessList.name} </h2>
            <h2 className="flex gap-2 text-primary">
              <User/> 
              {booking.businessList.contactPerson} 
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <MapPin/> 
              {booking.businessList.address} 
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <Calendar className="text-primary/50"/> 
              Service date: {' '}
              {booking.date} 
            </h2>
            <h2 className="flex gap-2 text-gray-500 items-center">
              <AlarmCheck/>  
              <span className="">At: {' '} {booking.time} </span> 
            </h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingHistory