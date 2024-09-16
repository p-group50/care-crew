import { BusinessById } from "@/app/_services/types"
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Share2Icon, Timer, User2 } from "lucide-react";
import Image from "next/image"

interface BusinessInfoProps {
  businessById?: BusinessById; 
}

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

          <p className="flex gap-2 text-lg text-gray-500">
            <Mail />
            {businessById.email}
          </p>
        </div>
        <div className="flex flex-col gap-5 items-end">
          <Button>
            <Share2Icon/>
          </Button>

          <div className="flex gap-2 text-primary">
            <User2/>
            {businessById.contactPerson}
          </div>

          <div className="flex gap-2 text-gray-500">
            <Timer />
            {/* Available 8:00pm : 10:00pm */}
          </div>
        </div>
      </div>
    </div>
  )
}