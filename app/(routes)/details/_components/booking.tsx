import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react" 
import globalApi from '@/app/_services/global-api';
import { Button } from "@/components/ui/button";
import { BookedSlot, BusinessByCategory, GetBookedSlotResponse } from "@/app/_services/types";
import { useUser } from "@descope/nextjs-sdk/client"; 
import { toast } from "sonner";
import moment from "moment";

interface BookingProps {
  children: React.ReactNode
  business?: BusinessByCategory 
}
interface TimeSlot {
  time: string;
}

export const Booking = ({ children, business }: BookingProps) => {
  const [date, setDate] = useState<Date | undefined | any>(new Date());
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [bookedSlot, setBookedSlot] = useState<string[] | GetBookedSlotResponse| any>([]);

  const { user } = useUser();

    useEffect(()=>{
        getTime();
        
    },[])

    useEffect(() => {
        date && BookedSlot();
    }, [date])

    /**
     * Get Selected Date Business Booked Slot
     */
    const BookedSlot = () => {
      if (business?.id) {
        globalApi.getBookedSlots(business?.id, moment(date).format('DD-MMM-yyyy'))
        .then(response => {
            console.log("booked slot resp is ::", response)
            setBookedSlot(response.bookings)
        })
      }  else {
        console.log("no business id")
      }
    }

  const getTime = () => {
    const timeList: TimeSlot[] = [];
    for (let i = 10; i <= 12; i++) {
        timeList.push({
            time: i + ':00 AM'
        })
        timeList.push({
            time: i + ':30 AM'
        })
    }
    for (let i = 1; i <= 6; i++) {
        timeList.push({
            time: i + ':00 PM'
        })
        timeList.push({
            time: i + ':30 PM'
        })
    }

    setTimeSlot(timeList)
  }


  const saveBooking = () => { 
    if (business?.id && selectedTime && user?.email && user?.name) {
      globalApi.createNewBooking(
        business.id, 
        moment(date).format('DD-MMM-yyyy'), 
        selectedTime, 
        user.name, 
        user.email
      )
      .then(response => {
        console.log("save booking resp is ::", response.createBooking.id); 
    
        if (response.createBooking?.id) { 
          toast("Service booked successfully");
          // to remove the previous selected date & time
          setDate(''); 
          setSelectedTime('');
          // Publish the booking
          globalApi.publishBooking(response.createBooking.id)
            .then(() => toast("Booking published successfully"))
            .catch(() => toast("Failed to publish booking"));
        }
      })
      .catch(() => {
        toast('Error booking service');
      });
    } else {
      toast("Missing required information");
    }
  };
  
  
//TODO: remove if statement and use if above code dont work
//   const saveBooking = () => { 
//     if (business?.id && selectedTime && user?.email && user?.name) {
//     globalApi.createNewBooking(
//       business?.id, 
//       moment(date).format('DD-MMM-yyyy'), 
//       selectedTime, 
//       user.name, 
//       user.email
//     )
//     .then(response => {
//       console.log("save booking resp is ::", user.email) 

//       if (response) { 
//         toast("Service booked successfully");
//         // to remove d previous selected date & time
//         setDate('') 
//         setSelectedTime('')
//       }
//     }, (e) => {
//       // error
//       toast('Error booking service')
//     })
//   }
// }

  const isSlotBooked = (time: string) => {
    return bookedSlot.find((item: BookedSlot) => item.time == time)
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          { children } 
        </SheetTrigger>
        <SheetContent side={'right'} className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book Service</SheetTitle>
            <SheetDescription>
              Select date and time for your appointment.

              {/* Date picker */}
              <div className="flex flex-col gap-5 items-baseline">
                <h3 className="mt-5 text-lg font-bold">Date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className={`rounded-md border w-full `}
                />
              </div>

              {/* Add time picker */}
              <div className="max-w-[700px] flex-col justify-center"> 
                <h3 className="mt-5 text-lg font-bold">Time</h3>

                <div className=" grid grid-cols-3 gap-x-4 gap-y-2">
                  {timeSlot.map ((item, index) => (
                    <Button 
                      key={index}
                      disabled={isSlotBooked(item.time)}
                      variant={"outline"}
                      onClick={() => setSelectedTime(item.time)}
                      className={`m-2 hover:bg-primary hover:text-white 
                        ${selectedTime == item.time && 'bg-primary text-white'}`}
                    >
                      {item.time}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>

          <SheetFooter>
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant={'destructive'}>Cancel</Button>
                <Button 
                  onClick={() => saveBooking()}
                  disabled={!(selectedTime && date)}
                >
                  Book service
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
};