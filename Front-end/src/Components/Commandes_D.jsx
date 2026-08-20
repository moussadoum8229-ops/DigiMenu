import React from 'react';
import AdminLayout from './AdminLayout';
import { 
  Receipt,
  ClipboardList,
  ArrowUp
} from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Commandes_D() {
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
        {/* Header section with soft glow effect */}
        <div className="relative mb-8">
          {/* Subtle glow background */}
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-[Open_Sans] text-gray-900 tracking-tight">Commandes en cours</h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span className="font-[Open_Sans]">Service Journalière</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm font-[Open_Sans]">[Nombre] commandes actives</span>
            </div>
          </div>
        </div>

        {/* 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Commandes */}
          <div className="bg-[#f0f1f5] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
            {/* Decorative circle */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#e2e4e9] rounded-full opacity-60"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[11px] font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">Total Commandes</h3>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-[Open_Sans] text-gray-900">0</p>
                  <div className="flex items-center text-[10px] font-bold text-green-600 mb-1.5">
                    <ArrowUp size={12} strokeWidth={3} />
                    <span>12%</span>
                  </div>
                </div>
              </div>
              <div className="text-[#a35200]">
                <Receipt size={22} />
              </div>
            </div>
          </div>

          {/* En Attente */}
          <div className="bg-[#f0f1f5] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
            {/* Decorative circle */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#e2e4e9] rounded-full opacity-60"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[11px] font-[Open_Sans] text-gray-500 uppercase tracking-wider mb-2">En Attente</h3>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-[Open_Sans] text-gray-900">0</p>
                  <span className="text-[10px] font-[Open_Sans] text-red-600 mb-1.5">Attention requise</span>
                </div>
              </div>
              <div className="relative text-red-600">
                <ClipboardList size={22} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#f0f1f5]"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="bg-[#fdfdfd] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-125">
          <div className="bg-[#f8f9fc] grid grid-cols-12 p-5 text-xs font-[Open_Sans] text-gray-600 border-b border-gray-100">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Table</div>
            <div className="col-span-4">Articles</div>
            <div className="col-span-2">Montant</div>
            <div className="col-span-1">Heure</div>
            <div className="col-span-2 text-right">Statut</div>
          </div>
          {/* Empty space */}
          <div className="p-8">
            {/* Rows will go here */}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
