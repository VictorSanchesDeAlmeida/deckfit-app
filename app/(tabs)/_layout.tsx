import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#7af5ff",
          tabBarInactiveTintColor: "rgba(184, 223, 255, 0.58)",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 0.8,
            marginBottom: 3,
          },
          tabBarStyle: {
            position: "absolute",
            width: "90%",
            bottom: 16,
            height: 70,
            // right: 0,
            transform: [{ translateX: "5.5%" }],
            borderRadius: 18,
            paddingTop: 8,
            borderTopWidth: 1,
            borderWidth: 1,
            borderColor: "rgba(122, 245, 255, 0.32)",
            backgroundColor: "rgba(8, 19, 44, 0.6)",
            backdropFilter: "blur(40px)",

            // shadowColor: "#00e7ff",
            // shadowOpacity: 0.2,
            // shadowRadius: 18,
            // shadowOffset: { width: 0, height: 0 },
            elevation: 14,
            ...(Platform.OS === "ios" ? { borderTopWidth: 1 } : {}),
          },
        }}
      >
        <Tabs.Screen
          name="home/page"
          options={{
            tabBarLabel: "HOME",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={focused ? 25 : 23}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="deck/page"
          options={{
            tabBarLabel: "DECKS",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "cards" : "cards-outline"}
                size={focused ? 25 : 23}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/page"
          options={{
            tabBarLabel: "CONFIG",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "cog" : "cog-outline"}
                size={focused ? 25 : 23}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

export const unstable_settings = {
  anchor: "(tabs)",
};
