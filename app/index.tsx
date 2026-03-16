import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Aguarde from './Components/Loading';

export default function Index() {
    const [posts, setPosts] = useState<
        { id: number; title: string; body: string }[] | null
    >(null);

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts`
            );
            const data = await response.json();
            setPosts(data);
        };

        loadPosts();
    }, []);

    if (!posts) return <Aguarde message="Calma respira" />;

    return (
        <View style={{ flex: 1 }}>
            <Text>Edit app/index.tsx to edit this screen.</Text>
            <FlatList
                data={posts}
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
