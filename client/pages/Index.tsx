import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { getFeaturedProducts, categories } from "@/data/products";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Award,
  Users,
  Gift,
  Shirt,
  Briefcase,
  Sparkles,
  Zap,
  TrendingUp,
  Rocket,
  Phone,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Target,
  Flame,
  Download,
  Eye,
  ShoppingBag,
  BookOpen,
  Layers,
  MousePointer,
} from "lucide-react";

export default function Index() {
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts(4);

  const featuredCategories = categories.map((category) => ({
    ...category,
    icon: category.title.includes("Gift")
      ? Gift
      : category.title.includes("Clothing")
        ? Shirt
        : Briefcase,
  }));

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders over R500",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Premium products only",
    },
    {
      icon: Award,
      title: "25+ Years Experience",
      description: "Industry leading expertise",
    },
    {
      icon: Users,
      title: "Custom Branding",
      description: "Professional embroidery & printing",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 via-transparent to-red-600/20" />

          {/* Floating orbs */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.4),transparent_70%)] animate-float" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,20,60,0.3),transparent_60%)] animate-floatReverse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(139,0,0,0.2),transparent_50%)] animate-breathe" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 20}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              {/* Premium Badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-full border-0 shadow-lg animate-bounce">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Premium Quality
                </Badge>
                <Badge
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-4 py-2 rounded-full border-0 shadow-lg animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  10,000+ Products
                </Badge>
              </div>

              {/* Hero Title with Gradient */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Africa's
                  </span>
                  <br />
                  <div className="flex flex-row">
                    <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                      #1
                    </span>
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      &nbsp;Supplier
                    </span>
                  </div>
                  <br />
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Premium corporate gifts, cutting-edge clothing, and
                revolutionary promotional items.
                <span className="text-brand-red font-semibold">
                  {" "}
                  Transform your brand
                </span>{" "}
                with our custom solutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 border border-red-500/20"
                >
                  <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-bold px-8 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Get Custom Quote
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-red">
                    100%
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    Quality Assured
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-red">
                    10K+
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-brand-red">
                    1M+
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    Happy Customers
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:scale-110">
              <div className="relative">
                {/* Glow Effects */}
                <div className="absolute -inset-8 bg-gradient-to-r from-brand-red/30 via-red-600/30 to-brand-red/30 rounded-full blur-3xl animate-pulse" />
                <div
                  className="absolute -inset-4 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-3xl blur-2xl animate-pulse"
                  style={{ animationDelay: "1000ms" }}
                />

                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2F5e082290a0a94182af0923df3ec0f2f8"
                    alt="Premium Products Showcase"
                    className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-3 rounded-2xl shadow-xl animate-bounce">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div
                    className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-black p-3 rounded-2xl shadow-xl animate-bounce"
                    style={{ animationDelay: "500ms" }}
                  >
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-transparent to-red-600/10" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-red-500/20 to-brand-red/20 rounded-full blur-3xl animate-floatReverse" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-6 py-3 rounded-full border-0 shadow-2xl mb-6 animate-bounce">
              <Globe className="h-5 w-5 mr-2" />
              About APEX
            </Badge>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Africa's
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                Leading Provider
              </span>
            </h2>

            <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              APEX is South Africa's premier promotional products provider,
              transforming brands with
              <span className="text-brand-red font-bold">
                {" "}
                cutting-edge solutions
              </span>{" "}
              and unmatched quality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
            {/* Enhanced About Content */}
            <div className="space-y-10">
              <div className="space-y-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  We specialize in
                  <span className="text-brand-red font-semibold">
                    {" "}
                    corporate gifts
                  </span>
                  , professional clothing, and custom branding solutions that
                  help businesses across Africa create lasting impressions with
                  high-quality promotional items.
                </p>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                        Premium Quality
                      </div>
                    </div>
                    <div className="text-gray-400">
                      Only the finest materials and craftsmanship meet our
                      standards
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Flame className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                        Custom Branding
                      </div>
                    </div>
                    <div className="text-gray-400">
                      Professional embroidery, printing & design services
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                        Fast Delivery
                      </div>
                    </div>
                    <div className="text-gray-400">
                      Lightning-fast turnaround times across South Africa
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                        Expert Support
                      </div>
                    </div>
                    <div className="text-gray-400">
                      Dedicated account managers for personalized service
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105">
                  <Target className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Our Mission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-bold px-8 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Enhanced Visual Section */}
            <div className="relative">
              <div className="relative">
                {/* Advanced Glow Effects */}
                <div className="absolute -inset-12 bg-gradient-to-br from-brand-red/40 via-red-500/30 to-red-700/40 rounded-full blur-3xl animate-float" />
                <div className="absolute -inset-6 bg-gradient-to-br from-brand-red/30 to-red-600/30 rounded-3xl blur-2xl animate-floatReverse" />

                {/* Main Content Container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="space-y-8">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl p-4 backdrop-blur-md border border-white/20">
                        <div className="text-2xl font-bold text-white mb-1">
                          10K+
                        </div>
                        <div className="text-xs text-gray-300">Products</div>
                      </div>
                      <div className="text-center bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl p-4 backdrop-blur-md border border-white/20">
                        <div className="text-2xl font-bold text-white mb-1">
                          500+
                        </div>
                        <div className="text-xs text-gray-300">Clients</div>
                      </div>
                      <div className="text-center bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl p-4 backdrop-blur-md border border-white/20">
                        <div className="text-2xl font-bold text-white mb-1">
                          15+
                        </div>
                        <div className="text-xs text-gray-300">Years</div>
                      </div>
                    </div>

                    {/* Service Categories */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-2xl p-6 backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300">
                        <Gift className="h-10 w-10 text-brand-red mb-4" />
                        <div className="text-lg font-bold text-white mb-2">
                          Corporate Gifts
                        </div>
                        <div className="text-sm text-gray-300">
                          Premium branded items for every occasion
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-2xl p-6 backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300">
                        <Shirt className="h-10 w-10 text-brand-red mb-4" />
                        <div className="text-lg font-bold text-white mb-2">
                          Clothing
                        </div>
                        <div className="text-sm text-gray-300">
                          Professional apparel & workwear solutions
                        </div>
                      </div>
                    </div>

                    {/* Bottom Achievement */}
                    <div className="text-center p-8 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-2xl border border-brand-red/30">
                      <Award className="h-12 w-12 text-brand-red mx-auto mb-4" />
                      <div className="text-2xl font-bold text-white mb-2">
                        Industry Leader
                      </div>
                      <div className="text-gray-300">
                        Trusted by businesses across Africa
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 rounded-2xl shadow-2xl animate-float">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-emerald-500 text-black p-4 rounded-2xl shadow-2xl animate-floatReverse">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="absolute top-1/2 -right-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-3 rounded-xl shadow-xl animate-pulse">
                  <Rocket className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div className="text-gray-400 font-medium">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-gray-400 font-medium">Corporate Clients</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-gray-400 font-medium">
                Quality Guaranteed
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-400 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Bar */}
      <section className="relative py-16 bg-gradient-to-r from-black via-gray-900 to-black border-y border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-red-600/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105"
              >
                <div className="relative mx-auto w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-full blur group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-brand-red to-red-600 p-4 rounded-full shadow-lg group-hover:shadow-red-500/25">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-red-600/5" />
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Animated background elements */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-gradient-to-br from-brand-red/10 to-red-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-to-br from-red-500/10 to-brand-red/10 rounded-full blur-3xl animate-floatReverse" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-6 py-3 rounded-full border-0 shadow-2xl mb-8 animate-bounce">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Our Products
            </Badge>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                Product Range
              </span>
            </h2>

            <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
              Discover our comprehensive collection of
              <span className="text-brand-red font-bold">
                {" "}
                premium promotional products
              </span>
              , trusted by thousands of businesses across Africa.
            </p>
          </div>

          {/* Enhanced Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredCategories.map((category, index) => (
              <Link key={index} to={category.href} className="group">
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-red/20 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Card className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 group-hover:border-brand-red/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-red/10">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Category icon */}
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-2xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                          <category.icon className="h-6 w-6 text-white" />
                        </div>

                        {/* Floating badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 rounded-full border-0 shadow-lg">
                            Popular
                          </Badge>
                        </div>

                        {/* Bottom overlay with quick stats */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/20">
                            <div className="text-white font-bold text-sm">
                              500+ Products
                            </div>
                            <div className="text-gray-300 text-xs">
                              Starting from R50
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {category.description}
                        </p>

                        <Button className="w-full bg-gradient-to-r from-white/10 to-white/5 hover:from-brand-red hover:to-red-600 text-white border border-white/20 hover:border-transparent font-bold py-3 rounded-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105">
                          <Eye className="mr-2 h-4 w-4" />
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105 text-center">
              <Gift className="h-12 w-12 text-brand-red mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <div className="text-lg font-bold text-white mb-2">
                Corporate Gifts
              </div>
              <div className="text-sm text-gray-400">2,500+ Items</div>
            </div>

            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105 text-center">
              <Shirt className="h-12 w-12 text-brand-red mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <div className="text-lg font-bold text-white mb-2">Clothing</div>
              <div className="text-sm text-gray-400">3,200+ Items</div>
            </div>

            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105 text-center">
              <Shield className="h-12 w-12 text-brand-red mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <div className="text-lg font-bold text-white mb-2">
                Safety Gear
              </div>
              <div className="text-sm text-gray-400">1,800+ Items</div>
            </div>

            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105 text-center">
              <Briefcase className="h-12 w-12 text-brand-red mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <div className="text-lg font-bold text-white mb-2">Business</div>
              <div className="text-sm text-gray-400">2,000+ Items</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-red-600/5" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-6 py-3 rounded-full border-0 shadow-2xl mb-8 animate-bounce">
              <Star className="h-5 w-5 mr-2" />
              Featured Products
            </Badge>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Bestselling
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                Collection
              </span>
            </h2>

            <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
              Hand-picked items from our
              <span className="text-brand-red font-bold">
                {" "}
                premium collection
              </span>
              , loved by thousands of customers across Africa.
            </p>

            <Button className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105">
              <Eye className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <ProductCard product={product} featured={index < 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogues Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-red-600/5" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-red-500/20 to-brand-red/20 rounded-full blur-3xl animate-floatReverse" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-6 py-3 rounded-full border-0 shadow-2xl mb-8 animate-bounce">
              <BookOpen className="h-5 w-5 mr-2" />
              Digital Catalogues
            </Badge>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Browse Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                Catalogues
              </span>
            </h2>

            <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Explore our comprehensive digital catalogues featuring
              <span className="text-brand-red font-bold">
                {" "}
                10,000+ premium products
              </span>
              across all categories.
            </p>
          </div>

          {/* Catalogues Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Main Catalogue */}
            <div className="lg:col-span-2">
              <div className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-red/30 to-red-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-brand-red/30 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors duration-300">
                        Complete Product Catalogue 2024
                      </h3>
                      <p className="text-gray-300">
                        Our comprehensive collection featuring all 10,000+
                        products
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-brand-red to-red-600 p-4 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                      <Layers className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl p-4 text-center backdrop-blur-md border border-white/20">
                      <div className="text-2xl font-bold text-white">200+</div>
                      <div className="text-sm text-gray-300">Pages</div>
                    </div>
                    <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl p-4 text-center backdrop-blur-md border border-white/20">
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-sm text-gray-300">Products</div>
                    </div>
                    <div className="bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-xl p-4 text-center backdrop-blur-md border border-white/20">
                      <div className="text-2xl font-bold text-white">HD</div>
                      <div className="text-sm text-gray-300">Quality</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="group/btn flex-1 bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold py-4 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105">
                      <Download className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="group/btn flex-1 border-2 border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-bold py-4 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
                    >
                      <Eye className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                      View Online
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Catalogues */}
            <div className="space-y-6">
              <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-3 py-1 rounded-full border-0">
                    Popular
                  </Badge>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors duration-300">
                  Corporate Gifts
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Premium branded items for every occasion
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-brand-red/20 to-red-600/20 hover:from-brand-red hover:to-red-600 text-white border border-brand-red/30 font-bold rounded-xl"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10 rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Shirt className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-black font-bold px-3 py-1 rounded-full border-0">
                    New
                  </Badge>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors duration-300">
                  Clothing Collection
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Professional apparel & workwear
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-brand-red/20 to-red-600/20 hover:from-brand-red hover:to-red-600 text-white border border-brand-red/30 font-bold rounded-xl"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10 rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-brand-red to-red-600 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold px-3 py-1 rounded-full border-0">
                    Essential
                  </Badge>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-red transition-colors duration-300">
                  Safety Equipment
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Complete safety gear collection
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-brand-red/20 to-red-600/20 hover:from-brand-red hover:to-red-600 text-white border border-brand-red/30 font-bold rounded-xl"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10 rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-brand-red to-red-600 p-4 rounded-2xl mx-auto w-fit mb-6 group-hover:rotate-12 transition-transform duration-300">
                <MousePointer className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
                Interactive Viewing
              </h3>
              <p className="text-gray-300">
                Browse products with our interactive digital catalogue viewer
              </p>
            </div>

            <div className="group text-center bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-brand-red to-red-600 p-4 rounded-2xl mx-auto w-fit mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
                Instant Downloads
              </h3>
              <p className="text-gray-300">
                Download high-quality PDF catalogues for offline viewing
              </p>
            </div>

            <div className="group text-center bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-r from-brand-red to-red-600 p-4 rounded-2xl mx-auto w-fit mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-red transition-colors duration-300">
                Regular Updates
              </h3>
              <p className="text-gray-300">
                Fresh content and new products added monthly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-transparent to-red-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Animated elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-red/20 to-red-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-red-500/20 to-brand-red/20 rounded-full blur-3xl animate-floatReverse" />

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Main CTA Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <Badge className="bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-6 py-3 rounded-full border-0 shadow-2xl mb-8 animate-bounce">
              <Rocket className="h-5 w-5 mr-2" />
              Get Started Today
            </Badge>

            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Ready to
              </span>
              <br />
              <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                Transform
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Your Brand?
              </span>
            </h2>

            <p className="text-2xl text-gray-300 leading-relaxed mb-12">
              Join thousands of satisfied customers who trust
              <span className="text-brand-red font-bold"> APEX</span> for their
              promotional needs. Start your journey today!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 text-lg"
            >
              <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Request Custom Quote
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-bold px-12 py-6 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 text-lg"
            >
              <BookOpen className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Browse Catalogue
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300 mb-2">
                24/7
              </div>
              <div className="text-gray-300 font-medium">Expert Support</div>
            </div>

            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300 mb-2">
                48H
              </div>
              <div className="text-gray-300 font-medium">Quick Turnaround</div>
            </div>

            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300 mb-2">
                100%
              </div>
              <div className="text-gray-300 font-medium">Quality Guarantee</div>
            </div>

            <div className="group bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-brand-red group-hover:scale-110 transition-transform duration-300 mb-2">
                1M+
              </div>
              <div className="text-gray-300 font-medium">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
