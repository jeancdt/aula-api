import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
			<Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 16 }}>Tela Home</Text>

			<Pressable
				onPress={() => router.push("/")}
				style={{ backgroundColor: "#2f6fef", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginBottom: 10 }}
			>
				<Text style={{ color: "#fff", fontWeight: "600" }}>Ir para listagem</Text>
			</Pressable>

			<Pressable
				onPress={() => router.push("/tabs/teste")}
				style={{ backgroundColor: "#2f6fef", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 }}
			>
				<Text style={{ color: "#fff", fontWeight: "600" }}>Ir para tela vazia</Text>
			</Pressable>
		</View>
	);
}
