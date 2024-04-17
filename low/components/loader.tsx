import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className=" h-full flex flex-col gap-y-4 items-center justify-center">
      <div className=" w-10 h-10 animate-spin">
        <Image src="/remix.png" fill alt="Loader" />
      </div>
      <p className=" text-muted-foreground text-sm"> RemixAI is thinking</p>
    </div>
  );
};

export default Loader;
