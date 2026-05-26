import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

export default function Commande() {
  const { cart, addToCart, removeFromCart, clearCart, getCartCount, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  // Options de commande
  const [orderType, setOrderType] = useState('sur_place'); // 'sur_place' ou 'livraison'
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const cartItems = Object.values(cart);
  const subtotal = getCartTotal();
  const serviceFee = orderType === 'livraison' ? 1000 : 0;
  const total = subtotal + serviceFee;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    const itemsData = cartItems.map(item => ({
      itemId: item.itemId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image
    }));

    const orderData = {
      order_type: orderType,
      table_number: orderType === 'sur_place' ? tableNumber : null,
      delivery_address: orderType === 'livraison' ? deliveryAddress : null,
      phone_number: orderType === 'livraison' ? phoneNumber : null,
      items: itemsData,
      total: total
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        alert("Erreur: " + (errorData.message || "Impossible d'enregistrer la commande"));
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi de la commande :", err);
      alert("Erreur de connexion avec le serveur. Veuillez réessayer.");
    }
  };

  const handleConfirmOrder = () => {
    clearCart();
    setShowSuccessModal(false);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* En-tête Sticky avec effet Glassmorphism */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Bouton Retour */}
            <div className="flex items-center">
              <Link to="/menu" className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300 group flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline text-sm font-semibold text-gray-700 group-hover:text-black">Menu</span>
              </Link>
            </div>

            {/* Titre de la page */}
            <div className="shrink-0 flex items-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400 tracking-wider">
                Votre Commande
              </h1>
            </div>

            {/* Badge d'articles */}
            <div className="flex items-center">
              <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
                {getCartCount()} {getCartCount() > 1 ? 'articles' : 'article'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Corps Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cartItems.length === 0 ? (
          /* ================= ÉTAT PANIER VIDE ================= */
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-xs">
              <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 text-sm max-w-sm mb-8">
              Vous n'avez pas encore ajouté de plat à votre commande. Laissez-vous tenter par nos savoureuses créations culinaires !
            </p>
            <Link to="/menu">
              <button className="btn btn-primary rounded-3xl bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none text-white px-8 py-3 h-12 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Découvrir le Menu
              </button>
            </Link>
          </div>
        ) : (
          /* ================= ÉTAT PANIER ACTIF ================= */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Liste des plats (2/3 de large sur écran large) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2 pl-1">Vos sélections</h3>
              
              {cartItems.map((item) => (
                <div 
                  key={item.itemId} 
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center transition-all duration-300 hover:shadow-md hover:border-orange-100"
                >
                  {/* Image du plat avec effet zoom */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow-inner">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80"; // Image de secours moderne
                      }}
                    />
                  </div>

                  {/* Détails du plat */}
                  <div className="grow text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 capitalize leading-snug">{item.name}</h4>
                        <p className="text-gray-400 text-xs mt-1 max-w-md line-clamp-2">{item.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-semibold text-gray-400 block">{item.price} XOF <span className="text-xs">/ u</span></span>
                      </div>
                    </div>

                    {/* Actions de quantité et retrait sur la carte */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-gray-50">
                      {/* Contrôles de quantité */}
                      <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-1 border border-gray-100 mx-auto sm:mx-0">
                        <button 
                          onClick={() => removeFromCart(item.itemId, 1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-orange-500 hover:text-white flex items-center justify-center font-bold text-gray-600 transition-colors shadow-xs"
                          type="button"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-gray-800 text-sm">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => addToCart(item, 1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-emerald-500 hover:text-white flex items-center justify-center font-bold text-gray-600 transition-colors shadow-xs"
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      {/* Prix Total Plat et Corbeille */}
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className="text-xs text-gray-400 block">Total</span>
                          <span className="text-base font-extrabold text-gray-800">{item.price * item.quantity} XOF</span>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.itemId, 0, true)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer group"
                          title="Retirer ce plat de la commande"
                          type="button"
                        >
                          <svg className="w-5 h-5 group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bouton de nettoyage rapide */}
              <div className="flex justify-end pt-2">
                <button 
                  onClick={clearCart}
                  className="btn btn-ghost hover:bg-red-50 hover:text-red-600 text-xs font-bold text-gray-400 rounded-xl flex items-center gap-2 px-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Vider le panier
                </button>
              </div>
            </div>

            {/* Formulaire & Résumé Financier (1/3 de large) */}
            <div className="space-y-6">
              
              {/* Type de commande */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Mode de service</h3>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                  <button
                    onClick={() => setOrderType('sur_place')}
                    className={`py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${orderType === 'sur_place' ? 'bg-white text-orange-600 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
                    type="button"
                  >
                    Sur place
                  </button>
                  <button
                    onClick={() => setOrderType('livraison')}
                    className={`py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${orderType === 'livraison' ? 'bg-white text-orange-600 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
                    type="button"
                  >
                    Livraison
                  </button>
                </div>

                {/* Formulaire conditionnel */}
                <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4">
                  {orderType === 'sur_place' ? (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Numéro de table</label>
                      <input 
                        type="number" 
                        required
                        placeholder="Ex: 5" 
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-orange-200 outline-hidden font-semibold transition-all"
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Adresse de livraison</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Quartier Hippodrome, Rue 12" 
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-orange-200 outline-hidden font-semibold transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Téléphone</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="Ex: +223 70 00 00 00" 
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-orange-200 outline-hidden font-semibold transition-all"
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Ticket financier */}
                  <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100/30 mt-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Sous-total</span>
                      <span className="font-semibold text-gray-800">{subtotal} XOF</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{orderType === 'livraison' ? 'Frais de livraison' : 'Frais de service'}</span>
                      <span className="font-semibold text-gray-800">{serviceFee > 0 ? `${serviceFee} XOF` : 'Gratuit'}</span>
                    </div>
                    <hr className="border-orange-100/50 my-1" />
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-gray-800">Total Général</span>
                      <span className="text-xl font-extrabold text-orange-600">{total} XOF</span>
                    </div>
                  </div>

                  {/* Bouton de confirmation principal */}
                  <button 
                    type="submit"
                    className="w-full mt-4 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-none text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirmer ma commande
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* ================= MODAL DE SUCCESS PREMIUM ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-gray-100 relative overflow-hidden animate-scale-up">
            
            {/* Décoration d'arrière plan */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">Commande Enregistrée !</h3>
            
            {orderType === 'sur_place' ? (
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Votre commande pour la <span className="font-bold text-gray-800">table n°{tableNumber}</span> a bien été envoyée en cuisine. Nos chefs s'activent pour préparer vos délices !
              </p>
            ) : (
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Votre commande a bien été enregistrée et sera livrée à l'adresse suivante : <br />
                <span className="font-bold text-gray-700 italic block mt-1">"{deliveryAddress}"</span>
                Notre livreur vous contactera très rapidement au <span className="font-bold text-gray-800">{phoneNumber}</span>.
              </p>
            )}

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100 text-left">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <span>Détail Payé</span>
                <span>Montant</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-gray-800">
                <span>{getCartCount()} {getCartCount() > 1 ? 'Articles' : 'Article'}</span>
                <span className="text-emerald-600">{total} XOF</span>
              </div>
            </div>

            <button 
              onClick={handleConfirmOrder}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              C'est noté, merci !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}