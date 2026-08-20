import React from 'react';
import AdminLayout from './AdminLayout';
import { UserPlus, UserSquare2, Phone, Key, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Cuisiniers_D() {
  const [loady, setloady] = useState(true);
        useEffect(() => {
          const timer = setTimeout(() => {
            setloady(false);
          }, 1000);
          return () => clearTimeout(timer);
        }, []);
        if (loady) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="loader">
                <img src="/Digiload.svg" alt="loader" width="200" />
              </div>
            </div>
          );
        } 
        
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-[Open_Sans] text-gray-900 tracking-tight">Gestion des cuisiniers</h1>
            <p className="text-gray-500 font-[Open_Sans] mt-1">
              Ajoutez et gérez les accès de votre équipe en cuisine.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a35200]"></span>
            <span className="text-sm font-[Open_Sans] text-gray-700">0 Cuisiniers actifs</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Subtle top right glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Card Title */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ff7a00] flex items-center justify-center shrink-0">
                <UserPlus size={24} strokeWidth={2} />
              </div>
              <h2 className="text-xl font-[Open_Sans] text-gray-900 leading-tight">
                Nouveau Cuisinier
              </h2>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 max-w-xl">
              {/* Nom Complet */}
              <div>
                <label className="block text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">
                  Nom Complet
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <UserSquare2 size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Ex: Username"
                    className="w-full bg-[#f8f9fc] border-none rounded-xl py-3.5 pl-12 pr-4 text-gray-700 text-sm font-medium placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                  />
                </div>
              </div>

              {/* Numéro de téléphone */}
              <div>
                <label className="block text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">
                  Numéro de téléphone
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="+223 82 29 13 68"
                    className="w-full bg-[#f8f9fc] border-none rounded-xl py-3.5 pl-12 pr-4 text-gray-700 text-sm font-medium placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-xs font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">
                  Mot de passe
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <Key size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-[#f8f9fc] border-none rounded-xl py-3.5 pl-12 pr-4 text-gray-700 text-sm font-medium placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#a35200] hover:bg-[#8a4400] text-white rounded-xl text-sm font-[Open_Sans] transition-colors shadow-sm">
                  <PlusCircle size={18} strokeWidth={2.5} />
                  Ajouter le cuisinier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
