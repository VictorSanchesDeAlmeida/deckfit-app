import { UserProvider } from "@/context/user-context";
import { ThemeProvider } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync().catch(() => {
  return;
});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const hideNavigationBar = async () => {
      try {
        await NavigationBar.setVisibilityAsync("hidden");
      } catch {
        return;
      }
    };

    hideNavigationBar();
  }, []);

  return (
    <ThemeProvider
      value={{
        dark: true,
        colors: {
          primary: "rgb(0, 122, 255)", // Azul tech vibrante (ação principal)
          background: "rgb(10, 18, 40)", // Azul noite profundo
          card: "rgb(18, 28, 60)", // Azul escuro levemente elevado
          text: "rgb(230, 240, 255)", // Branco azulado suave
          border: "rgb(40, 60, 120)", // Azul acinzentado para divisórias
          notification: "rgb(0, 199, 255)", // Azul ciano neon (alertas/info)
        },
        fonts: {
          regular: {
            fontFamily: "System",
            fontWeight: "400",
          },
          medium: {
            fontFamily: "System",
            fontWeight: "500",
          },
          bold: {
            fontFamily: "System",
            fontWeight: "700",
          },
          heavy: {
            fontFamily: "System",
            fontWeight: "900",
          },
        },
      }}
    >
      <UserProvider>
        <Stack>
          <Stack.Screen name="login/page" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
