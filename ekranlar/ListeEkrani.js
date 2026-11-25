import { View, Text, Button } from 'react-native';

export default function ListeEkrani({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Liste Ekranı</Text>
      <Button
        title="Detaya Git"
        onPress={() => navigation.navigate('Detay')}
      />
    </View>
  );
}
