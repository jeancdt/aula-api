import { Text, View } from 'react-native';

export default function Aguarde({ message = 'Aguarde...' }) {
    return (
        <View>
            <Text>{message}</Text>
        </View>
    );
}
