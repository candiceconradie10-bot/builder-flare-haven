import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [products, setProducts] = useState([]);
  const [content, setContent] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'image' | 'pdf'>('image');

  // Product Form State
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true
  });

  // Content Form State
  const [contentForm, setContentForm] = useState({
    id: '',
    section: '',
    title: '',
    description: '',
    image: '',
    order: 0
  });

  // Initialize Supabase functions
  useEffect(() => {
    // Add custom upload function to window
    window.uploadFile = async (file: File) => {
      try {
        // @ts-ignore
        const { data, error } = await window.supabase.storage
          .from('uploads')
          .upload(`images/${file.name}`, file);
          
        if (error) {
          console.error('Upload error:', error);
          return { error };
        } else {
          console.log('Uploaded:', data);
          return { data };
        }
      } catch (err) {
        console.error('Upload function error:', err);
        return { error: err };
      }
    };

    loadProducts();
    loadContent();
  }, []);

  // Load products from Supabase
  const loadProducts = async () => {
    try {
      setLoading(true);
      // @ts-ignore
      const { data, error } = await window.supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Load products error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load content from Supabase
  const loadContent = async () => {
    try {
      // @ts-ignore
      const { data, error } = await window.supabase
        .from('content')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        console.error('Error loading content:', error);
      } else {
        setContent(data || []);
      }
    } catch (err) {
      console.error('Load content error:', err);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
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

      alert('File uploaded successfully!');
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
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
        in_stock: productForm.inStock
      };

      // @ts-ignore
      let result;
      if (productForm.id) {
        // Update existing product
        result = await window.supabase
          .from('products')
          .update(productData)
          .eq('id', productForm.id);
      } else {
        // Create new product
        result = await window.supabase
          .from('products')
          .insert([productData]);
      }

      if (result.error) {
        throw result.error;
      }

      alert('Product saved successfully!');
      setProductForm({
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        inStock: true
      });
      
      loadProducts();
    } catch (error) {
      alert('Save failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      setLoading(true);
      // @ts-ignore
      const { error } = await window.supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('Product deleted successfully!');
      loadProducts();
    } catch (error) {
      alert('Delete failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const editProduct = (product: any) => {
    setProductForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      inStock: product.in_stock
    });
  };

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
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setUploadType('image')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    uploadType === 'image' 
                      ? 'bg-brand-red text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Image className="h-4 w-4" />
                  <span>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('pdf')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    uploadType === 'pdf' 
                      ? 'bg-brand-red text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-white">
                Select {uploadType === 'image' ? 'Image' : 'PDF'} File
              </Label>
              <Input
                id="file"
                type="file"
                accept={uploadType === 'image' ? 'image/*' : '.pdf'}
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="bg-white/10 border-white/20 text-white file:bg-brand-red file:text-white file:border-0 file:rounded file:px-3 file:py-1"
              />
            </div>

            {selectedFile && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
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

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Form */}
        <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Package className="h-5 w-5 mr-2 text-brand-red" />
              {productForm.id ? 'Edit Product' : 'Add New Product'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProductSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Product Name</Label>
                  <Input
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Category</Label>
                <Input
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Description</Label>
                <Textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
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
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({...productForm, inStock: e.target.checked})}
                  className="rounded border-white/20"
                />
                <Label htmlFor="inStock" className="text-white">In Stock</Label>
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
                {productForm.id ? 'Update' : 'Create'} Product
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Products</CardTitle>
            <Button
              onClick={loadProducts}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No products found</p>
              ) : (
                products.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
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
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

  const renderContentTab = () => (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <FileText className="h-5 w-5 mr-2 text-brand-red" />
            Content Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-center py-8">
            Content management features coming soon...
          </p>
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
                  Back to Home
                </Button>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400">Manage your APEX platform</p>
                </div>
              </div>
            </div>

            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 font-bold px-4 py-2 rounded-full">
              <Database className="h-4 w-4 mr-2" />
              Connected to Supabase
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="space-y-6">
          <div className="grid w-full grid-cols-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                activeTab === 'upload' 
                  ? 'bg-brand-red text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">File Upload</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                activeTab === 'products' 
                  ? 'bg-brand-red text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
                activeTab === 'content' 
                  ? 'bg-brand-red text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'upload' && renderUploadTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'content' && renderContentTab()}
        </div>
      </div>
    </div>
  );
}
