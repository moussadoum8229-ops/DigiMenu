import React from "react";
import Navbar from "./Navbar";
import Card1 from "./Card1";

export default function Contents() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/Bg-1.jpg')] bg-cover bg-center flex flex-col overflow-hidden">
      {/* Overlay gradient élégant pour le contraste */}
      <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/40 to-black/70 z-0"></div>
      
      {/* Effets de lumière ambiante (glow) pour un style moderne */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-120 h-120 bg-red-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <section className="grow flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:px-[10%] py-12 w-full">
          <Card1 />
        </section>
      </div>
    </div>
  );
}
