import React from "react";

type Props = {
  message: string;
};

// Cool name huh?
function InfoBastion({ message }: Props) {
  return (
    <div
      title={message}
      className="border-2 mb-1 border-black aspect-square rounded-full w-[20px] h-[20px] cursor-help text-sm md:text-base flex items-center justify-center"
    >
      ?<span className="sr-only">{message}</span>
    </div>
  );
}

export default InfoBastion;
