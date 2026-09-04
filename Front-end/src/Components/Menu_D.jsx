import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Plus, 
  Trash2, 
  Search, 
  UtensilsCrossed, 
  X, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  DollarSign,
  Tag,
  Layers,
  FileText
} from 'lucide-react';

// ==========================================
// 1. LISTE INITIALE PAR DÉFAUT DU MENU
// Utilisée si aucun menu personnalisé n'est encore stocké
// ==========================================
const DEFAULT_MENU_ITEMS = [
  // Burger
  { id: "humberger", name: "Humberger", category: "hamburger", categoryLabel: "Menu Burger", price: 3000, image: "./humberger.jpg", description: "Humberger à la viande hachée et au fromage, sauce spéciale." },
  { id: "cheeseburger", name: "Cheeseburger", category: "hamburger", categoryLabel: "Menu Burger", price: 3000, image: "./Cheeseburger.jpg", description: "Cheeseburger à la viande hachée, double fromage." },
  { id: "burger_poulet", name: "Burger Poulet", category: "hamburger", categoryLabel: "Menu Burger", price: 3000, image: "./Burger-poulet.jpg", description: "Burger au poulet croustillant et salade fraîche." },
  { id: "burger_poisson", name: "Burger Poisson", category: "hamburger", categoryLabel: "Menu Burger", price: 3000, image: "./Berger-poisson.jpg", description: "Burger au filet de poisson pané et sauce tartare." },
  
  // Poulet
  { id: "poulet_roti", name: "Poulet Rôti", category: "poulet", categoryLabel: "Menu Poulet", price: 4000, image: "./P-4.jpg", description: "Poulet rôti à la sauce spéciale accompagné de frites." },
  { id: "poulet_panne", name: "Poulet Pané", category: "poulet", categoryLabel: "Menu Poulet", price: 4000, image: "./P-1.jpg", description: "Morceaux de poulet panés croustillants." },
  { id: "poulet_braise", name: "Poulet Braisé", category: "poulet", categoryLabel: "Menu Poulet", price: 4000, image: "./P-2.jpg", description: "Poulet mariné et braisé au feu de bois." },
  { id: "poulet_dg", name: "Poulet DG", category: "poulet", categoryLabel: "Menu Poulet", price: 4000, image: "./P-3.jpg", description: "Poulet DG traditionnel avec alloco et légumes." },
  
  // Tacos
  { id: "tacos_boeuf", name: "Tacos Boeuf", category: "tacos", categoryLabel: "Menu Tacos", price: 5000, image: "./Tacos.jpg", description: "Tacos garni de viande de boeuf hachée et sauce fromagère." },
  { id: "tacos_poulet", name: "Tacos Mexicain", category: "tacos", categoryLabel: "Menu Tacos", price: 5000, image: "./Tacos-poulet.jpg", description: "Tacos mexicain épicé au poulet." },
  { id: "tacos_poisson", name: "Tacos Poisson", category: "tacos", categoryLabel: "Menu Tacos", price: 5000, image: "./Tacos-poisson.jpg", description: "Tacos garni de poisson pané et sauce fraîche." },
  { id: "tacos_veg", name: "Tacos Végétarien", category: "tacos", categoryLabel: "Menu Tacos", price: 5000, image: "./Tacos-V.jpg", description: "Tacos végétarien aux légumes frais de saison." },
  
  // Viandes & Grillades
  { id: "steack_boeuf", name: "Steak de Boeuf", category: "viande", categoryLabel: "Menu Viande", price: 6000, image: "./St-1.jpg", description: "Steak de boeuf grillé et assaisonné au poivre." },
  { id: "grillade_mouton", name: "Grillade de Mouton", category: "viande", categoryLabel: "Menu Viande", price: 6000, image: "./St-2.jpg", description: "Brochettes de mouton tendres et parfumées." },
  { id: "cotelettes_agneau", name: "Côtelettes d'Agneau", category: "viande", categoryLabel: "Menu Viande", price: 6000, image: "./St-3.jpg", description: "Côtelettes d'agneau grillées à la perfection." },
  { id: "boulettes_boeuf", name: "Boulettes de Boeuf", category: "viande", categoryLabel: "Menu Viande", price: 6000, image: "./St-4.jpg", description: "Boulettes de boeuf savoureuses en sauce." },
  
  // Poissons
  { id: "poisson_braise", name: "Poisson Braisé", category: "poisson", categoryLabel: "Menu Poisson", price: 7000, image: "./Poisson-braisé.jpg", description: "Poisson frais entier braisé avec marinade spéciale." },
  { id: "soupe_poisson", name: "Soupe de Poisson", category: "poisson", categoryLabel: "Menu Poisson", price: 7000, image: "./Soupe-de-poisson.jpg", description: "Soupe de poisson riche et réconfortante." },
  { id: "boulettes_poisson", name: "Boulettes de Poisson", category: "poisson", categoryLabel: "Menu Poisson", price: 7000, image: "./Boullete-de-poisson.jpg", description: "Délicieuses boulettes de poisson faites maison." },
  { id: "saumon_grec", name: "Saumon Grec", category: "poisson", categoryLabel: "Menu Poisson", price: 7000, image: "./saumon-grec.jpg", description: "Pavé de saumon assaisonné aux herbes grecques." },
  
  // Desserts & Gâteaux
  { id: "gateau_chocolat", name: "Gâteau Chocolat", category: "gateau", categoryLabel: "Menu Gâteau", price: 2000, image: "./Gateau-chocolat.jpg", description: "Moelleux au chocolat intense." },
  { id: "gateau_framboise", name: "Gâteau Framboise", category: "gateau", categoryLabel: "Menu Gâteau", price: 2000, image: "./gateau-framboise.jpg", description: "Pâtisserie gourmande aux framboises fraîches." },
  { id: "gateau_fraise", name: "Gâteau Fraise", category: "gateau", categoryLabel: "Menu Gâteau", price: 2000, image: "./Gateau-fraise.jpg", description: "Tarte et génoise aux fraises." },
  { id: "gateau_banane", name: "Gâteau Banane", category: "gateau", categoryLabel: "Menu Gâteau", price: 2000, image: "./Gateau-banane.jpg", description: "Gâteau moelleux à la banane." },

  // Crêpes & Glaces
  { id: "crepe_chocolat", name: "Crêpe au Chocolat", category: "crepe", categoryLabel: "Menu Crêpes", price: 1500, image: "./Crepe-chocolat.jpg", description: "Crêpe fine nappée de sauce chocolat." },
  { id: "crepe_fraise", name: "Crêpe Chocolat Fraise", category: "crepe", categoryLabel: "Menu Crêpes", price: 1500, image: "./Crepe-chocolat fraise.jpg", description: "Crêpe au chocolat accompagnée de fraises." },
  { id: "glace_chocolat", name: "Glace Chocolat", category: "glaces", categoryLabel: "Menu Glaces", price: 1500, image: "./Glace-chocolat.jpg", description: "Coupe de glace crémeuse au chocolat." },
  { id: "glace_fraise", name: "Glace Fraise", category: "glaces", categoryLabel: "Menu Glaces", price: 1500, image: "./Glace fraise.jpg", description: "Coupe de glace rafraîchissante à la fraise." },

  // Boissons
  { id: "coca_cola", name: "Coca Cola", category: "boissons", categoryLabel: "Menu Boissons", price: 500, image: "./Coca cola.jpg", description: "Canette fraîche de Coca Cola." },
  { id: "fanta", name: "Fanta", category: "boissons", categoryLabel: "Menu Boissons", price: 500, image: "./Fanta.jpg", description: "Boisson rafraîchissante à l'orange." },
  { id: "sprite", name: "Sprite", category: "boissons", categoryLabel: "Menu Boissons", price: 500, image: "./Sprite.jpg", description: "Boisson gazeuse citron-lime." },
  { id: "double7", name: "Double Seven", category: "boissons", categoryLabel: "Menu Boissons", price: 500, image: "./Double7.jpg", description: "Boisson énergisante Double Seven." }
];

