import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const API_URL =
  'https://openlibrary.org/subjects/science_fiction.json?limit=30';

export default function ListeEkrani() {
  const [kitaplar, setKitaplar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [arama, setArama] = useState('');

  const kitaplariYukle = async () => {
    setYukleniyor(true);
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setKitaplar(json.works);
    } catch (e) {
      console.log(e);
    } finally {
      setYukleniyor(false);
    }
  };

  useEffect(() => {
    kitaplariYukle();
  }, []);

  if (yukleniyor) {
    return (
      <View style={styles.ortala}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const filtrelenmisKitaplar = kitaplar.filter((kitap) =>
    kitap.title.toLowerCase().includes(arama.toLowerCase()),
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.aramaKutusu}
        placeholder="Kitap ara..."
        value={arama}
        onChangeText={setArama}
      />
      <FlatList
        data={filtrelenmisKitaplar}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.satir}>
            <Text style={styles.baslik}>{item.title}</Text>
            <Text style={styles.yazar}>
              {item.authors.length > 0
                ? item.authors[0].name
                : 'Bilinmeyen yazar'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  aramaKutusu: {
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  ortala: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  satir: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  baslik: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  yazar: {
    fontSize: 14,
    color: 'gray',
  },
});
