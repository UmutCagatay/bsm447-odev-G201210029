import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const API_URL =
  'https://openlibrary.org/subjects/science_fiction.json?limit=30';

export default function ListeEkrani() {
  const [kitaplar, setKitaplar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

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

  return (
    <FlatList
      data={kitaplar}
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
  );
}

const styles = StyleSheet.create({
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
