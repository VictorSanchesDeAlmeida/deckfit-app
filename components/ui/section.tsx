import { ScrollView, StyleSheet, Text, View } from "react-native";

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionDot} />
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionSeparator} />
      </View>
      <ScrollView
        // showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12 }}
      >
        <View style={styles.sectionContent}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#84dfff",
    boxShadow: "0px 0px 10px 2px rgba(211, 236, 245, 0.59)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  sectionSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(173, 179, 255, 0.59)",
  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
    width: "100%",
    paddingBottom: 280,
  },
});
