import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

export function Input({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "default",
}: {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  type?: "default" | "email" | "password";
}) {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={20} color="#84dfff" />
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="rgba(190, 220, 255, 0.55)"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={type === "email" ? "email-address" : "default"}
          returnKeyType="next"
          secureTextEntry={type === "password"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
