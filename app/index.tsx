import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, TextInput } from "react-native";

import axios from "axios";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[] | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      // const response = await fetch(
      //     `https://jsonplaceholder.typicode.com/posts`
      // );
      // const data = await response.json();
      // setPosts(data);
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setPosts(data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TextInput placeholder="Filtrar..." value={search} onChangeText={setSearch} />
      <FlatList
        data={posts?.filter((post) => post.title.includes(search)) || []}
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
