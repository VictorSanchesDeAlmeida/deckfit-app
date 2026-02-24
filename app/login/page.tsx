import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AUTH_TOKEN_KEY = "deckfit_auth_token";
const MIN_SPLASH_TIME_MS = 1500;

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkExistingSession = async () => {
      try {
        const [savedToken] = await Promise.all([
          SecureStore.getItemAsync(AUTH_TOKEN_KEY),
          new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_TIME_MS)),
        ]);

        if (savedToken) {
          router.replace("/(tabs)/home/page");
          return;
        }
      } catch {
        Alert.alert("Erro", "Não foi possível validar sua sessão atual.");
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }

        await SplashScreen.hideAsync();
      }
    };

    checkExistingSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert("Atenção", "Por favor, preencha ambos os campos.");
      return;
    }

    if (identifier === "admin" && password === "pass") {
      try {
        const fakeToken = `token_${Date.now()}_${identifier}`;
        await SecureStore.setItemAsync(AUTH_TOKEN_KEY, fakeToken);
        router.replace("/(tabs)/home/page");
      } catch {
        Alert.alert(
          "Erro",
          "Não foi possível salvar sua sessão no dispositivo.",
        );
      }
    } else {
      Alert.alert("Erro de login", "Credenciais inválidas. Tente novamente.");
    }
  };

  if (isCheckingSession) {
    return <View style={styles.safeArea} />;
  }

  return (
    <View
      style={[
        styles.safeArea,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backgroundGlowTop} />
          <View style={styles.backgroundGlowBottom} />

          <View style={styles.card}>
            <View style={styles.badge}>
              <MaterialCommunityIcons
                name="shield-account"
                size={20}
                color="#7af5ff"
              />
              <Text style={styles.badgeText}>DECKFIT SECURE ACCESS</Text>
            </View>

            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.subtitle}>
              Conecte-se ao sistema com sua credencial.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username ou Email</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  size={20}
                  color="#84dfff"
                />
                <TextInput
                  value={identifier}
                  onChangeText={setIdentifier}
                  placeholder="seu.username ou email@dominio.com"
                  placeholderTextColor="rgba(190, 220, 255, 0.55)"
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color="#84dfff"
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="rgba(190, 220, 255, 0.55)"
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
              </View>
            </View>

            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Acessar Sistema</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={18}
                color="#061126"
              />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050a1a",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#050a1a",
  },
  backgroundGlowTop: {
    position: "absolute",
    top: 90,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(0, 217, 255, 0.18)",
  },
  backgroundGlowBottom: {
    position: "absolute",
    bottom: 80,
    left: -70,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: "rgba(94, 105, 255, 0.2)",
  },
  card: {
    backgroundColor: "rgba(8, 19, 44, 0.85)",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(122, 245, 255, 0.35)",
    shadowColor: "#00e7ff",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(15, 38, 77, 0.9)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(122, 245, 255, 0.35)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    color: "#aff7ff",
  },
  title: {
    marginTop: 18,
    fontSize: 34,
    fontWeight: "800",
    color: "#e8f3ff",
    letterSpacing: 0.7,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: "rgba(200, 223, 255, 0.78)",
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
    color: "#b8dfff",
    letterSpacing: 0.4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(135, 171, 255, 0.42)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 8,
    backgroundColor: "rgba(7, 18, 45, 0.85)",
  },
  input: {
    flex: 1,
    color: "#eaf6ff",
    fontSize: 15,
  },
  button: {
    marginTop: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#7af5ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#061126",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
