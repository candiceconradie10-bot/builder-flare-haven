import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-red to-black text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-brand-orange text-white">
                25+ Years in Business
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Africa's Leading
                <span className="block text-brand-orange">
                  Promotional Products
                </span>
                Provider
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Premium corporate gifts, clothing, and promotional items. Over
                10,000 products with custom branding services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 py-4"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-black hover:text-white font-semibold px-8 py-4"
                >
                  Get Quote
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8">
                <img
                  src="/api/placeholder/600/400"
                  alt="Featured Products"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-foreground">
                          R{product.price.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-brand-red hover:bg-brand-red/90"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
