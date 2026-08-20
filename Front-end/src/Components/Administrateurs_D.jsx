import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

export default function Add_Administrateurs() {
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="max-w-4xl mx-auto bg-white min-h-125 p-8 rounded-xl shadow-sm border border-gray-100">
        
        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="text-[#a35200]">
            <UserPlus size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-[Open_Sans] text-gray-800">
            Nouvel Administrateur
          </h1>
        </div>

        {/* Form */}
        <div className="space-y-6 max-w-full">
          
          {/* Nom complet */}
          <div>
            <label className="block text-sm font-[Open_Sans] text-gray-700 mb-2">
              Nom complet
            </label>
            <input 
              type="text" 
              placeholder="ex: Username"
              className="w-full bg-[#f8f9fc] border-none rounded-lg py-3 px-4 text-gray-700 text-sm font-medium placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
            />
          </div>

          {/* Mot de passe provisoire */}
          <div>
            <label className="block text-sm font-[Open_Sans] text-gray-700 mb-2">
              Mot de passe provisoire
            </label>
            <div className="relative flex items-center">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-[#f8f9fc] border-none rounded-lg py-3 px-4 text-gray-700 text-sm font-[Open_Sans] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#ff7a00]/20 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100 my-8"></div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-6">
          <button className="text-sm font-[Open_Sans] text-gray-600 hover:text-gray-800 transition-colors">
            Annuler
          </button>
          <button className="px-6 py-2.5 bg-[#a35200] hover:bg-[#8a4400] text-white rounded-lg text-sm font-[Open_Sans] transition-colors shadow-sm">
            Ajouter un Admi
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
