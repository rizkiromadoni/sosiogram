import Image from "next/image";
import React from "react";

const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              key={index}
            >
              <Image
                width={80}
                height={80}
                src="https://images.pexels.com/photos/19345473/pexels-photo-19345473/free-photo-of-seni-kesenian-atap-patung.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="w-20 h-20 rounded-full ring-2"
              />
              <span className="font-medium">Rizki</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stories;
