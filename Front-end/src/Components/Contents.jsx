import React from "react";
import { useNavigate } from "react-router-dom";
import EchoText from "./EchoText";
import { useEffect, useState } from "react";  
export default function Contents() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  function personnels() {
    navigate("/form")
  }
  function navigation() {
    navigate("/menu")

  }
  return (
    // Conteneur principal avec une couleur de fond très claire, prend toute la hauteur de l'écran
    <div className="bg-[#FAF9F6] min-h-screen font-sans text-slate-800 overflow-hidden">

      {/* Conteneur pour centrer le contenu et limiter sa largeur sur grand écran */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10">

        {/* SECTION HERO : Divisée en deux colonnes (Texte à gauche, Images à droite) sur grand écran */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ----- COLONNE DE GAUCHE : Textes et Bouton ----- */}
          <div className="w-full lg:w-1/2 space-y-8">

            {/* Petit texte au-dessus du titre (Innovation Digitale) */}
            <p className="text-[#FF7F3F] font-semibold tracking-wider text-sm uppercase">
              <EchoText
                text="[ Innovation Digitale ]"
                echoes={20}
                lag={0.19}
                offset={38}
                direction="right"
                fade={0.72}
                blur={0}
                tint="#FF7F3F"
                mode="both"
                cursorRadius={320}
                duration={900}
                ease="ease-out"
                fontSize="10xl"
                fontWeight={500}
                color="#FF7F3F"
              />
            </p>

            {/* Titre principal */}
            {/* text-5xl/6xl pour la taille, font-extrabold pour l'épaisseur */}
            <h1 className="text-5xl lg:text-6xl font-[Open_Sans] text-[#1F2937] leading-tight">
              Le menu numerique qui revolutionne votre <span className="text-[#FF7F3F]">restaurant</span>
            </h1>

            {/* Paragraphe de description */}
            <p className="text-lg font-[Open_Sans] text-slate-500 max-w-xl leading-relaxed">
              Offrez une une experience fluides a vos clients avec un menu interactifs, toujours a jour.
              Gagnez en efficacite, reduisez les cout d'impression et ameliorer l'hygiene de votre
              etablissement grace a une solution digitale complete.
            </p>

            {/* Bouton d'action "Aller au Menu" */}
            <div className="flex flex-row gap-7">
              <button onClick={navigation} className="bg-[#FF7F3F] hover:bg-[#E86A2B] text-white font-[Open_Sans] py-4 px-8 rounded-full shadow-lg shadow-orange-500/30 transition duration-300 flex items-center gap-3">
                Aller au Menu
                {/* Icône flèche droite (SVG) */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>

              <button onClick={personnels} className="bg-[#FF7F3F] hover:bg-[#E86A2B] text-white font-[Open_Sans] py-4 px-8 rounded-full shadow-lg shadow-orange-500/30 transition duration-300 flex items-center gap-3">
                Personnel
                {/* Icône utilisateur (SVG) */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </button>
            </div>

            {/* Grille des 4 caractéristiques sous le bouton */}
            {/* 2 colonnes sur mobile (grid-cols-2), 4 colonnes sur tablette/desktop (md:grid-cols-4) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">

              {/* Carte 1 : Rapide */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="text-[#FF7F3F] mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="font-[Open_Sans] text-sm text-slate-800">Rapide</h3>
                <p className="text-[10px] text-slate-500 mt-1 font-[Open_Sans] leading-tight">Commande en quelques clics</p>
              </div>

              {/* Carte 2 : Sans application */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="text-[#FF7F3F] mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="font-[Open_Sans] text-sm text-slate-800">Sans application</h3>
                <p className="text-[10px] text-slate-500 mt-1 font-[Open_Sans] leading-tight">Accessible via QR Code</p>
              </div>

              {/* Carte 3 : Mise à jour */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="text-[#FF7F3F] mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </div>
                <h3 className="font-[Open_Sans] text-sm text-slate-800">Mise à jour</h3>
                <p className="text-[10px] text-slate-500 mt-1 font-[Open_Sans] leading-tight">Modifications en temps réel</p>
              </div>

              {/* Carte 4 : Hygiénique */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="text-[#FF7F3F] mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h3 className="font-[Open_Sans] text-sm text-slate-800">Hygiénique</h3>
                <p className="text-[10px] text-slate-500 mt-1 font-[Open_Sans] leading-tight">Moins de contact, sécurité</p>
              </div>

            </div>
          </div>

          {/* ----- COLONNE DE DROITE : Images (Téléphone et QR/Pizza) ----- */}
          {/* relative pour pouvoir positionner Pizzaqr de manière absolue par rapport à ce conteneur */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-16 lg:mt-0 min-h-100">

            {/* Image des éléments flottants (Pizza, QR, etc.) */}
            {/* Positionnée en absolue derrière le téléphone */}
            <img
              src="/DigiTele.jpeg"
              alt="Éléments décoratifs menu"
              className="absolute z-0 w-[120%] rounded-full  sm:w-full max-w-162.5 object-contain opacity-90 transition-transform duration-700 hover:scale-105"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}
