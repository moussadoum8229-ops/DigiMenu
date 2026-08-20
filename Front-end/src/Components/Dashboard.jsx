import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { 
  Calendar, 
  Download, 
  Banknote, 
  Wallet, 
  TrendingUp,
  Receipt,
  CheckCircle,
  Hourglass
} from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenuJournalier: 0,
    revenuMensuel: 0,
    revenuSemestriel: 0,
    commandesTotales: 0,
    commandesTerminees: 0,
    commandesEnCours: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
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

  const pourcentageTerminees = stats.commandesTotales > 0 
    ? Math.round((stats.commandesTerminees / stats.commandesTotales) * 100) 
    : 0;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-[Open_Sans]  text-gray-900 tracking-tight">Aperçu de l'Activité</h1>
            <p className="text-gray-500 font-[Open_Sans]  mt-1">
              Suivez les performances de votre restaurant en temps réel. Analyse des ventes et des commandes.
            </p>
          </div>
        </div>

        {/* Top 3 Cards - Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Revenu Journalier */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-[Open_Sans]  text-gray-500 uppercase tracking-wider mb-2">Revenu Journalier</h3>
                <p className="text-3xl font-[Open_Sans]  text-gray-900">{stats.revenuJournalier} FCFA</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#ff7a00] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Banknote size={24} />
              </div>
            </div>
          </div>

          {/* Revenu Mensuel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-[Open_Sans]  text-gray-500 uppercase tracking-wider mb-2">Revenu Mensuel</h3>
                <p className="text-3xl font-[Open_Sans]  text-gray-900">{stats.revenuMensuel} FCFA</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <Wallet size={24} />
              </div>
            </div>
          </div>

          {/* Revenu Semestriel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xs font-[Open_Sans]  text-gray-500 uppercase tracking-wider mb-2">Revenu Semestriel</h3>
                <p className="text-3xl font-[Open_Sans]  text-gray-900">{stats.revenuSemestriel} FCFA</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 Cards - Orders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Commandes Totales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-[Open_Sans]  text-gray-500 uppercase tracking-wider mb-2">Commandes Totales</h3>
                <p className="text-3xl font-[Open_Sans]  text-gray-900">{stats.commandesTotales}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <Receipt size={24} />
              </div>
            </div>
            <div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gray-900 h-full w-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-right text-xs text-gray-500 font-medium">Aujourd'hui</p>
            </div>
          </div>

          {/* Terminées */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-[Open_Sans]  text-gray-500 uppercase tracking-wider mb-2">Terminées</h3>
                <p className="text-3xl font-[Open_Sans]  text-gray-900">{stats.commandesTerminees}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                <CheckCircle size={24} />
              </div>
            </div>
            <div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-[#a35200] h-full rounded-full" style={{ width: `${pourcentageTerminees}%` }}></div>
              </div>
            </div>
          </div>

          {/* En Cours */}
          <div className="bg-[#a35200] rounded-2xl p-6 shadow-md flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="text-xs font-[Open_Sans]  text-white/80 uppercase tracking-wider mb-2">En Cours</h3>
                <p className="text-3xl font-[Open_Sans]  text-white">{stats.commandesEnCours}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Hourglass size={24} />
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden mb-2">
                <div className="bg-white h-full w-full rounded-full"></div>
              </div>
              <p className="text-right font-[Open_Sans]  text-white/80 font-medium">Action requise</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
