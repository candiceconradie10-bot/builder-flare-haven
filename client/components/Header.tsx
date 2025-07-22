import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { OptimizedImage } from "./OptimizedImage";
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

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    setIsScrolled(scrollTop > 50);
  }, []);

  // Optimized click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('[data-dropdown]') && !target.closest('[data-user-menu]')) {
      setActiveDropdown(null);
      setShowUserMenu(false);
    }
  }, []);

  // Optimized scroll effect with throttling
  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

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
      {/* Stunning Mobile-First Top Bar */}
      <div className="relative bg-gradient-to-r from-brand-red via-red-500 to-brand-red text-white py-3 md:py-4 px-4 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer"></div>

        {/* Mobile-optimized floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto flex justify-between items-center text-sm md:text-base relative z-10">
          <div className="flex items-center space-x-3 md:space-x-8">
            <a
              href="tel:+27760355295"
              className="flex items-center space-x-2 group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
            >
              <div className="p-2 md:p-2 rounded-xl bg-white/20 group-hover:bg-white/30 group-active:bg-white/40 transition-all duration-300 shadow-lg">
                <Phone className="h-4 w-4 md:h-3 md:w-3 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-bold text-sm md:text-base group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-sm">
                +27 76 035 5295
              </span>
            </a>
            <a
              href="mailto:apex@w-o-s.co.za"
              className="hidden sm:flex items-center space-x-2 group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
            >
              <div className="p-2 md:p-2 rounded-xl bg-white/20 group-hover:bg-white/30 group-active:bg-white/40 transition-all duration-300 shadow-lg">
                <Mail className="h-4 w-4 md:h-3 md:w-3 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-sm">
                apex@w-o-s.co.za
              </span>
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/track-order"
              className="group relative font-bold text-sm md:text-base transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
            >
              <span className="relative z-10 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-sm px-3 py-2">
                Track Order
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Stunning Mobile-First Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/98 backdrop-blur-3xl border-b border-white/30 shadow-2xl shadow-brand-red/20"
            : "bg-black/85 backdrop-blur-2xl border-b border-white/15"
        }`}
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/8 via-transparent to-red-600/8"></div>

        {/* Subtle mobile-friendly glow effect */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isScrolled ? "opacity-100" : "opacity-50"
          } bg-gradient-to-b from-brand-red/5 to-transparent`}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between h-20 md:h-22 lg:h-24">
            {/* Stunning Mobile-Optimized Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group relative touch-manipulation"
            >
              <div className="relative">
                {/* Enhanced mobile-friendly glow with multiple layers */}
                <div className="absolute -inset-3 bg-gradient-to-br from-brand-red/40 via-red-500/30 to-red-600/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 group-active:opacity-70 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-red/30 to-red-600/30 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-all duration-300"></div>

                {/* Premium logo container with enhanced touch target */}
                <div className="relative bg-gradient-to-br from-white/8 to-white/12 backdrop-blur-md rounded-2xl p-4 lg:p-3 border border-white/25 group-hover:border-brand-red/50 group-active:border-brand-red/70 transition-all duration-300 shadow-2xl">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2F4c5596c02a2a464091eb5609bcf49187"
                    alt="APEX Logo"
                    className="h-14 md:h-16 lg:h-18 w-auto object-contain group-hover:scale-105 group-active:scale-95 transition-all duration-300 filter group-hover:brightness-110 drop-shadow-lg"
                  />
                </div>

                {/* Subtle shine effect for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-2xl"></div>
              </div>
            </Link>

            {/* Stunning Mobile-First Search Bar */}
            <div className="flex-1 max-w-md lg:max-w-2xl mx-3 lg:mx-8">
              <div className="relative w-full group">
                {/* Enhanced glow effects */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 to-red-600/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-5 lg:pl-6 pr-14 lg:pr-16 py-4 lg:py-5 bg-white/12 backdrop-blur-lg border-white/25 rounded-2xl text-white placeholder-white/70 focus:bg-white/20 focus:border-brand-red/60 transition-all duration-300 text-base lg:text-lg touch-manipulation shadow-xl hover:shadow-2xl focus:shadow-2xl focus:shadow-brand-red/20"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red active:scale-95 rounded-xl px-4 lg:px-5 py-3 lg:py-3 shadow-xl hover:shadow-red-500/30 transition-all duration-300 touch-manipulation border border-red-400/20"
                  >
                    <Search className="h-5 w-5 lg:h-5 lg:w-5" />
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
        {/* Enhanced Backdrop with Stunning Effects */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90 backdrop-blur-xl transition-all duration-700 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-brand-red/30 rounded-full transition-all duration-1000 ${
                  isMobileMenuOpen ? "animate-float opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Stunning Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-br from-black/98 via-gray-900/95 to-black/98 backdrop-blur-2xl border-l border-white/30 transition-all duration-700 ease-out shadow-2xl shadow-brand-red/10 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 via-transparent to-red-600/5 pointer-events-none"></div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div className="p-6 space-y-8 relative z-10">
            {/* Stunning Mobile Search */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/40 to-red-600/40 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-2xl blur-sm opacity-50 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-6 pr-16 py-5 bg-white/15 backdrop-blur-lg border-white/30 rounded-2xl text-white placeholder-white/70 focus:bg-white/25 focus:border-brand-red/60 transition-all duration-300 text-lg font-medium shadow-2xl focus:shadow-brand-red/20"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red active:scale-95 rounded-xl px-4 py-3 shadow-xl transition-all duration-300"
                >
                  <Search className="h-5 w-5" />
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
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="col-span-2"
                >
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-center space-x-3 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl py-6 transition-all duration-300 touch-manipulation active:scale-95 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md border border-white/20"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-lg font-bold">
                      Sign In / Register
                    </span>
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                className="flex items-center justify-center space-x-3 text-white hover:bg-gradient-to-r hover:from-brand-red/20 hover:to-red-600/20 hover:text-white rounded-2xl py-6 transition-all duration-300 touch-manipulation active:scale-95 bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-lg border border-white/25 shadow-xl hover:shadow-2xl hover:border-brand-red/40"
              >
                <Heart className="h-7 w-7 transition-transform duration-300 hover:scale-110" />
                <span className="text-base font-bold">Wishlist</span>
              </Button>

              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center space-x-3 text-white hover:bg-gradient-to-r hover:from-brand-red/20 hover:to-red-600/20 hover:text-white rounded-2xl py-6 transition-all duration-300 relative touch-manipulation active:scale-95 bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-lg border border-white/25 shadow-xl hover:shadow-2xl hover:border-brand-red/40"
                >
                  <ShoppingCart className="h-7 w-7 transition-transform duration-300 hover:scale-110" />
                  <span className="text-base font-bold">Cart</span>
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-red to-red-600 text-white text-sm rounded-full h-8 w-8 flex items-center justify-center border-2 border-black font-bold shadow-lg animate-pulse">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Stunning Mobile Navigation */}
            <nav className="space-y-4">
              {mainNavItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`group bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-lg rounded-3xl border border-white/25 overflow-hidden shadow-2xl hover:shadow-brand-red/20 transition-all duration-500 ${
                    isMobileMenuOpen
                      ? "animate-fadeInUp opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center justify-between w-full p-6 text-white hover:text-white hover:bg-gradient-to-r hover:from-brand-red/20 hover:to-red-600/20 transition-all duration-300 font-bold text-lg touch-manipulation active:scale-95 group-hover:shadow-inner"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="group-hover:text-brand-red transition-colors duration-300">
                        {item.name}
                      </span>
                      {item.badge && (
                        <Badge
                          className={`text-sm px-4 py-2 ${
                            item.badge === "New"
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
                              : item.badge === "Hot"
                                ? "bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/30"
                                : "bg-gradient-to-r from-brand-red to-red-600 shadow-lg shadow-red-500/30"
                          } text-white border-0 rounded-full font-bold animate-pulse`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className="h-6 w-6 group-hover:rotate-180 group-hover:text-brand-red transition-all duration-300" />
                  </Link>
                  {item.items && (
                    <div className="bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-sm px-4 pb-4">
                      <div className="grid grid-cols-1 gap-2">
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subItem}
                            to={`${item.href}?category=${subItem.toLowerCase().replace(" ", "-")}`}
                            className={`block p-4 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-brand-red/15 hover:to-red-600/15 rounded-2xl transition-all duration-300 font-medium text-base touch-manipulation active:scale-95 border border-transparent hover:border-brand-red/30 shadow-lg hover:shadow-xl ${
                              isMobileMenuOpen
                                ? "animate-fadeInUp opacity-100"
                                : "opacity-0"
                            }`}
                            style={{
                              animationDelay: `${index * 100 + subIndex * 50 + 200}ms`,
                              animationFillMode: "forwards",
                            }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <span>{subItem}</span>
                              <div className="w-2 h-2 bg-brand-red/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Stunning Mobile Contact Info */}
            <div
              className={`bg-gradient-to-br from-brand-red/25 via-red-600/20 to-brand-red/25 backdrop-blur-lg rounded-3xl p-6 border border-brand-red/40 mt-6 shadow-2xl shadow-brand-red/20 ${
                isMobileMenuOpen ? "animate-fadeInUp opacity-100" : "opacity-0"
              }`}
              style={{
                animationDelay: `${mainNavItems.length * 100 + 300}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-red/10 to-transparent rounded-3xl animate-shimmer"></div>

              <h3 className="text-white font-bold text-xl mb-6 text-center relative z-10">
                <span className="bg-gradient-to-r from-white via-yellow-300 to-white bg-clip-text text-transparent">
                  Need Help?
                </span>
              </h3>

              <div className="space-y-4 relative z-10">
                <a
                  href="tel:+27760355295"
                  className="flex items-center space-x-4 text-white hover:text-yellow-300 transition-all duration-300 p-5 rounded-2xl hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 touch-manipulation active:scale-95 border border-white/20 hover:border-yellow-300/50 shadow-lg hover:shadow-xl group"
                >
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-yellow-300/20 transition-all duration-300 group-hover:rotate-12">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                    +27 76 035 5295
                  </span>
                </a>

                <a
                  href="mailto:apex@w-o-s.co.za"
                  className="flex items-center space-x-4 text-white hover:text-yellow-300 transition-all duration-300 p-5 rounded-2xl hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 touch-manipulation active:scale-95 border border-white/20 hover:border-yellow-300/50 shadow-lg hover:shadow-xl group"
                >
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-yellow-300/20 transition-all duration-300 group-hover:rotate-12">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                    apex@w-o-s.co.za
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
