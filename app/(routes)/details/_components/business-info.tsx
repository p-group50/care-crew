import { BusinessById } from "@/app/_services/types"
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Share2Icon, Timer, User2 } from "lucide-react";
import Image from "next/image"

interface BusinessInfoProps {
  businessById?: BusinessById; 
}

// UPDATED

export const BusinessInfo = ({ businessById }: BusinessInfoProps) => {
  // console.log("bizz : ", businessById)
  return businessById && (
    <div className="md:flex gap-4 items-center">
      <Image 
        src={businessById.images[0]?.url} 
        alt={businessById.name}
        width={150}
        height={200}
        className="rounded-full size-[150px] mt-3 md:mt-0 object-cover"
      />

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col items-baseline gap-2">
          <p className="text-primary bg-orange-200 rounded-full p-1 px-2">
            {businessById?.category?.name}
          </p>

          <p className="text-[40px] font-bold">
            {businessById.name}
          </p>

          <p className="flex gap-2 text-lg text-gray-500">
            <MapPin />
            {businessById.address}
          </p>

          <a href={`mailto:${businessById.email}`} 
            className="flex gap-2 text-lg text-gray-500">
            <Mail />
            {businessById.email}
          </a>
        </div>
        <div className="flex flex-col gap-5 items-end">


          <Button>
          <a href={`tel:${businessById.contactPerson}`} 
            className="flex gap-2"
            >
            <Phone /> call
          </a>
          </Button>

          {/* <a href={`tel:${businessById.contactPerson}`} 
            className="flex gap-2 text-primary"
            >
            <Phone />
            {businessById.contactPerson}
          </a> */}

          <Button>
          <a href={`mailto:${businessById.email}`} 
            className="flex gap-2 text-lg ">
            <Mail />
              send email
          </a>
          </Button>

          {/* <a href={`mailto:${businessById.email}`} 
            className="flex gap-2 text-lg text-gray-500">
            <Mail />
            {businessById.email}
          </a> */}



          {/* <div className="flex gap-2 text-gray-500">
            <Timer />
            Available 8:00pm : 10:00pm
          </div> */}
        </div>
      </div>
    </div>
  )
}