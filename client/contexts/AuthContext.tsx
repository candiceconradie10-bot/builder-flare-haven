import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  type: "shipping" | "billing";
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };

    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for Supabase session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (!window.supabase) return;

      try {
        const { data: { session } } = await window.supabase.auth.getSession();

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || "",
            firstName: session.user.user_metadata?.firstName || "User",
            lastName: session.user.user_metadata?.lastName || "Name",
            phone: session.user.user_metadata?.phone || "",
            company: session.user.user_metadata?.company || "",
            addresses: session.user.user_metadata?.addresses || [],
          };

          localStorage.setItem("apex_user", JSON.stringify(user));
          localStorage.setItem("apex_token", session.access_token);
          dispatch({ type: "AUTH_SUCCESS", payload: user });
        } else {
          // Clear any stale data
          localStorage.removeItem("apex_user");
          localStorage.removeItem("apex_token");
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("apex_user");
        localStorage.removeItem("apex_token");
      }
    };

    initializeAuth();

    // Listen for auth state changes
    if (window.supabase) {
      const { data: { subscription } } = window.supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const user: User = {
              id: session.user.id,
              email: session.user.email || "",
              firstName: session.user.user_metadata?.firstName || "User",
              lastName: session.user.user_metadata?.lastName || "Name",
              phone: session.user.user_metadata?.phone || "",
              company: session.user.user_metadata?.company || "",
              addresses: session.user.user_metadata?.addresses || [],
            };

            localStorage.setItem("apex_user", JSON.stringify(user));
            localStorage.setItem("apex_token", session.access_token);
            dispatch({ type: "AUTH_SUCCESS", payload: user });
          } else if (event === 'SIGNED_OUT') {
            localStorage.removeItem("apex_user");
            localStorage.removeItem("apex_token");
            dispatch({ type: "LOGOUT" });
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      if (!window.supabase) {
        throw new Error("Supabase client not initialized");
      }

      const { data, error } = await window.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || email,
          firstName: data.user.user_metadata?.firstName || email.split("@")[0].split(".")[0] || "User",
          lastName: data.user.user_metadata?.lastName || email.split("@")[0].split(".")[1] || "Name",
          phone: data.user.user_metadata?.phone || "",
          company: data.user.user_metadata?.company || "",
          addresses: data.user.user_metadata?.addresses || [
            {
              id: "addr_1",
              type: "shipping",
              address: "123 Business Street",
              city: "Johannesburg",
              province: "Gauteng",
              postalCode: "2000",
              country: "South Africa",
              isDefault: true,
            },
          ],
        };

        // Store in localStorage
        localStorage.setItem("apex_user", JSON.stringify(user));
        localStorage.setItem("apex_token", data.session?.access_token || "");

        dispatch({ type: "AUTH_SUCCESS", payload: user });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      if (!window.supabase) {
        throw new Error("Supabase client not initialized");
      }

      // Validation
      if (
        !userData.email ||
        !userData.password ||
        !userData.firstName ||
        !userData.lastName
      ) {
        throw new Error("All required fields must be filled");
      }

      if (userData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const { data, error } = await window.supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone || "",
            company: userData.company || "",
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || "",
          company: userData.company || "",
          addresses: [],
        };

        // Store in localStorage
        localStorage.setItem("apex_user", JSON.stringify(user));
        localStorage.setItem("apex_token", data.session?.access_token || "");

        dispatch({ type: "AUTH_SUCCESS", payload: user });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (window.supabase) {
        await window.supabase.auth.signOut();
      }
      localStorage.removeItem("apex_user");
      localStorage.removeItem("apex_token");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout locally even if Supabase call fails
      localStorage.removeItem("apex_user");
      localStorage.removeItem("apex_token");
      dispatch({ type: "LOGOUT" });
    }
  };

  const updateUser = (userData: Partial<User>): void => {
    dispatch({ type: "UPDATE_USER", payload: userData });

    // Update localStorage
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem("apex_user", JSON.stringify(updatedUser));
    }
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        signup,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
