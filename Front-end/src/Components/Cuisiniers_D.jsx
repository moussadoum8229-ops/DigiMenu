import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { UserPlus, UserSquare2, Phone, Key, PlusCircle, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Cuisiniers_D() {
  // ==========================================
  // ÉTATS GLOBAUX DU FORMULAIRE
  // ==========================================
  const [loady, setloady] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [cuisiniersCount, setCuisiniersCount] = useState(0);

  // Données du formulaire
  const [formData, setFormData] = useState({
    Username: '',
    Telephone: '',
    Password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 1. Splash loader initial et récupération du nombre de cuisiniers
  const fetchCuisiniers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Auth/cuisiniers');
      if (Array.isArray(response.data)) {
        setCuisiniersCount(response.data.length);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des cuisiniers :", error);
    }
  };

  useEffect(() => {
    fetchCuisiniers();
    const timer = setTimeout(() => {
      setloady(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation côté client
    if (!formData.Username.trim()) {
      setMessage({ type: 'error', text: 'Veuillez saisir un nom d\'utilisateur.' });
      return;
    }
    if (!formData.Password) {
      setMessage({ type: 'error', text: 'Veuillez saisir un mot de passe.' });
      return;
    }

    setLoading(true);

    try {
      // Appel API vers le contrôleur AddCuisinier
      const response = await axios.post('http://localhost:5000/Auth/add-cuisinier', {
        Username: formData.Username.trim(),
        Telephone: formData.Telephone ? formData.Telephone.trim() : null,
        Password: formData.Password
      });

      if (response.status === 201) {
        setMessage({ 
          type: 'success', 
          text: `Le cuisinier "${formData.Username}" a été ajouté avec succès !` 
        });

        // Réinitialisation du formulaire et actualisation du compteur
        setFormData({
          Username: '',
          Telephone: '',
          Password: ''
        });
        fetchCuisiniers();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage({ type: 'error', text: error.response.data.message });
      } else {
        setMessage({ type: 'error', text: 'Erreur réseau lors de la création du cuisinier.' });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loader animate-fade-in">
          <img src="/Digiload.svg" alt="loader" width="200" />
        </div>
      </div>
    );
  } 
        
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto pb-10">
        
        {/* En-tête de la page */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[Open_Sans] text-gray-900 tracking-tight">Gestion des cuisiniers</h1>
            <p className="text-gray-500 font-[Open_Sans] text-sm mt-1">
              Ajoutez et gérez les accès de votre équipe en cuisine.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 rounded-full border border-gray-200/50">
            <span className="w-2 h-2 rounded-full bg-[#a35200] animate-pulse"></span>
            <span className="text-xs font-bold font-[Open_Sans] text-gray-700">
              {cuisiniersCount} Cuisinier{cuisiniersCount > 1 ? 's' : ''} actif{cuisiniersCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Carte du Formulaire */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Effet lumineux de fond */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Titre de la carte */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ff7a00] flex items-center justify-center shrink-0 shadow-xs">
                <UserPlus size={24} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold font-[Open_Sans] text-gray-900 leading-tight">
                  Nouveau Cuisinier
                </h2>
                <p className="text-xs text-gray-500 font-[Open_Sans]">
                  Donnez accès à l'écran de gestion des commandes en cuisine.
                </p>
              </div>
            </div>

            {/* Message de succès ou d'erreur */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold font-[Open_Sans] border ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                ) : (
                  <AlertCircle size={18} className="text-red-600 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Champs du Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
              
              {/* 1. Nom d'utilisateur (Username) */}
              <div>
                <label className="block text-xs font-bold font-[Open_Sans] text-gray-700 uppercase tracking-wider mb-2">
                  Nom d'utilisateur (Username) *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <UserSquare2 size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Ex: chef_moussa"
                    value={formData.Username}
                    onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
                    className="w-full bg-[#f8f9fc] border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 text-gray-800 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#ff7a00]/20 focus:border-[#ff7a00] transition-all"
                  />
                </div>
              </div>

              {/* 2. Numéro de téléphone */}
              <div>
                <label className="block text-xs font-bold font-[Open_Sans] text-gray-700 uppercase tracking-wider mb-2">
                  Numéro de téléphone
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Ex: +225 0700000000"
                    value={formData.Telephone}
                    onChange={(e) => setFormData({ ...formData, Telephone: e.target.value })}
                    className="w-full bg-[#f8f9fc] border border-gray-100 rounded-xl py-3.5 pl-12 pr-4 text-gray-800 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#ff7a00]/20 focus:border-[#ff7a00] transition-all"
                  />
                </div>
              </div>

              {/* 3. Mot de passe */}
              <div>
                <label className="block text-xs font-bold font-[Open_Sans] text-gray-700 uppercase tracking-wider mb-2">
                  Mot de passe *
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <Key size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={formData.Password}
                    onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
                    className="w-full bg-[#f8f9fc] border border-gray-100 rounded-xl py-3.5 pl-12 pr-12 text-gray-800 text-sm font-medium placeholder-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-[#ff7a00]/20 focus:border-[#ff7a00] transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Bouton de Soumission */}
              <div className="pt-2 flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => {
                    setFormData({ Username: '', Telephone: '', Password: '' });
                    setMessage({ type: '', text: '' });
                  }}
                  className="px-5 py-3 text-xs font-bold font-[Open_Sans] text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Réinitialiser
                </button>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#a35200] hover:bg-[#8a4400] text-white rounded-xl text-xs font-bold font-[Open_Sans] transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-60"
                >
                  <PlusCircle size={17} strokeWidth={2.5} />
                  {loading ? 'Création en cours...' : 'Ajouter le cuisinier'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
