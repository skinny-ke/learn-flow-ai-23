import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'PARENT' | 'TEACHER' | 'ADMIN';
  xp: number;
  level: number;
  coins: number;
  streak: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Demo user data - in real app this would come from backend
  const demoUser: User = {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "STUDENT",
    xp: 1250,
    level: 8,
    coins: 340,
    streak: 12,
    badges: ["first-quiz", "week-streak", "math-master"]
  };

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("eduboost-user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, always login with demo user
      setUser(demoUser);
      localStorage.setItem("eduboost-user", JSON.stringify(demoUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: role.toUpperCase() as User['role'],
        xp: 0,
        level: 1,
        coins: 100,
        streak: 0,
        badges: []
      };
      
      setUser(newUser);
      localStorage.setItem("eduboost-user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduboost-user");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};