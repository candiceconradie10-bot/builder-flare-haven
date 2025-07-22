import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
  ChevronDown,
  Sparkles,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state } = useCart();
  const { state: authState, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserMenu, activeDropdown]);

  const mainNavItems = [
    {
      name: "Clothing",
      href: "/corporate-gifts",
      badge: "Popular",
      items: [
        "T-Shirts",
        "Golf Shirts",
        "Jackets",
        "Hoodies",
        "Kids Clothing",
        "Tracksuits",
        "Pants & Shoes",
        "Body Warmers",
        "Sweaters",
      ],
    },
    {
      name: "Workwear",
      href: "/corporate-clothing",
      items: [
        "Accessories",
        "Bottoms",
        "Contis",
        "Headwear",
        "HI-VIZ",
        "Hospitality",
        "Rainwear",
        "Security Wear",
        "Tops",
        "Warmwear",
        "Work Jackets & Pants",
      ],
    },
    {
      name: "Headwear",
      href: "/workwear",
      items: ["Caps", "Beanies", "Hats", "Gloves", "Scarves", "Headwear Sets"],
    },
    {
      name: "Safety Gear",
      href: "/headwear-and-accessories",
      items: [
        "Hard Hats",
        "Gloves",
        "Respiratory Protection",
        "Footwear",
        "Safety Class",
        "Safety Vests",
        "Hearing Protection",
        "Barricade Tape",
      ],
    },
    {
      name: "Gifting",
      href: "/gifting",
      items: ["Corporate Gifts", "Executive Sets", "Gift Hampers"],
    },
    {
      name: "Display",
      href: "/display",
      items: ["Banners", "Pop-ups", "Exhibition"],
    },
    {
      name: "Footwear",
      href: "/footwear",
      items: ["Safety Boots", "Corporate Shoes"],
    },
    {
      name: "Custom Products",
      href: "/custom-products",
      badge: "Hot",
      items: ["Laser Engraving", "Embroidery", "Screen Printing"],
    },
  ];

  return (
    <>
      {/* Mobile-Optimized Top Bar */}
      <div className="relative bg-gradient-to-r from-brand-red via-red-500 to-brand-red text-white py-4 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

        <div className="container mx-auto flex justify-between items-center text-sm md:text-base relative z-10">
          <div className="flex items-center space-x-4 md:space-x-8">
            <a href="tel:+27760355295" className="flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <Phone className="h-4 w-4 md:h-3 md:w-3" />
              </div>
              <span className="font-bold text-sm md:text-base group-hover:text-yellow-300 transition-colors duration-300">
                +27 76 035 5295
              </span>
            </a>
            <a href="mailto:apex@w-o-s.co.za" className="hidden sm:flex items-center space-x-2 group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <Mail className="h-4 w-4 md:h-3 md:w-3" />
              </div>
              <span className="group-hover:text-yellow-300 transition-colors duration-300">
                apex@w-o-s.co.za
              </span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/track-order"
              className="group relative font-bold text-sm md:text-base transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 group-hover:text-yellow-300 transition-colors duration-300">
                Track Order
              </span>
              <div className="absolute inset-0 bg-yellow-300/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile-First Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-2xl border-b border-white/20 shadow-2xl shadow-brand-red/10"
            : "bg-black/80 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-red-600/5"></div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile-Optimized Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative touch-manipulation">
              <div className="relative">
                {/* Simplified mobile-friendly glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-red/30 to-red-600/30 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-all duration-300"></div>

                {/* Logo container - larger touch target */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-2 border border-white/20 group-hover:border-brand-red/40 transition-all duration-300">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2F4c5596c02a2a464091eb5609bcf49187"
                    alt="APEX Logo"
                    className="h-12 lg:h-16 w-auto object-contain group-hover:scale-105 transition-all duration-300 filter group-hover:brightness-110"
                  />
                </div>
              </div>
            </Link>

            {/* Mobile-First Search Bar */}
            <div className="flex-1 max-w-md lg:max-w-2xl mx-4 lg:mx-8">
              <div className="relative w-full group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-4 lg:pl-6 pr-12 lg:pr-14 py-3 lg:py-4 bg-white/10 backdrop-blur-md border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:border-brand-red/50 transition-all duration-300 text-base lg:text-lg touch-manipulation"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red rounded-lg px-3 lg:px-4 py-2 lg:py-2 shadow-lg hover:shadow-red-500/25 transition-all duration-300 touch-manipulation"
                  >
                    <Search className="h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile-Optimized Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Quick Actions - Always Visible */}
              <div className="flex items-center space-x-2 lg:space-x-4">
                {authState.isAuthenticated ? (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium"
                    >
                      <User className="h-5 w-5 mr-2" />
                      {authState.user?.firstName || "Account"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
                        <div className="p-4 border-b border-white/10">
                          <div className="text-white font-medium">
                            {authState.user?.firstName}{" "}
                            {authState.user?.lastName}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {authState.user?.email}
                          </div>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center w-full px-4 py-3 text-white/80 hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="h-4 w-4 mr-3" />
                            Profile Settings
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center w-full px-4 py-3 text-white/80 hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Package className="h-4 w-4 mr-3" />
                            My Orders
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/auth">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl p-3 lg:px-4 lg:py-2 font-medium relative touch-manipulation"
                >
                  <Heart className="h-5 w-5 lg:mr-2" />
                  <span className="hidden lg:inline">Wishlist</span>
                </Button>
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl p-3 lg:px-4 lg:py-2 font-medium relative group touch-manipulation"
                  >
                    <ShoppingCart className="h-6 w-6 lg:h-5 lg:w-5 lg:mr-2" />
                    <span className="hidden lg:inline">Cart</span>
                    {state.itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-gradient-to-r from-brand-red to-red-600 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform duration-200 font-bold">
                        {state.itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button - Super User Friendly */}
              <Button
                variant="ghost"
                size="lg"
                className="lg:hidden text-white hover:bg-white/10 rounded-xl p-4 transition-all duration-300 touch-manipulation active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-7 h-7">
                  <Menu
                    className={`h-7 w-7 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`h-7 w-7 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "-rotate-90 opacity-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Enhanced Navigation Menu - Desktop */}
          <nav className="hidden lg:block border-t border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-8 py-4">
              {mainNavItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center space-x-2 text-white/90 hover:text-brand-red font-medium whitespace-nowrap transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/5 group-hover:scale-105"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge
                        className={`text-xs ${
                          item.badge === "New"
                            ? "bg-green-500"
                            : item.badge === "Hot"
                              ? "bg-orange-500"
                              : "bg-brand-red"
                        } text-white border-0`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.items && activeDropdown === item.name && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
                      <div className="p-4 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem}
                            to={`${item.href}?category=${subItem.toLowerCase().replace(" ", "-")}`}
                            className="block px-4 py-3 text-white/80 hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-200 font-medium"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-xl border-l border-white/20 transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 space-y-6">
            {/* Mobile Search */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-6 pr-14 py-4 bg-white/10 backdrop-blur-md border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:border-brand-red/50 transition-all duration-300 text-lg"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 rounded-lg px-4 py-2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Actions - Enhanced for Touch */}
            <div className="grid grid-cols-2 gap-4">
              {authState.isAuthenticated ? (
                <>
                  <div className="col-span-2">
                    <div className="text-center text-white p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20">
                      <div className="font-bold text-lg mb-2">
                        {authState.user?.firstName} {authState.user?.lastName}
                      </div>
                      <div className="text-gray-300 text-sm mb-4">
                        {authState.user?.email}
                      </div>
                      <Button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="ghost"
                        className="w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl py-3 transition-all duration-300 touch-manipulation active:scale-95 font-medium"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2">
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center space-x-3 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl py-6 transition-all duration-300 touch-manipulation active:scale-95 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md border border-white/20"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-lg font-bold">Sign In / Register</span>
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                className="flex items-center justify-center space-x-3 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl py-6 transition-all duration-300 touch-manipulation active:scale-95 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md border border-white/20"
              >
                <Heart className="h-7 w-7" />
                <span className="text-base font-bold">Wishlist</span>
              </Button>

              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center space-x-3 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl py-6 transition-all duration-300 relative touch-manipulation active:scale-95 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md border border-white/20"
                >
                  <ShoppingCart className="h-7 w-7" />
                  <span className="text-base font-bold">Cart</span>
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-red to-red-600 text-white text-sm rounded-full h-7 w-7 flex items-center justify-center border-2 border-black font-bold">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation - Super User Friendly */}
            <nav className="space-y-4">
              {mainNavItems.map((item) => (
                <div key={item.name} className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                  <Link
                    to={item.href}
                    className="flex items-center justify-between w-full p-6 text-white hover:text-brand-red hover:bg-white/10 transition-all duration-300 font-bold text-lg touch-manipulation active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge
                          className={`text-sm px-3 py-1 ${
                            item.badge === "New"
                              ? "bg-green-500"
                              : item.badge === "Hot"
                                ? "bg-orange-500"
                                : "bg-brand-red"
                          } text-white border-0 rounded-full font-bold`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className="h-6 w-6" />
                  </Link>
                  {item.items && (
                    <div className="bg-black/20 px-4 pb-4">
                      <div className="space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem}
                            to={`${item.href}?category=${subItem.toLowerCase().replace(" ", "-")}`}
                            className="block p-4 text-white/90 hover:text-brand-red hover:bg-white/10 rounded-xl transition-all duration-200 font-medium text-base touch-manipulation active:scale-95"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 backdrop-blur-md rounded-2xl p-6 border border-brand-red/30 mt-6">
              <h3 className="text-white font-bold text-lg mb-4 text-center">Need Help?</h3>
              <div className="space-y-3">
                <a href="tel:+27760355295" className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-colors duration-300 p-4 rounded-xl hover:bg-white/10 touch-manipulation active:scale-95">
                  <Phone className="h-6 w-6" />
                  <span className="font-bold text-lg">+27 76 035 5295</span>
                </a>
                <a href="mailto:apex@w-o-s.co.za" className="flex items-center space-x-3 text-white hover:text-yellow-300 transition-colors duration-300 p-4 rounded-xl hover:bg-white/10 touch-manipulation active:scale-95">
                  <Mail className="h-6 w-6" />
                  <span className="font-bold text-lg">apex@w-o-s.co.za</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
