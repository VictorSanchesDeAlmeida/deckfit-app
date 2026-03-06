import { StyleSheet, View } from "react-native";

export function Container({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 34,
    height: "100%",
    // paddingBottom: 200,
  },
});
