import { BusinessById } from "@/app/_services/types";
import Image from "next/image";
interface BusinessDescriptionProps {
  businessById?: BusinessById; 
}

export const BusinessDescription = ({ businessById }: BusinessDescriptionProps) => {
  return businessById?.name && (
    <div className="">
      <p className="font-bold text-2xl">About </p>

      <p className="mt-4 text-gray-700">
        {/* display about info from te selected business */}
        {businessById?.about}
      </p>

      <p className="font-bold text-2xl mt-8">Gallery </p>

      {/* display images for business description or gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {businessById?.images?.map((index, item) => (
          <Image 
            key={item} 
            src={index?.url} 
            alt=""
            width={700}
            height={200}
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  )
}