import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Lock,
  Mail,
  Phone,
  User,
  Building,
} from "lucide-react";

export default function Profile() {
  const { state, updateUser } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [passwords, setPasswords] = useState({ current: "", next: "" });
  const [saving, setSaving] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.user) {
      setForm({
        firstName: state.user.firstName || "",
        lastName: state.user.lastName || "",
        email: state.user.email || "",
        phone: state.user.phone || "",
        company: state.user.company || "",
      });
    }
  }, [state.user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      {
        const { error } = await supabase.auth.updateUser({
          data: {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            company: form.company,
          },
        });
        if (error) throw error;
      }
      updateUser({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        company: form.company,
      });
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setError(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassSaving(true);
    setMessage(null);
    setError(null);
    try {
      if (!passwords.next || passwords.next.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      {
        const { error } = await supabase.auth.updateUser({
          password: passwords.next,
        });
        if (error) throw error;
      }
      setMessage("Password updated");
      setPasswords({ current: "", next: "" });
    } catch (err: any) {
      setError(err?.message || "Failed to update password");
    } finally {
      setPassSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        className="pl-10 bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Last Name</Label>
                    <Input
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      className="bg-white/10 border-white/20 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={form.email}
                      disabled
                      className="pl-10 bg-white/10 border-white/20 text-white opacity-70"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Company</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <Button
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-brand-red to-red-600"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>

                {message && (
                  <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">{message}</span>
                  </div>
                )}
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <Card className="bg-black/50 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={changePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="password"
                      value={passwords.next}
                      onChange={(e) =>
                        setPasswords({ ...passwords, next: e.target.value })
                      }
                      className="pl-10 bg-white/10 border-white/20 text-white"
                      placeholder="At least 6 characters"
                      required
                    />
                  </div>
                </div>

                <Button
                  disabled={passSaving}
                  className="w-full bg-gradient-to-r from-brand-red to-red-600"
                >
                  {passSaving ? "Updating..." : "Update Password"}
                </Button>

                <p className="text-xs text-gray-400">
                  You may receive a confirmation email depending on your
                  provider settings.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
