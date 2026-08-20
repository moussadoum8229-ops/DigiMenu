import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Form() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/Auth', {
        username,
        password,
      });
      if (response.data.message === 'success') {
        if (response.data.role === 'admin') {
          if (response.data.adminName) {
            localStorage.setItem('adminName', response.data.adminName);
          }
          navigate('/Dashboard')
        } else {
          navigate('/cuisine')
        }
      }
    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("les données saisies sont fausses, utilisateur inconnu");
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loader">
          <img src="/Digiload.svg" alt="loader" width="200" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center p-4 font-sans">

      {/* Bouton retour accueil */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-full border border-gray-200 transition-all duration-300 cursor-pointer shadow-sm"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour
      </motion.button>

      {/* Container Principal Split Screen */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-11/12 md:w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-100 min-h-137.5"
      >
        {/* Partie gauche : Image Burger */}
        <div className="hidden md:block md:w-1/2 relative bg-[#d61c1c]">
          <img
            src="/Burger1.jpg"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Partie droite : Formulaire */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Logo & Sous-titres */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/DiguiMenu.png"
                className="h-16 object-contain mb-4"
                alt="DigiMenu Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./Logo.jpeg";
                }}
              />
              <h2 className=" text-sm sm:text-xl font-bold text-gray-800 tracking-tight">
                Connectez-vous pour accéder à votre espace.
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Votre restaurant, vos commandes, votre contrôle.
              </p>
            </div>

            {/* Messages d'erreur */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm py-3 px-4 rounded-full text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Champ Utilisateur */}
            <div className="space-y-1">
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nom d'utilisateur"
                  className="w-full pl-14 pr-6 py-4 bg-gray-100 hover:bg-gray-200/70 focus:bg-white text-gray-800 rounded-full border border-transparent focus:border-orange-500 focus:outline-none transition-all duration-300 placeholder-gray-500 font-medium text-sm shadow-inner"
                />
              </div>
            </div>

            {/* Champ Mot de Passe */}
            <div className="space-y-1">
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9.5v3M12 14.5h.01" />
                  </svg>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de Passe"
                  className="w-full pl-14 pr-6 py-4 bg-gray-100 hover:bg-gray-200/70 focus:bg-white text-gray-800 rounded-full border border-transparent focus:border-orange-500 focus:outline-none transition-all duration-300 placeholder-gray-500 font-medium text-sm shadow-inner"
                />
              </div>
            </div>

            {/* Bouton de Connexion */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#ff8c00] hover:bg-[#e07b00] text-white rounded-full font-bold transition-all duration-300 cursor-pointer shadow-md hover:shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-center text-sm tracking-wide"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Connexion"
                )}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  )
}
