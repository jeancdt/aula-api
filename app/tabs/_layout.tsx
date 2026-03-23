import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function HomeTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="home" color={color} size={size} />;
}

function TesteTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="ellipse-outline" color={color} size={size} />;
}

function BuscaTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="search" color={color} size={size} />;
}

function MensagemTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="chatbubble" color={color} size={size} />;
}

function VideoTabIcon({ color, size }: Readonly<{ color: string; size: number }>) {
  return <Ionicons name="videocam" color={color} size={size} />;
}

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "blue", tabBarShowLabel: false }}>
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
      <Tabs.Screen
        name="busca"
        options={{
          title: "Busca",
          tabBarIcon: BuscaTabIcon,
        }}
      />
      <Tabs.Screen
        name="mensagem"
        options={{
          title: "Mensagem",
          tabBarIcon: MensagemTabIcon,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: "Vídeo",
          tabBarIcon: VideoTabIcon,
        }}
      />
    </Tabs>
  );
}
