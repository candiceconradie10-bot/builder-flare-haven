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
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { state } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    {
      name: "Corporate Gifts",
      href: "/corporate-gifts",
      badge: "Popular",
      items: ["Executive Sets", "Tech Accessories", "Branded Items"],
    },
    {
      name: "Corporate Clothing",
      href: "/corporate-clothing",
      badge: "New",
      items: ["Polo Shirts", "Hoodies", "Jackets"],
    },
    {
      name: "Workwear",
      href: "/workwear",
      items: ["Safety Gear", "Uniforms", "PPE"],
    },
    {
      name: "Headwear",
      href: "/headwear-and-accessories",
      items: ["Caps", "Beanies", "Visors"],
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
      {/* Top Bar - Enhanced with glassmorphism */}
      <div className="bg-gradient-to-r from-brand-red via-red-600 to-brand-red text-white py-2 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="container mx-auto flex justify-between items-center text-sm relative z-10">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <Phone className="h-4 w-4" />
              <span className="font-medium">+27 11 886 5640</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
              <Mail className="h-4 w-4" />
              <span>info@apex.co.za</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="font-medium">
                Free delivery on orders over R500
              </span>
            </div>
            <Link
              to="/track-order"
              className="hover:text-yellow-300 transition-colors duration-200 font-medium hover:underline"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Glassmorphism with dynamic blur */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-black/60 backdrop-blur-md border-b border-gray-800"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Enhanced with animation */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-red to-red-700 text-white px-6 py-3 rounded-xl font-bold text-xl lg:text-2xl shadow-lg group-hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-105">
                  APEX
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-brand-red/50 to-red-700/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>

            {/* Enhanced Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search premium products..."
                    className="w-full pl-6 pr-14 py-3 bg-white/10 backdrop-blur-md border-white/20 rounded-xl text-white placeholder-white/60 focus:bg-white/20 focus:border-brand-red/50 transition-all duration-300 text-lg"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red rounded-lg px-4 py-2 shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Header Actions - Enhanced */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium"
                >
                  <User className="h-5 w-5 mr-2" />
                  Account
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium relative"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 hover:text-brand-red transition-all duration-300 rounded-xl px-4 py-2 font-medium relative group"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                    {state.itemCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-red to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-black group-hover:scale-110 transition-transform duration-200">
                        {state.itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button - Enhanced */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white hover:bg-white/10 rounded-xl p-3 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`h-6 w-6 absolute transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`h-6 w-6 absolute transition-all duration-300 ${
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

            {/* Mobile Actions */}
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-2 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl p-4 transition-all duration-300"
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">Account</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-2 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl p-4 transition-all duration-300"
              >
                <Heart className="h-6 w-6" />
                <span className="text-sm font-medium">Wishlist</span>
              </Button>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full flex flex-col items-center space-y-2 text-white hover:bg-white/10 hover:text-brand-red rounded-2xl p-4 transition-all duration-300 relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-sm font-medium">Cart</span>
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-red to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <div key={item.name} className="space-y-1">
                  <Link
                    to={item.href}
                    className="flex items-center justify-between w-full p-4 text-white hover:text-brand-red hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
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
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {item.items && (
                    <div className="ml-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem}
                          to={`${item.href}?category=${subItem.toLowerCase().replace(" ", "-")}`}
                          className="block p-3 text-white/70 hover:text-brand-red hover:bg-white/5 rounded-lg transition-all duration-200 text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
