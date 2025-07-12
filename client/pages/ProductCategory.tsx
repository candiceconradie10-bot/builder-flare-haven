import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Grid,
  List,
  Star,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductCategory() {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categoryTitle = category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Premium Product ${i + 1}`,
    price: `R${(Math.random() * 500 + 100).toFixed(0)}.00`,
    originalPrice:
      Math.random() > 0.5
        ? `R${(Math.random() * 200 + 600).toFixed(0)}.00`
        : null,
    image: "/api/placeholder/300/300",
    rating: 4.0 + Math.random() * 1,
    reviews: Math.floor(Math.random() * 200 + 20),
    discount:
      Math.random() > 0.6
        ? `${Math.floor(Math.random() * 30 + 10)}% OFF`
        : null,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-brand-red">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryTitle}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {categoryTitle}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of {categoryTitle?.toLowerCase()}{" "}
              with custom branding options
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Under R100
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        R100 - R250
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        R250 - R500
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Over R500
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Brand</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Alex Varga
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Elevate
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Slazenger
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Black", "White", "Navy", "Red", "Blue"].map(
                        (color) => (
                          <div
                            key={color}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                            style={{
                              backgroundColor: color.toLowerCase(),
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Showing {placeholderProducts.length} products
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-gray-100" : ""}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-gray-100" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {placeholderProducts.map((product) => (
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
                      {product.discount && (
                        <Badge className="absolute top-3 left-3 bg-brand-red">
                          {product.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating.toFixed(1)} ({product.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-gray-900">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-brand-red hover:bg-brand-red/90"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button className="bg-brand-red">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