// Liste des catégories disponibles pour la création d'un plat
const CATEGORIES = [
  { id: 'hamburger', label: 'Menu Burger' },
  { id: 'poulet', label: 'Menu Poulet' },
  { id: 'tacos', label: 'Menu Tacos' },
  { id: 'viande', label: 'Menu Viande' },
  { id: 'poisson', label: 'Menu Poisson' },
  { id: 'gateau', label: 'Menu Gâteau' },
  { id: 'crepe', label: 'Menu Crêpes' },
  { id: 'glaces', label: 'Menu Glaces' },
  { id: 'boissons', label: 'Menu Boissons' }
];

export default function Menu_D() {
  // ==========================================
  // ÉTATS GLOBAUX DU COMPOSANT
  // ==========================================
  const [loady, setloady] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // États pour la modale d'ajout
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'hamburger',
    price: '',
    description: '',
    image: ''
  });
  const [formError, setFormError] = useState('');

  // État pour la confirmation de suppression
  const [itemToDelete, setItemToDelete] = useState(null);

  // ==========================================
  // 1. CHARGEMENT INITIAL (LocalStorage ou défaut)
  // ==========================================
  useEffect(() => {
    // 1. Splash Loader
    const timer = setTimeout(() => {
      setloady(false);
    }, 800);

    // 2. Charger les plats depuis localStorage
    const savedMenu = localStorage.getItem('digimenu_items');
    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu));
      } catch (e) {
        setMenuItems(DEFAULT_MENU_ITEMS);
      }
    } else {
      setMenuItems(DEFAULT_MENU_ITEMS);
      localStorage.setItem('digimenu_items', JSON.stringify(DEFAULT_MENU_ITEMS));
    }

    return () => clearTimeout(timer);
  }, []);

  // Sauvegarder dans localStorage dès que la liste change
  const saveMenuToStorage = (updatedList) => {
    setMenuItems(updatedList);
    localStorage.setItem('digimenu_items', JSON.stringify(updatedList));
  };

  // ==========================================
  // 2. AJOUTER UN NOUVEAU PLAT
  // ==========================================
  const handleAddDish = (e) => {
    e.preventDefault();
    setFormError('');

    // Validation des champs requis
    if (!newDish.name.trim()) {
      setFormError('Veuillez entrer le nom du plat.');
      return;
    }
    if (!newDish.price || parseFloat(newDish.price) <= 0) {
      setFormError('Veuillez entrer un prix valide.');
      return;
    }

    const catObj = CATEGORIES.find(c => c.id === newDish.category);
    const categoryLabel = catObj ? catObj.label : 'Autre';

    // Création de l'objet plat
    const createdDish = {
      id: `dish_${Date.now()}`,
      name: newDish.name.trim(),
      category: newDish.category,
      categoryLabel: categoryLabel,
      price: parseFloat(newDish.price),
      description: newDish.description.trim() || `${newDish.name.trim()} savoureux et fait maison.`,
      image: newDish.image.trim() || './Burger1.jpg' // Image par défaut si non fournie
    };

    // Ajout en début de liste
    const updatedList = [createdDish, ...menuItems];
    saveMenuToStorage(updatedList);

    // Réinitialiser le formulaire et fermer la modale
    setNewDish({
      name: '',
      category: 'hamburger',
      price: '',
      description: '',
      image: ''
    });
    setIsAddModalOpen(false);
  };

  // ==========================================
  // 3. SUPPRIMER UN PLAT
  // ==========================================
  const handleDeleteDish = (dishId) => {
    const updatedList = menuItems.filter(item => item.id !== dishId);
    saveMenuToStorage(updatedList);
    setItemToDelete(null);
  };

  // ==========================================
  // 4. FILTRAGE ET RECHERCHE
  // ==========================================
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
                          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase().trim()));
    return matchesCategory && matchesSearch;
  });

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
      <div className="max-w-6xl mx-auto pb-12">
        
        {/* ========================================== */}
        {/* EN-TÊTE : Titre et Bouton "Nouveau Plat"   */}
        {/* ========================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[Open_Sans] text-gray-900 tracking-tight">Gestion du Menu</h1>
            <p className="text-gray-500 font-[Open_Sans] text-sm mt-1">
              Ajoutez de nouvelles spécialités culinaires ou supprimez des plats de votre carte. ({menuItems.length} plats au total)
            </p>
          </div>
          <div>
            <button 
              onClick={() => {
                setFormError('');
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-[#a35200] hover:bg-[#8a4400] text-white rounded-xl text-xs font-bold font-[Open_Sans] transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <Plus size={18} strokeWidth={2.5} />
              Nouveau Plat
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* BARRE DE RECHERCHE ET FILTRES CATÉGORIES  */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Recherche */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un plat dans le menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a35200]/20 focus:border-[#a35200] transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtres Catégories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              Tous ({menuItems.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = menuItems.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* ========================================== */}
        {/* GRILLE DES PLATS DU MENU                  */}
        {/* ========================================== */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image du plat */}
                  <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {dish.categoryLabel || dish.category}
                      </span>
                    </div>
                  </div>

                  {/* Détails du plat */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-bold font-[Open_Sans] text-sm text-gray-900 line-clamp-1">
                        {dish.name}
                      </h3>
                      <span className="font-extrabold text-sm text-[#a35200] shrink-0 font-[Open_Sans]">
                        {parseFloat(dish.price).toFixed(0)} FCFA
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Bouton de Suppression */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => setItemToDelete(dish)}
                    className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl border border-red-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    Supprimer du menu
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Aucun plat trouvé */
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs">
            <UtensilsCrossed size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-bold text-gray-700">Aucun plat dans cette catégorie</p>
            <p className="text-xs text-gray-400 mt-1">
              {searchTerm ? "Aucun plat ne correspond à votre recherche." : "Cliquez sur 'Nouveau Plat' pour en ajouter un."}
            </p>
          </div>
        )}

      </div>

      {/* ========================================== */}
      {/* MODALE : FORMULAIRE D'AJOUT D'UN PLAT     */}
      {/* ========================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            
            {/* Bouton Fermer */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold font-[Open_Sans] text-gray-900">
                Ajouter un nouveau plat
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Renseignez les détails du plat pour l'ajouter instantanément au menu.
              </p>
            </div>

            {/* Message d'erreur si validation échoue */}
            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddDish} className="space-y-4">
              
              {/* Nom du plat */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Nom du plat *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Burger Spécial Maison"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a35200]/20 focus:border-[#a35200]"
                />
              </div>

              {/* Catégorie et Prix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Catégorie */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Catégorie *
                  </label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a35200]/20 focus:border-[#a35200] cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prix en FCFA */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Ex: 3500"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a35200]/20 focus:border-[#a35200]"
                  />
                </div>
              </div>

              {/* Image : Importation depuis l'ordinateur ou URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Photo du plat
                </label>

                {/* Zone d'importation depuis l'ordinateur */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Prévisualisation */}
                  {newDish.image ? (
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#a35200] shrink-0 bg-gray-100 shadow-sm">
                      <img 
                        src={newDish.image} 
                        alt="Aperçu" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewDish({ ...newDish, image: '' })}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-0.5 hover:bg-black"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full sm:w-auto flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 hover:border-[#a35200] rounded-2xl cursor-pointer bg-gray-50/70 hover:bg-gray-100/50 transition-colors">
                      <ImageIcon size={24} className="text-gray-400 mb-1.5" />
                      <span className="text-xs font-bold text-gray-700">Choisir une image depuis l'ordinateur</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, JPEG ou WEBP</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewDish({ ...newDish, image: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Option alternative : Saisie manuelle d'URL ou chemin local */}
                <div className="mt-2.5">
                  <input
                    type="text"
                    placeholder="Ou collez un chemin local (ex: ./Burger1.jpg) ou une URL..."
                    value={typeof newDish.image === 'string' && newDish.image.startsWith('data:') ? '' : newDish.image}
                    onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a35200]/20 focus:border-[#a35200]"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {newDish.image ? 'Image chargée avec succès.' : 'Si aucune image n\'est choisie, une image par défaut sera appliquée.'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Ex: Pain brioché, steak haché grillé, cheddar fondu, sauce secrète..."
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a35200]/20 focus:border-[#a35200] resize-none"
                ></textarea>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#a35200] hover:bg-[#8a4400] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Ajouter au Menu
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODALE DE CONFIRMATION DE SUPPRESSION     */}
      {/* ========================================== */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setItemToDelete(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Trash2 size={24} />
            </div>

            <h3 className="text-lg font-bold font-[Open_Sans] text-gray-900 mb-2">
              Supprimer "{itemToDelete.name}" ?
            </h3>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Êtes-vous certain de vouloir retirer ce plat du menu ? Cette action est irréversible.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteDish(itemToDelete.id)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
