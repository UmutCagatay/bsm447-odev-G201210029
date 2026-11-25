import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ListeEkrani from './ekranlar/ListeEkrani';
import DetayEkrani from './ekranlar/DetayEkrani';
import KaydedilenlerEkrani from './ekranlar/KaydedilenlerEkrani';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Sekmeler() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Liste') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Kaydedilenler') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Liste" component={ListeEkrani} />
      <Tab.Screen name="Kaydedilenler" component={KaydedilenlerEkrani} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sekmeler"
          component={Sekmeler}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detay" component={DetayEkrani} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
