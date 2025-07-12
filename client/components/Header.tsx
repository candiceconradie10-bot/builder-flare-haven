import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavItems = [
    "Corporate Gifts",
    "Hampers",
    "Gift Sets",
    "Corporate Clothing",
    "Headwear & Accessories",
    "Workwear",
    "Display",
    "Custom Products",
    "Clearance",
  ];

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-brand-red text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+27 11 886 5640</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>info@apex.co.za</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Free delivery on orders over R500</span>
            <Link to="/track-order" className="hover:underline">
              Track Your Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-brand-blue text-white px-4 py-2 rounded font-bold text-xl">
                APEX
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-2 border-2 border-gray-300 rounded-md focus:border-brand-blue"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bg-brand-blue hover:bg-brand-blue/90"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:block border-t border-gray-200">
            <div className="flex space-x-8 py-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}`}
                  className="text-gray-700 hover:text-brand-blue font-medium whitespace-nowrap transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="p-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-12 py-2"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 bg-brand-blue hover:bg-brand-blue/90"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex justify-around mb-4 py-2 border-b border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center space-y-1"
              >
                <User className="h-5 w-5" />
                <span className="text-xs">Account</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center space-y-1"
              >
                <Heart className="h-5 w-5" />
                <span className="text-xs">Wishlist</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center space-y-1 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">Cart</span>
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}`}
                  className="block py-2 px-2 text-gray-700 hover:text-brand-blue font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
