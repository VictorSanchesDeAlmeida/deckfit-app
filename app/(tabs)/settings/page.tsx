import { useUser } from "@/context/user-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const { user, logout } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>Preferências e segurança da conta</Text>
        </View>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={18} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            color: "#b8dfff",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Informações do Usuário
        </Text>
        <Text style={{ color: "#84dfff", fontSize: 14, marginBottom: 4 }}>
          Nome: {user?.name}
        </Text>
        <Text style={{ color: "#84dfff", fontSize: 14 }}>
          Email: {user?.email}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 26,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#e8f3ff",
    letterSpacing: 0.7,
  },
  subtitle: {
    marginTop: 8,
    color: "rgba(184, 223, 255, 0.72)",
    fontSize: 14,
    letterSpacing: 0.2,
  },
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(122, 245, 255, 0.32)",
    backgroundColor: "rgba(8, 19, 44, 0.94)",
  },
  logoutButtonText: {
    color: "rgba(255, 211, 211, 0.95)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.35,
  },
});
