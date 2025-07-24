import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/OptimizedImage";
import { SEO, generateFAQSchema } from "@/components/SEO";
import { categories } from "@/data/products";
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
  CheckCircle,
  Globe,
  Heart,
  Target,
  Flame,
  Download,
  Eye,
  ShoppingBag,
  BookOpen,
  MousePointer,
  Play,
  Coffee,
  Crown,
  Layers,
} from "lucide-react";

export default function Index() {
  // SEO structured data for FAQ
  const faqData = [
    {
      question: "What types of promotional products does APEX offer?",
      answer:
        "APEX offers over 10,000+ promotional products including corporate gifts, workwear, headwear, safety gear, custom clothing, and branded accessories with professional embroidery and printing services.",
    },
    {
      question: "Do you provide custom branding services?",
      answer:
        "Yes, we provide professional custom branding services including embroidery, screen printing, laser engraving, and digital printing on all our promotional products.",
    },
    {
      question: "What is your delivery time across South Africa?",
      answer:
        "We offer fast delivery across South Africa with turnaround times typically ranging from 48 hours to 7 working days depending on the product and customization requirements.",
    },
    {
      question: "Do you offer bulk discounts for large orders?",
      answer:
        "Yes, we offer competitive bulk pricing for large orders. Contact our sales team at +27 76 035 5295 or apex@w-o-s.co.za for custom quotes on bulk orders.",
    },
  ];

  const featuredCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen">
      <SEO
        title="APEX - Africa's #1 Promotional Products Provider | Corporate Gifts, Workwear & Custom Branding"
        description="Premium corporate gifts, workwear, headwear & promotional items. 10,000+ products with professional custom branding, embroidery & printing services. Fast delivery across South Africa."
        keywords="corporate gifts, promotional products, workwear, custom branding, embroidery, printing, promotional items, corporate clothing, headwear, safety gear, South Africa, APEX, branded merchandise"
        structuredData={generateFAQSchema(faqData)}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Stunning Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Animated gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/30 via-transparent to-red-600/30 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,20,60,0.6),transparent_70%)] animate-float" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,20,60,0.5),transparent_60%)] animate-floatReverse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(139,0,0,0.4),transparent_50%)] animate-breathe" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="particle animate-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${12 + Math.random() * 8}s`,
                  width: window.innerWidth <= 768 ? "3px" : "4px",
                  height: window.innerWidth <= 768 ? "3px" : "4px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="text-center space-y-8 lg:space-y-12">
            {/* Premium Badges */}
            <div className="flex flex-wrap gap-4 justify-center animate-fadeInUp">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full border-0 shadow-2xl mobile-shadow animate-bounce text-base">
                <Crown className="h-5 w-5 mr-2" />
                Premium Quality
              </Badge>
              <Badge
                className="bg-gradient-to-r from-emerald-400 to-green-500 text-black font-bold px-6 py-3 rounded-full border-0 shadow-2xl mobile-shadow animate-bounce text-base"
                style={{ animationDelay: "300ms" }}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                10,000+ Products
              </Badge>
              <Badge
                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-black font-bold px-6 py-3 rounded-full border-0 shadow-2xl mobile-shadow animate-bounce text-base"
                style={{ animationDelay: "600ms" }}
              >
                <Zap className="h-5 w-5 mr-2" />
                Fast Delivery
              </Badge>
            </div>

            {/* Hero Title */}
            <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  Africa's
                </span>
                <br />
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <span className="bg-gradient-to-r from-brand-red via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                    #1
                  </span>
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                    Supplier
                  </span>
                </div>
              </h1>
            </div>

            {/* Hero Description */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: "400ms" }}>
              Transform your brand with premium corporate gifts, cutting-edge workwear, and 
              <span className="text-brand-red font-bold gradient-text"> revolutionary promotional items</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeInUp" style={{ animationDelay: "600ms" }}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-10 py-6 rounded-2xl shadow-2xl mobile-shadow-red hover:shadow-red-500/40 transition-all duration-500 hover:scale-105 active:scale-95 border border-red-500/30 text-xl"
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Explore Catalogue
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-bold px-10 py-6 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:scale-105 active:scale-95 text-xl"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Video
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 animate-fadeInUp" style={{ animationDelay: "800ms" }}>
              <div className="flex items-center gap-2 text-gray-300">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">25+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-semibold">1000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">Nationwide Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,20,60,0.1),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* About Content */}
            <div className="space-y-8 animate-fadeInLeft">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-brand-red/20 to-red-600/20 text-brand-red border border-brand-red/30 font-bold px-4 py-2 rounded-full">
                  <Heart className="h-4 w-4 mr-2" />
                  About APEX
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Crafting
                  <span className="gradient-text"> Excellence</span>
                  <br />
                  Since 1998
                </h2>
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                For over 25 years, APEX has been Africa's leading promotional products provider. 
                We've built our reputation on delivering premium quality corporate gifts, workwear, 
                and custom branding solutions that help businesses make lasting impressions.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-brand-red to-red-600 shadow-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Quality First</h3>
                    <p className="text-gray-400">Premium materials and craftsmanship in every product</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Expert Team</h3>
                    <p className="text-gray-400">Professional designers and branding specialists</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 shadow-lg">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Fast Service</h3>
                    <p className="text-gray-400">Quick turnaround times nationwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 mobile-glass">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Guaranteed</h3>
                    <p className="text-gray-400">100% satisfaction guarantee on all orders</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="group bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-lg border border-white/20 hover:border-brand-red/50 transition-all duration-300 hover:scale-105"
              >
                <Coffee className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Learn Our Story
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* About Visual */}
            <div className="relative animate-fadeInRight">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-red/30 to-red-600/30 rounded-3xl blur-2xl opacity-60 animate-pulse" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mobile-glass">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-brand-red/20 to-red-600/20 border border-red-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">25+</div>
                    <div className="text-gray-300 font-semibold">Years</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-600/20 border border-green-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">10K+</div>
                    <div className="text-gray-300 font-semibold">Products</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">1000+</div>
                    <div className="text-gray-300 font-semibold">Clients</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30">
                    <div className="text-3xl md:text-4xl font-black text-white">24/7</div>
                    <div className="text-gray-300 font-semibold">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,20,60,0.15),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-16 animate-fadeInUp">
            <Badge className="bg-gradient-to-r from-brand-red/20 to-red-600/20 text-brand-red border border-brand-red/30 font-bold px-4 py-2 rounded-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Our Catalogue
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Explore Our
              <span className="gradient-text"> Premium</span>
              <br />
              Collections
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of premium promotional products, corporate gifts, and custom branding solutions
              designed to elevate your business presence.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.id}
                to={category.href}
                className="group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-brand-red/50 transition-all duration-500 hover:scale-105 mobile-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      <OptimizedImage
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={300}
                        quality={90}
                      />
                      
                      {/* Floating Icon */}
                      <div className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-gradient-to-r from-brand-red to-red-600 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        {category.title.includes("Gift") ? (
                          <Gift className="h-6 w-6 text-white" />
                        ) : category.title.includes("Clothing") ? (
                          <Shirt className="h-6 w-6 text-white" />
                        ) : (
                          <Briefcase className="h-6 w-6 text-white" />
                        )}
                      </div>

                      {/* Product Count Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-black/50 backdrop-blur-lg text-white border-0 font-bold px-3 py-1">
                          <Layers className="h-3 w-3 mr-1" />
                          {category.count}+ Products
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-red transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-medium">View Collection</span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-brand-red group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-8 animate-fadeInUp">
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-brand-red/20 to-red-600/20 backdrop-blur-xl border border-red-500/30 mobile-glass">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Brand?
              </h3>
              <p className="text-gray-300 mb-6">
                Get a custom quote for your promotional products and branding needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Browse All Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50 font-bold px-8 py-4 rounded-xl backdrop-blur-lg transition-all duration-300 hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Download Catalogue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
