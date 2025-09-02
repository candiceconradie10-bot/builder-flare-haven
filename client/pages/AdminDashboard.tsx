import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Upload,
  Save,
  Trash2,
  Edit,
  Image,
  FileText,
  Package,
  Settings,
  Crown,
  Database,
  RefreshCw,
  Loader2,
  Layout,
  Download,
  Plus,
  X,
  Eye,
  Globe,
  Smartphone,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [activeTab, setActiveTab] = useState("content");

  // Admin UX state (products list)
  const [productSearch, setProductSearch] = useState("");
  const [productSort, setProductSort] = useState<"created_at" | "name" | "price">("created_at");
  const [productSortDir, setProductSortDir] = useState<"asc" | "desc">("desc");
  const [productPage, setProductPage] = useState(1);
  const pageSize = 10;

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"image" | "pdf">("image");

  // Product Form State
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    inStock: true,
  });

  // Content Form State
  const [contentForm, setContentForm] = useState({
    id: "",
    section: "",
    title: "",
    description: "",
    image: "",
    content: "",
    order: 0,
  });

  // Catalogue Form State
  const [catalogueForm, setCatalogueForm] = useState({
    id: "",
    name: "",
    category: "",
    pdfUrl: "",
    description: "",
  });

  // Background Images State
  const [backgroundImages, setBackgroundImages] = useState([
    {
      id: 1,
      name: "Slide 1",
      url: "https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2F80eeac5f3fb241888157c2f2a4ccf42b?format=webp&width=1920",
    },
    {
      id: 2,
      name: "Slide 2",
      url: "https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2F40f759488e564397a9ebb0c2e6fe0268?format=webp&width=1920",
    },
    {
      id: 3,
      name: "Slide 3",
      url: "https://cdn.builder.io/api/v1/image/assets%2F5ed541bb7f2f4c82a9c16c7e0b0da0c6%2Fda98de9fb8244ece8c68751c4926e3ef?format=webp&width=1920",
    },
  ]);

  // Content Sections with current content
  const contentSections = [
    {
      id: "hero",
      name: "Hero Section",
      description: "Main slideshow and CTA buttons",
      currentContent: {
        title: "Hero Slideshow",
        description:
          "Background images with Learn More and View All Products buttons",
        buttons: [
          "Learn More (links to #about-section)",
          "View All Products (links to #catalogue-section)",
        ],
        images: ["3 banner images currently displayed"],
      },
    },
    {
      id: "about",
      name: "About Section",
      description: "Company information and values",
      currentContent: {
        title: "Welcome to W.O.S APEX",
        description:
          "At W.O.S APEX we believe your clothing should work as hard as you do, and look good doing it. W.O.S APEX is your one-stop online destination for premium clothing, durable workwear and curated gifting. Driven by W.O.S, W.O.S APEX stands at the intersection of function and flare.\n\nWelcome to W.O.S APEX",
        features: [
          "Quality First: Premium materials and craftsmanship in every product",
          "Expert Team: Professional designers and branding specialists",
          "Fast Service: Quick turnaround times nationwide",
          "Guaranteed: 100% satisfaction guarantee on all orders",
        ],
      },
    },
    {
      id: "catalogue",
      name: "Catalogue Section",
      description: "Product categories display",
      currentContent: {
        title: "Explore Our Premium Collections",
        description:
          "Discover thousands of premium promotional products, corporate gifts, and custom branding solutions designed to elevate your business presence.",
        ctaTitle: "Browse Our Catalogues",
        ctaDescription:
          "Download our comprehensive product catalogues to explore our full range of offerings.",
        categories: [
          "Corporate Gifts -> /gifting",
          "Clothing -> /corporate-clothing",
          "Workwear -> /workwear",
          "Headwear & Accessories -> /headwear",
        ],
      },
    },
    {
      id: "footer",
      name: "Footer",
      description: "Footer content and links",
      currentContent: {
        companyDescription:
          "W.O.S APEX is your one-stop online destination for premium clothing, durable workwear and curated gifting. Driven by W.O.S, W.O.S APEX stands at the intersection of function and flare. Welcome to W.O.S APEX",
        location: "Cape Town, South Africa",
        phone: "+27 76 035 5295",
        email: "apex@w-o-s.co.za",
        hours: "Mon-Fri: 8AM-5PM",
        newsletterText:
          "Subscribe to our newsletter for the latest deals and product updates.",
        socialMedia: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
      },
    },
    {
      id: "header",
      name: "Header",
      description: "Navigation and contact info",
      currentContent: {
        topBarPhone: "+27 76 035 5295",
        topBarEmail: "apex@w-o-s.co.za",
        searchPlaceholder: "Search products...",
        navItems: [
          "Clothing",
          "Workwear",
          "Headwear",
          "Safety Gear",
          "Gifting",
          "Display",
          "Footwear",
          "Custom Products",
        ],
        logo: "APEX Logo with company branding",
      },
    },
  ];

  // Initialize data
  useEffect(() => {
    // Add custom upload function to window
    (window as any).uploadFile = async (file: File) => {
      try {
        // @ts-ignore
        const { data, error } = await supabase.storage
          .from("uploads")
          .upload(`files/${file.name}`, file);

        if (error) {
          console.error("Upload error:", error);
          return { error };
        } else {
          console.log("Uploaded:", data);
          return { data };
        }
      } catch (err) {
        console.error("Upload function error:", err);
        return { error: err };
      }
    };

    loadProducts();
    loadContent();
    loadCatalogues();
  }, []);

  // Load products from Supabase
  const loadProducts = async () => {
    try {
      setLoading(true);
      // @ts-ignore
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading products:", error);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error("Load products error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load content from Supabase
  const loadContent = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section", { ascending: true });

      if (error) {
        console.error("Error loading content:", error);
      } else {
        setContent(data || []);
      }
    } catch (err) {
      console.error("Load content error:", err);
    }
  };

  // Load catalogues from Supabase
  const loadCatalogues = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase
        .from("catalogues")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error loading catalogues:", error);
      } else {
        setCatalogues(data || []);
      }
    } catch (err) {
      console.error("Load catalogues error:", err);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // @ts-ignore
      const result = await window.uploadFile(selectedFile);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.error) {
        throw result.error;
      }

      alert("File uploaded successfully!");
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error) {
      alert("Upload failed: " + (error as Error).message);
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle product save
  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        image: productForm.image,
        in_stock: productForm.inStock,
      };

      // @ts-ignore
      let result;
      if (productForm.id) {
        // Update existing product
        result = await supabase
          .from("products")
          .update(productData)
          .eq("id", productForm.id);
      } else {
        // Create new product
        result = await supabase.from("products").insert([productData]);
      }

      if (result.error) {
        throw result.error;
      }

      alert("Product saved successfully!");
      setProductForm({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        inStock: true,
      });

      loadProducts();
    } catch (error) {
      alert("Save failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Handle content save
  const handleContentSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const contentData = {
        section: contentForm.section,
        title: contentForm.title,
        description: contentForm.description,
        image: contentForm.image,
        content: contentForm.content,
        order: contentForm.order,
      };

      // @ts-ignore
      let result;
      if (contentForm.id) {
        // Update existing content
        result = await supabase
          .from("site_content")
          .update(contentData)
          .eq("id", contentForm.id);
      } else {
        // Create new content
        result = await supabase
          .from("site_content")
          .insert([contentData]);
      }

      if (result.error) {
        throw result.error;
      }

      alert("Content saved successfully!");
      setContentForm({
        id: "",
        section: "",
        title: "",
        description: "",
        image: "",
        content: "",
        order: 0,
      });

      loadContent();
    } catch (error) {
      alert("Save failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Handle catalogue save
  const handleCatalogueSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const catalogueData = {
        name: catalogueForm.name,
        category: catalogueForm.category,
        pdf_url: catalogueForm.pdfUrl,
        description: catalogueForm.description,
      };

      // @ts-ignore
      let result;
      if (catalogueForm.id) {
        // Update existing catalogue
        result = await supabase
          .from("catalogues")
          .update(catalogueData)
          .eq("id", catalogueForm.id);
      } else {
        // Create new catalogue
        result = await supabase
          .from("catalogues")
          .insert([catalogueData]);
      }

      if (result.error) {
        throw result.error;
      }

      alert("Catalogue saved successfully!");
      setCatalogueForm({
        id: "",
        name: "",
        category: "",
        pdfUrl: "",
        description: "",
      });

      loadCatalogues();
    } catch (error) {
      alert("Save failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Delete functions
  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      // @ts-ignore
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) throw error;
      alert("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      alert("Delete failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    try {
      setLoading(true);
      // @ts-ignore
      const { error } = await supabase
        .from("site_content")
        .delete()
        .eq("id", id);
      if (error) throw error;
      alert("Content deleted successfully!");
      loadContent();
    } catch (error) {
      alert("Delete failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCatalogue = async (id: string) => {
    if (!confirm("Are you sure you want to delete this catalogue?")) return;
    try {
      setLoading(true);
      // @ts-ignore
      const { error } = await supabase
        .from("catalogues")
        .delete()
        .eq("id", id);
      if (error) throw error;
      alert("Catalogue deleted successfully!");
      loadCatalogues();
    } catch (error) {
      alert("Delete failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Edit functions
  const editProduct = (product: any) => {
    setProductForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      inStock: product.in_stock,
    });
  };

  const editContent = (content: any) => {
    setContentForm({
      id: content.id,
      section: content.section,
      title: content.title,
      description: content.description,
      image: content.image,
      content: content.content,
      order: content.order,
    });
  };

  const editCatalogue = (catalogue: any) => {
    setCatalogueForm({
      id: catalogue.id,
      name: catalogue.name,
      category: catalogue.category,
      pdfUrl: catalogue.pdf_url,
      description: catalogue.description,
    });
  };

  // Add new background image
  const addBackgroundImage = () => {
    const newId = Math.max(...backgroundImages.map((img) => img.id)) + 1;
    setBackgroundImages([
      ...backgroundImages,
      { id: newId, name: `Slide ${newId}`, url: "" },
    ]);
  };

  // Update background image
  const updateBackgroundImage = (id: number, field: string, value: string) => {
    setBackgroundImages(
      backgroundImages.map((img) =>
        img.id === id ? { ...img, [field]: value } : img,
      ),
    );
  };

  // Remove background image
  const removeBackgroundImage = (id: number) => {
    setBackgroundImages(backgroundImages.filter((img) => img.id !== id));
  };

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Content Form */}
        <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Layout className="h-5 w-5 mr-2 text-brand-red" />
              {contentForm.id ? "Edit Content" : "Add New Content"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContentSave} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Section</Label>
                <select
                  value={contentForm.section}
                  onChange={(e) => {
                    const selectedSection = contentSections.find(
                      (s) => s.id === e.target.value,
                    );
                    if (selectedSection && selectedSection.currentContent) {
                      // Auto-populate with current content
                      setContentForm({
                        ...contentForm,
                        section: e.target.value,
                        title: selectedSection.currentContent.title || "",
                        description:
                          selectedSection.currentContent.description || "",
                        content: JSON.stringify(
                          selectedSection.currentContent,
                          null,
                          2,
                        ),
                      });
                    } else {
                      setContentForm({
                        ...contentForm,
                        section: e.target.value,
                      });
                    }
                  }}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Section</option>
                  {contentSections.map((section) => (
                    <option
                      key={section.id}
                      value={section.id}
                      className="bg-gray-800"
                    >
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show Current Content Preview */}
              {contentForm.section &&
                contentSections.find((s) => s.id === contentForm.section)
                  ?.currentContent && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      📋 Current Content in this section:
                    </h4>
                    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2 max-h-40 overflow-y-auto">
                      {(() => {
                        const current = contentSections.find(
                          (s) => s.id === contentForm.section,
                        )?.currentContent;
                        if (!current) return null;

                        return Object.entries(current).map(([key, value]) => {
                          if (Array.isArray(value)) {
                            return (
                              <div
                                key={key}
                                className="border-l-2 border-blue-300 pl-2"
                              >
                                <strong className="capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}:
                                </strong>
                                <ul className="ml-4 list-disc">
                                  {value.map((item, idx) => (
                                    <li key={idx} className="text-xs">
                                      {typeof item === "object"
                                        ? `${item.title}: ${item.desc}`
                                        : item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          return (
                            <div
                              key={key}
                              className="border-l-2 border-blue-300 pl-2"
                            >
                              <strong className="capitalize">
                                {key.replace(/([A-Z])/g, " $1")}:
                              </strong>
                              <span className="text-xs block mt-1">
                                {typeof value === "string"
                                  ? value.length > 200
                                    ? value.substring(0, 200) + "..."
                                    : value
                                  : String(value)}
                              </span>
                            </div>
                          );
                        });
                      })()}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 italic">
                      💡 This content is automatically loaded into the form
                      fields below for editing
                    </p>
                  </div>
                )}

              <div className="space-y-2">
                <Label className="text-white">Title</Label>
                <Input
                  value={contentForm.title}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, title: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Description</Label>
                <Textarea
                  value={contentForm.description}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      description: e.target.value,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Full Content</Label>
                <Textarea
                  value={contentForm.content}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, content: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter full content (HTML allowed)"
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Image URL</Label>
                  <Input
                    value={contentForm.image}
                    onChange={(e) =>
                      setContentForm({ ...contentForm, image: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Order</Label>
                  <Input
                    type="number"
                    value={contentForm.order}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        order: parseInt(e.target.value),
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {contentForm.id ? "Update" : "Create"} Content
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Current Site Content Overview */}
        <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Eye className="h-5 w-5 mr-2 text-brand-red" />
              Current Site Content
            </CardTitle>
            <Button
              onClick={loadContent}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contentSections.map((section) => (
                <div
                  key={section.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-brand-red" />
                        {section.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {section.description}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        if (section.currentContent) {
                          setContentForm({
                            id: "",
                            section: section.id,
                            title: section.currentContent.title || "",
                            description:
                              section.currentContent.description || "",
                            image: "",
                            content: JSON.stringify(
                              section.currentContent,
                              null,
                              2,
                            ),
                            order: 0,
                          });
                        }
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:bg-blue-500/10"
                      title="Load content for editing"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  {section.currentContent && (
                    <div className="text-xs text-gray-300 space-y-1 bg-black/20 p-3 rounded border-l-2 border-brand-red/50">
                      {section.currentContent.title && (
                        <div>
                          <strong className="text-brand-red">Title:</strong>{" "}
                          {section.currentContent.title}
                        </div>
                      )}
                      {section.currentContent.description && (
                        <div>
                          <strong className="text-brand-red">
                            Description:
                          </strong>{" "}
                          {section.currentContent.description.substring(0, 100)}
                          {section.currentContent.description.length > 100
                            ? "..."
                            : ""}
                        </div>
                      )}
                      {section.currentContent.companyDescription && (
                        <div>
                          <strong className="text-brand-red">
                            Company Description:
                          </strong>{" "}
                          {section.currentContent.companyDescription.substring(
                            0,
                            100,
                          )}
                          ...
                        </div>
                      )}
                      {section.currentContent.location && (
                        <div>
                          <strong className="text-brand-red">Location:</strong>{" "}
                          {section.currentContent.location}
                        </div>
                      )}
                      {section.currentContent.phone && (
                        <div>
                          <strong className="text-brand-red">Phone:</strong>{" "}
                          {section.currentContent.phone}
                        </div>
                      )}
                      {section.currentContent.email && (
                        <div>
                          <strong className="text-brand-red">Email:</strong>{" "}
                          {section.currentContent.email}
                        </div>
                      )}
                      {section.currentContent.features && (
                        <div>
                          <strong className="text-brand-red">Features:</strong>
                          <ul className="ml-4 list-disc">
                            {section.currentContent.features
                              .slice(0, 2)
                              .map((feature, idx) => (
                                <li key={idx} className="text-xs">
                                  {feature.substring(0, 80)}...
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Custom Content from Database */}
              {content.length > 0 && (
                <>
                  <div className="border-t border-white/20 pt-4">
                    <h5 className="text-white font-medium mb-2 flex items-center">
                      <Database className="h-4 w-4 mr-2 text-brand-red" />
                      Custom Database Content
                    </h5>
                  </div>
                  {content.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-400">
                          {item.section} • Order: {item.order}
                        </p>
                        {item.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.description.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          onClick={() => editContent(item)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:bg-blue-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete content?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this content entry.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteContent(item.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Background Images Section */}
      <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Image className="h-5 w-5 mr-2 text-brand-red" />
            Hero Slideshow Background Images
          </CardTitle>
          <Button
            onClick={addBackgroundImage}
            size="sm"
            className="bg-brand-red hover:bg-red-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backgroundImages.map((image) => (
              <div
                key={image.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white/5 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <Input
                    value={image.name}
                    onChange={(e) =>
                      updateBackgroundImage(image.id, "name", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Image name"
                  />
                  <Input
                    value={image.url}
                    onChange={(e) =>
                      updateBackgroundImage(image.id, "url", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Image URL"
                  />
                </div>
                {image.url && (
                  <div
                    className="w-20 h-12 bg-cover bg-center rounded border border-white/20"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                )}
                <Button
                  onClick={() => removeBackgroundImage(image.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProductsTab = () => {
    // Derived list: filter, sort, paginate
    const filtered = (products as any[]).filter((p) => {
      const q = productSearch.toLowerCase();
      if (!q) return true;
      return (
        (p.name || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      );
    });

    const dir = productSortDir === "asc" ? 1 : -1;
    const sorted = [...filtered].sort((a: any, b: any) => {
      if (productSort === "name") {
        return a.name.localeCompare(b.name) * dir;
      }
      if (productSort === "price") {
        return ((a.price || 0) - (b.price || 0)) * dir;
      }
      const at = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bt = b.created_at ? new Date(b.created_at).getTime() : 0;
      return (at - bt) * dir;
    });

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const currentPage = Math.min(productPage, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pagedProducts = sorted.slice(start, start + pageSize);

    return (
      <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Product Form */}
          <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Package className="h-5 w-5 mr-2 text-brand-red" />
                {productForm.id ? "Edit Product" : "Add New Product"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Product Name</Label>
                    <Input
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Price (R)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({ ...productForm, price: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Category</Label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="corporate-gifts" className="bg-gray-800">
                      Corporate Gifts
                    </option>
                    <option value="corporate-clothing" className="bg-gray-800">
                      Clothing
                    </option>
                    <option value="workwear" className="bg-gray-800">
                      Workwear
                    </option>
                    <option
                      value="headwear-and-accessories"
                      className="bg-gray-800"
                    >
                      Headwear & Accessories
                    </option>
                    <option value="safety-gear" className="bg-gray-800">
                      Safety Gear
                    </option>
                    <option value="custom-products" className="bg-gray-800">
                      Custom Products
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter product description"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Image URL</Label>
                  <Input
                    value={productForm.image}
                    onChange={(e) =>
                      setProductForm({ ...productForm, image: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={productForm.inStock}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        inStock: e.target.checked,
                      })
                    }
                    className="rounded border-white/20"
                  />
                  <Label htmlFor="inStock" className="text-white">
                    In Stock
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {productForm.id ? "Update" : "Create"} Product
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-white">Products</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Input
                  value={productSearch}
                  onChange={(e) => { setProductSearch(e.target.value); setProductPage(1); }}
                  placeholder="Search products..."
                  className="bg-white/10 border-white/20 text-white"
                />
                <select
                  value={productSort}
                  onChange={(e) => { setProductSort(e.target.value as any); setProductPage(1); }}
                  className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="created_at" className="bg-gray-800">Newest</option>
                  <option value="name" className="bg-gray-800">Name</option>
                  <option value="price" className="bg-gray-800">Price</option>
                </select>
                <select
                  value={productSortDir}
                  onChange={(e) => { setProductSortDir(e.target.value as any); setProductPage(1); }}
                  className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                >
                  <option value="desc" className="bg-gray-800">Desc</option>
                  <option value="asc" className="bg-gray-800">Asc</option>
                </select>
                <Button
                  onClick={loadProducts}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg:white/10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {sorted.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No products found</p>
                ) : (
                  pagedProducts.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg:white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-400">R{product.price} • {product.category}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          onClick={() => editProduct(product)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:bg-blue-500/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete product?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the product "{product.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteProduct(product.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-3 text-sm text-gray-300">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setProductPage(Math.max(1, currentPage - 1))}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Prev
                  </Button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setProductPage(Math.min(totalPages, currentPage + 1))}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCataloguesTab = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Catalogue Form */}
        <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Download className="h-5 w-5 mr-2 text-brand-red" />
              {catalogueForm.id ? "Edit Catalogue" : "Add New Catalogue"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCatalogueSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Catalogue Name</Label>
                  <Input
                    value={catalogueForm.name}
                    onChange={(e) =>
                      setCatalogueForm({
                        ...catalogueForm,
                        name: e.target.value,
                      })
                    }
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter catalogue name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Category</Label>
                  <select
                    value={catalogueForm.category}
                    onChange={(e) =>
                      setCatalogueForm({
                        ...catalogueForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="corporate-gifts" className="bg-gray-800">
                      Corporate Gifts
                    </option>
                    <option value="clothing" className="bg-gray-800">
                      Clothing
                    </option>
                    <option value="workwear" className="bg-gray-800">
                      Workwear
                    </option>
                    <option value="headwear" className="bg-gray-800">
                      Headwear & Accessories
                    </option>
                    <option value="safety" className="bg-gray-800">
                      Safety Equipment
                    </option>
                    <option value="custom" className="bg-gray-800">
                      Custom Branding
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">PDF URL</Label>
                <Input
                  value={catalogueForm.pdfUrl}
                  onChange={(e) =>
                    setCatalogueForm({
                      ...catalogueForm,
                      pdfUrl: e.target.value,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="https://example.com/catalogue.pdf"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Description</Label>
                <Textarea
                  value={catalogueForm.description}
                  onChange={(e) =>
                    setCatalogueForm({
                      ...catalogueForm,
                      description: e.target.value,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter catalogue description"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {catalogueForm.id ? "Update" : "Create"} Catalogue
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Catalogues List */}
        <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Catalogues</CardTitle>
            <Button
              onClick={loadCatalogues}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {catalogues.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No catalogues found
                </p>
              ) : (
                catalogues.map((catalogue: any) => (
                  <div
                    key={catalogue.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        {catalogue.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {catalogue.category}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => window.open(catalogue.pdf_url, "_blank")}
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:bg-green-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => editCatalogue(catalogue)}
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:bg-blue-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete catalogue?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this catalogue.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteCatalogue(catalogue.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUploadTab = () => (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Upload className="h-5 w-5 mr-2 text-brand-red" />
            Upload Files to Supabase Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">File Type</Label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setUploadType("image")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    uploadType === "image"
                      ? "bg-brand-red text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <Image className="h-4 w-4" />
                  <span>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType("pdf")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    uploadType === "pdf"
                      ? "bg-brand-red text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-white">
                Select {uploadType === "image" ? "Image" : "PDF"} File
              </Label>
              <Input
                id="file"
                type="file"
                accept={uploadType === "image" ? "image/*" : ".pdf"}
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="bg-white/10 border-white/20 text-white file:bg-brand-red file:text-white file:border-0 file:rounded file:px-3 file:py-1"
              />
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (!file) return;
                if (uploadType === "image" && !file.type.startsWith("image/")) return;
                if (uploadType === "pdf" && file.type !== "application/pdf") return;
                setSelectedFile(file);
              }}
              onClick={() => {
                const el = document.getElementById("file") as HTMLInputElement | null;
                el?.click();
              }}
              className="mt-2 border-2 border-dashed border-white/20 hover:border-white/40 transition-colors rounded-xl p-6 text-center cursor-pointer bg-white/5"
            >
              <p className="text-gray-300">
                Drag & drop your {uploadType === "image" ? "image" : "PDF"} here, or click to browse
              </p>
            </div>

            {selectedFile && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Selected:</strong> {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-brand-red h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !selectedFile}
              className="w-full bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white font-bold py-3 rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload to Supabase Storage
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-transparent to-red-600/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,20,60,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-brand-red/50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Home</span>
                </Button>
              </Link>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Manage your W.O.S APEX platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
                <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Connected to Supabase</span>
                <span className="sm:hidden">Online</span>
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30 font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
                <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Mobile Optimized</span>
                <span className="sm:hidden">Mobile</span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="space-y-6">
          <div className="grid w-full grid-cols-2 sm:grid-cols-4 bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                activeTab === "content"
                  ? "bg-brand-red text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Layout className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Content</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                activeTab === "products"
                  ? "bg-brand-red text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Package className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Products</span>
            </button>
            <button
              onClick={() => setActiveTab("catalogues")}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                activeTab === "catalogues"
                  ? "bg-brand-red text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Download className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Catalogues</span>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                activeTab === "upload"
                  ? "bg-brand-red text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Upload className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Upload</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "content" && renderContentTab()}
          {activeTab === "products" && renderProductsTab()}
          {activeTab === "catalogues" && renderCataloguesTab()}
          {activeTab === "upload" && renderUploadTab()}
        </div>
      </div>
    </div>
  );
}
