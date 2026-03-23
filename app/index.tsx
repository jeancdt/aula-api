import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function Index() {
  const [posts, setPosts] = useState<
    | {
        userId: number;
        id: number;
        title: string;
        body: string;
      }[]
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(``);
  const [filteredUserId, setFilteredUserId] = useState<number | null>(null);
  const filteredPosts = posts?.filter(
    (p) => p.title.includes(search) && (filteredUserId === null || p.userId === filteredUserId),
  );

  const uniqueUserIds = posts ? Array.from(new Set(posts.map((p) => p.userId))).sort((a, b) => a - b) : [];
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setPosts(data);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  if (isLoading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backHomeButton} onPress={() => router.replace("/tabs/home")}>
        <Text style={styles.backHomeButtonText}>Voltar para Home</Text>
      </TouchableOpacity>

      <TextInput placeholder="Buscar..." onChangeText={setSearch} value={search} />

      <TouchableOpacity style={styles.openModalButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.openModalButtonText}>
          {filteredUserId === null ? "Filtrar por ID (Todos)" : `Filtrado: ID ${filteredUserId}`}
        </Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecionar ID de usuário</Text>

            <Pressable
              style={[styles.listItem, filteredUserId === null && styles.listItemActive]}
              onPress={() => {
                setFilteredUserId(null);
                setModalVisible(false);
              }}
            >
              <Text style={[styles.listItemText, filteredUserId === null && styles.listItemTextActive]}>Todos</Text>
            </Pressable>

            <FlatList
              data={uniqueUserIds}
              keyExtractor={String}
              style={styles.list}
              renderItem={({ item }) => (
                <Pressable
                  style={[styles.listItem, filteredUserId === item && styles.listItemActive]}
                  onPress={() => {
                    setFilteredUserId(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[styles.listItemText, filteredUserId === item && styles.listItemTextActive]}>ID: {item}</Text>
                </Pressable>
              )}
            />

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: `bold` }}>{item.title.toUpperCase()}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: { paddingVertical: 8, paddingHorizontal: 8 },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  filterButtonActive: {
    backgroundColor: "#2f6fef",
    borderColor: "#2f6fef",
  },
  filterText: {
    color: "#000",
  },
  filterTextActive: {
    color: "#ffffff",
  },
  openModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#2f6fef",
    alignSelf: "flex-start",
    borderRadius: 8,
    marginVertical: 8,
  },
  openModalButtonText: { color: "#fff", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  list: { marginBottom: 12 },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    marginBottom: 8,
  },
  listItemActive: { backgroundColor: "#2f6fef" },
  listItemText: { color: "#111" },
  listItemTextActive: { color: "#fff" },
  closeButton: {
    marginTop: 6,
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: { color: "#111", fontWeight: "600" },
  backHomeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#2f6fef",
    alignSelf: "flex-start",
    borderRadius: 8,
    marginBottom: 8,
  },
  backHomeButtonText: { color: "#fff", fontWeight: "600" },
});
