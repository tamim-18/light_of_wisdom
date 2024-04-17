import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";

const BotAvatar = () => {
  return (
    <Avatar className=" h-8 w-8">
      <AvatarImage className="p-1" src="/remix.png" />
    </Avatar>
  );
};

export default BotAvatar;
