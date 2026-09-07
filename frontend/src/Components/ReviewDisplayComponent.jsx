import moment from "moment";
import React from "react";

export default function ReviewDisplayComponent({
  avatar,
  name,
  stars,
  comment,
  createdAt,
}) {
  return (
    <div className="flex items-start gap-1 bg-gray-100 rounded-md shadow-sm p-2">
      <img src={avatar} alt={name} className="w-10 h-10" />
      <div className="py-1 w-full pr-3 flex flex-col gap-1">
        <div className="w-ful">
          <div className="flex justify-between items-center w-ful">
            <h1 className="text-sm">{name}</h1>
            <p className="text-xs">
              Rated {stars} {stars > 1 ? "Stars" : "Star"}
            </p>
          </div>
          <p className="text-[10px] -mt-1">
            {moment(createdAt).format("ddd, MMM D, YYYY hh:mm:ss a")}
          </p>
        </div>
        <p className="text-[12px] leading-4">{comment}</p>
      </div>
    </div>
  );
}
