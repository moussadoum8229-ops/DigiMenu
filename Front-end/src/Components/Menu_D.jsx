import React from 'react';
import AdminLayout from './AdminLayout';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Menu_D() {
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
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-[Open_Sans] text-gray-900 tracking-tight">Gestion du Menu</h1>
            <p className="text-gray-500  font-[Open_Sans] mt-1">
              Concevez et organisez votre offre culinaire avec précision.
            </p>
          </div>
          <div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#a35200] hover:bg-[#8a4400] text-white rounded-lg text-sm font-[Open_Sans] transition-colors shadow-sm">
              <Plus size={18} strokeWidth={2.5} />
              Nouveau Plat
            </button>
          </div>
        </div>

        {/* Empty Content Area */}
        <div className="min-h-125">
          {/* List of menu items will go here */}
        </div>
      </div>
    </AdminLayout>
  );
}
