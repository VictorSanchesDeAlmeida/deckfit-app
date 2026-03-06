import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <View style={styles.searchBar}>
      <MaterialCommunityIcons name="magnify" size={20} color="#84dfff" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="rgba(190, 220, 255, 0.55)"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(135, 171, 255, 0.42)",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#fff",
  },
});
