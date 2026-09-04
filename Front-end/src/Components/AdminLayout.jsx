import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Utensils, 
  ChefHat, 
  Users, 
  LogOut,
  Search,
  Bell,
  User
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Commandes', path: '/commandes-d', icon: ShoppingCart },
    { name: 'Menu', path: '/menu-d', icon: Utensils },
    { name: 'Cuisiniers', path: '/cuisiniers-d', icon: ChefHat },
    { name: 'Administrateurs', path: '/administrateurs-d', icon: Users },
  ];

  const [adminName, setAdminName] = useState('Administrateur');

  useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Nettoyer les informations de session admin
    localStorage.removeItem('adminName');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    
    // Rediriger vers la page d'accueil ou de connexion
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center justify-center border-b border-gray-50">
            {/* Logo from public directory */}
            <img src="/DiguiMenu.png" alt="DigiMenu" className="h-25 object-contain" onError={(e) => {
               e.target.onerror = null; 
               e.target.src = "https://via.placeholder.com/150x50?text=DigiMenu";
            }} />
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-[#ff7a00] text-white shadow-sm'
                      : 'text-gray-500 hover:bg-orange-50 hover:text-[#ff7a00]'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-700 w-full rounded-lg transition-colors text-sm font-medium cursor-pointer"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          {/* Search */}
          <div className="flex items-center text-gray-400">
            <Search size={20} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="ml-3 outline-none bg-transparent text-gray-700 w-64 placeholder-gray-400 text-sm"
            />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-6">
            
            <div className="w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-[Open_Sans]  text-gray-800">{adminName}</p>
                <p className="text-xs font-[Open_Sans]  text-gray-500">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#a35200] flex items-center justify-center text-white font-[Open_Sans] ">
                {adminName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
