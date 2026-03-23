import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function HomeTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="home" color={color} size={size} />;
}

function TesteTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="ellipse-outline" color={color} size={size} />;
}

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tabs.Screen
        name="teste"
        options={{
          title: "Vazia",
          tabBarIcon: TesteTabIcon,
        }}
      />
    </Tabs>
  );
}
