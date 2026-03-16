import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Index() {
    const [posts, setPosts] = useState<
        { id: number; title: string; body: string }[] | null
    >(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState(``);
    const filteredPosts = posts?.filter(p => p.title.includes(search));

    useEffect(() => {
        const loadPosts = async () => {
            // const response = await fetch(
            //     `https://jsonplaceholder.typicode.com/posts`
            // );
            // const data = await response.json();
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`
            );
            setPosts(data);
            setIsLoading(false);
        };

        loadPosts();
    }, []);

    if (isLoading) return <ActivityIndicator size="large" />;

    return (
        <View style={{ flex: 1 }}>
            <Text>Edit app/index.tsx to edit this screen.</Text>
            <TextInput
                placeholder="Buscar..."
                onChangeText={setSearch}
                value={search}
            />
            <FlatList
                data={filteredPosts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontWeight: `bold` }}>
                            {item.title.toUpperCase()}
                        </Text>
                        <Text>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
}
