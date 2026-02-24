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
  login: ({
    identifier,
    password,
  }: {
    identifier: string;
    password: string;
  }) => void;
  logout: () => void;
  verifySession: () => Promise<void>;
};

const UserContext = createContext<UserTypeContext | null>(null);

const MIN_SPLASH_TIME_MS = 1500;
const AUTH_TOKEN_KEY = "deckfit_auth_token";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserTypeContext["user"]>(null);

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

  const verifySession = async () => {
    try {
      const [savedToken] = await Promise.all([
        SecureStore.getItemAsync(AUTH_TOKEN_KEY),
        new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_TIME_MS)),
      ]);

      if (savedToken) {
        setUser({
          id: "1",
          name: "Administrador",
          email: "admin@admin.com",
        });
        router.replace("/(tabs)/home/page");
      }
    } catch {
      Alert.alert("Erro", "Não foi possível validar sua sessão atual.");
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, verifySession }}>
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
