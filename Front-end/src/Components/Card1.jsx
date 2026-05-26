import React from "react";
import TextType from "./TextType";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card1() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Menu");
  };
  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl w-full p-8 sm:p-10 bg-red-300/50 backdrop-blur-md rounded-2xl animate-jelly text-white shadow-2xl font-sans"
    >
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 tracking-wide">
        DigiMenu votre menu intelligent! <br />{" "}
        <TextType
          text={["Fini les menus en papier"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
          variableSpeedEnabled={true}
          variableSpeedMin={60}
          variableSpeedMax={120}
          className="text-blue-400"
          cursorBlinkDuration={0.5}
        />
      </h1>

      <p className="text-gray-200 text-sm md:text-base mb-10 leading-relaxed max-w-md">
        Scannez le code et découvrez le menu de votre restaurant préféré.
        Découvrez nos plats, nos boissons et nos promotions en un instant.
      </p>

      <div className="flex flex-wrap items-center gap-6">
          <button
            onClick={handleClick}
            className="bg-white text-black font-semibold py-3 px-8 rounded-2xl hover:bg-blue-100 transition duration-700"
          >
            Passer au menu
          </button>
      </div>
    </motion.div>
  );
}
