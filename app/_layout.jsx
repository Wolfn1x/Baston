import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: "#1E0A4A" },
      headerTintColor: "#fff",
      tabBarStyle: { backgroundColor: "#1E0A4A", borderTopColor: "#3D1F7A" },
      tabBarActiveTintColor: "#A78BFA",
      tabBarInactiveTintColor: "#6D28D9",
    }}>
      {/* CAMBIA "index" por "mapa" AQUÍ */}
      <Tabs.Screen name="mapa" options={{ title: "Mapa", tabBarIcon: () => <Text>📍</Text> }}/>
      
      <Tabs.Screen name="alertas" options={{ title: "Alertas", tabBarIcon: () => <Text>🔔</Text> }}/>
      <Tabs.Screen name="estadisticas" options={{ title: "Stats", tabBarIcon: () => <Text>📊</Text> }}/>
      <Tabs.Screen name="basedatos" options={{ title: "BD", tabBarIcon: () => <Text>🗄️</Text> }}/>
    </Tabs>
  );
}