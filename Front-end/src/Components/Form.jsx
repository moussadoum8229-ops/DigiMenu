import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Form() {
  const navigate = useNavigate()
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
          navigate('/Admin')
        } else {
          navigate('/cuisine')
        }
      }
    }
    catch(error){
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("les données saisies sont fausses, utilisateur inconnu");
      }
    } finally {
      setIsLoading(false);
    }
   
  }

  return (
    <div className="relative min-h-screen w-full bg-[url('/Bg-2.jpg')] bg-cover bg-center flex items-center justify-center overflow-hidden p-4 font-sans">
      {/* Overlay gradient élégant et sombre pour un contraste optimal */}
      <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/60 to-black/90 z-0"></div>
      
      {/* Effets de lueur d'ambiance moderne (glow) */}
      <div className="absolute top-10 left-10 w-85 h-85 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Bouton retour accueil */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-white text-sm font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:translate-x-[-2px]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour
      </motion.button>

      {/* Formulaire Principal de Connexion */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section Logo & Titre */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/30 flex items-center justify-center shadow-lg transition-transform duration-500 hover:rotate-6 hover:scale-105">
              <img
                src="/Logo.jpeg"
                className="w-full h-full object-cover rounded-full"
                alt="DigiMenu Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./Logo.jpeg";
                }}
              />
            </div>
            <h1 className="text-3xl font-extrabold text-center text-white mt-4 tracking-tight drop-shadow-md">
              DigiMenu
            </h1>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mt-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Espace Cuisine
            </p>
          </motion.div>

          {/* Messages d'erreur */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-200 text-sm py-2.5 px-4 rounded-xl text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Champ Utilisateur */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200 tracking-wide">
              Nom d'utilisateur
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre nom d'utilisateur"
                className="w-full pl-12 pr-4 py-3.5 bg-black/35 hover:bg-black/45 focus:bg-black/50 text-white rounded-2xl border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 placeholder-gray-500 text-sm cursor-text"
              />
            </div>
          </div>

          {/* Champ Mot de Passe */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-200 tracking-wide">
              Mot de passe
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full pl-12 pr-4 py-3.5 bg-black/35 hover:bg-black/45 focus:bg-black/50 text-white rounded-2xl border border-white/10 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 placeholder-gray-500 text-sm cursor-text"
              />
            </div>
          </div>

          {/* Bouton de Connexion */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-12 flex items-center justify-center bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-3.5 rounded-2xl font-bold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2">
                  Se connecter
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  )
}
