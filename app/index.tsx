import { useUser } from "@/context/user-context";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default function Index() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      // Navegação será feita pelos Redirects abaixo
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowBottom} />
        <Image
          source={require("@/assets/icon/ios-light.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#7af5ff" style={styles.loader} />
      </View>
    );
  }

  // Se não está carregando, redireciona baseado no estado de autenticação
  if (user) {
    return <Redirect href="/(tabs)/home/page" />;
  }

  return <Redirect href="/login/page" />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#050a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGlowTop: {
    position: "absolute",
    top: 200,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(0, 217, 255, 0.18)",
  },
  backgroundGlowBottom: {
    position: "absolute",
    bottom: 200,
    left: -70,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: "rgba(94, 105, 255, 0.2)",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
