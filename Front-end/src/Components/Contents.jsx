import React from "react";
import Card1 from "./Card1";

export default function Contents() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/Bg-1.jpg')] bg-cover bg-center flex flex-col overflow-hidden">


      {/* Contenu principal */}
        <section className="grow flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:px-[10%] py-12 w-full">
          <Card1 />
        </section>
      </div>
    
  );
}
