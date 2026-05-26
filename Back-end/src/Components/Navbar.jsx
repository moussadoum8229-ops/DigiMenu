import React, { useState } from "react";
import BlurText from "../Textanimations/BlurText"
import {Link} from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-amber-800/50 p-4 relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo - Toujours visible */}
        <div className="shrink-0">
          <img
            src="./Logo.jpeg"
            className="h-16 sm:h-20 object-contain rounded-full shadow-sm transition-transform hover:scale-105"
            alt="Bamako Sira Logo"
          />
        </div>

        {/* Bouton Hamburger pour mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white hover:text-gray-200 focus:outline-none p-2"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Liens de navigation */}
        <ul className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-amber-900/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none shadow-xl md:shadow-none p-6 md:p-0 items-center gap-4 transition-all duration-300`}>
          <li className="w-full md:w-auto">
            <button className="w-full md:w-auto font-bold rounded-2xl bg-white p-2 px-6 hover:bg-blue-100 transition duration-700 text-base" type="button">Accueil</button>
          </li>
          <li className="w-full md:w-auto">
            <button className="w-full md:w-auto font-bold rounded-2xl bg-white p-2 px-6 hover:bg-blue-100 transition duration-700 text-base" type="button">A propos</button>
          </li>
          <li className="w-full md:w-auto">
          <Link to="/form">
            <button className="w-full md:w-auto font-bold rounded-2xl bg-white p-2 px-6 hover:bg-blue-100 transition duration-700 text-base" type="button">Cuisine</button>
          </Link>
          
          </li>
          
        </ul>
      </div>
    </nav>
  );
}
