import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
} from "lucide-react";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

interface PaymentInfo {
  method: "card" | "eft" | "payfast";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

export default function Checkout() {
  const { state, clearCart } = useCart();
  const { state: authState } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });

  // Pre-fill customer information from auth context
  useEffect(() => {
    if (authState.user) {
      setCustomerInfo({
        firstName: authState.user.firstName,
        lastName: authState.user.lastName,
        email: authState.user.email,
        phone: authState.user.phone || "",
        company: authState.user.company || "",
      });

      // Pre-fill shipping address if available
      const defaultAddress =
        authState.user.addresses?.find((addr) => addr.isDefault) ||
        authState.user.addresses?.[0];
      if (defaultAddress) {
        setShippingAddress({
          address: defaultAddress.address,
          city: defaultAddress.city,
          province: defaultAddress.province,
          postalCode: defaultAddress.postalCode,
          country: defaultAddress.country,
        });
      }
    }
  }, [authState.user]);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
  });

  const [billingDifferent, setBillingDifferent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = state.total;
  const shipping = subtotal >= 500 ? 0 : 50;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and show success
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: `Your order total was R${total.toFixed(2)}. You will receive a confirmation email shortly.`,
      });

      navigate("/order-confirmation");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              No items in cart
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link to="/">
              <Button className="bg-brand-red hover:bg-brand-red/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-brand-red">
              Home
            </Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-brand-red">
              Cart
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          {authState.user && (
            <p className="text-muted-foreground">
              Welcome back,{" "}
              <span className="text-brand-red font-medium">
                {authState.user.firstName}
              </span>
              ! Complete your order below.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={customerInfo.firstName}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={customerInfo.lastName}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        required
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={customerInfo.company}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            company: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Textarea
                      id="address"
                      required
                      rows={2}
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <Input
                        id="province"
                        required
                        value={shippingAddress.province}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            province: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        required
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={shippingAddress.country}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={paymentInfo.method}
                    onValueChange={(value) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        method: value as "card" | "eft" | "payfast",
                      })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eft" id="eft" />
                      <Label htmlFor="eft">EFT/Bank Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="payfast" id="payfast" />
                      <Label htmlFor="payfast">PayFast</Label>
                    </div>
                  </RadioGroup>

                  {paymentInfo.method === "card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          required
                          value={paymentInfo.cardName || ""}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          required
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber || ""}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            required
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate || ""}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                expiryDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            required
                            placeholder="123"
                            value={paymentInfo.cvv || ""}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentInfo.method === "eft" && (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground">
                        Bank transfer details will be provided after order
                        confirmation. Your order will be processed once payment
                        is received.
                      </p>
                    </div>
                  )}

                  {paymentInfo.method === "payfast" && (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to PayFast to complete your
                        payment securely.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) =>
                        setTermsAccepted(checked as boolean)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-brand-red hover:underline"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-brand-red hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      . I understand that my order will be processed according
                      to these terms.
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-muted-foreground">
                            Qty: {item.quantity} × R{item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-medium">
                          R{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>R{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `R${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (15%)</span>
                      <span>R{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>R{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button
                      type="submit"
                      className="w-full bg-brand-red hover:bg-brand-red/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          <Shield className="h-4 w-4 mr-2" />
                          Place Order - R{total.toFixed(2)}
                        </>
                      )}
                    </Button>
                    <Link to="/cart" className="block w-full">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                      </Button>
                    </Link>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    <Shield className="h-4 w-4 mx-auto mb-1" />
                    Your payment information is secure and encrypted
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
