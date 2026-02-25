import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type UserTypeContext = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  login: ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => void;
  logout: () => void;
};

const UserContext = createContext<UserTypeContext | null>(null);

const AUTH_TOKEN_KEY = "deckfit_auth_token";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserTypeContext["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        if (token) {
          // Se tem token, considera o usuário logado
          setUser({
            id: "1",
            name: "Administrador",
            email: "admin@admin.com",
          });
        }
      } catch (error) {
        console.log("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => {
    if (!identifier || !password) {
      Alert.alert("Atenção", "Por favor, preencha ambos os campos.");
      return;
    }

    if (identifier === "admin" && password === "pass") {
      const fakeToken = "fake-jwt-token-for-demo";
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, fakeToken);
      setUser({
        id: "1",
        name: "Administrador",
        email: "admin@admin.com",
      });
      router.replace("/(tabs)/home/page");
    } else {
      Alert.alert("Erro", "Credenciais inválidas. Tente novamente.");
      return;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setUser(null);
      router.replace("/login/page");
    } catch {
      Alert.alert("Erro", "Não foi possível finalizar sua sessão.");
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
