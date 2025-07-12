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
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 via-transparent to-red-600/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.3),transparent_50%)] animate-pulse" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,20,60,0.2),transparent_50%)] animate-pulse"
            style={{ animationDelay: "1000ms" }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              {/* Animated Badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-full border-0 shadow-lg animate-bounce">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  25+ Years Excellence
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
                  <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                    #1 APEX
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Supplier
                  </span>
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
                    25+
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    Years Experience
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
                    src="/api/placeholder/600/400"
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

      {/* Features Bar */}
      <section className="bg-black py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-brand-red/10 p-3 rounded-full">
                  <feature.icon className="h-6 w-6 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular product categories, trusted by thousands
              of businesses across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-black/90 p-2 rounded-full">
                        <category.icon className="h-6 w-6 text-brand-red" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-brand-red group-hover:text-white transition-colors"
                      >
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked items from our bestselling collection
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
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

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" className="w-full">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Apex for their
            promotional needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-orange-600 px-8 py-4"
            >
              Request Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-black hover:text-white px-8 py-4"
            >
              Browse Catalog
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
