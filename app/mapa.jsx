import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
// Importamos MapView para el mapa nativo
import MapView, { Marker } from 'react-native-maps';

const BASE_URL = "http://192.168.137.246/baston/php";

export default function Mapa() {
  const [pinBus, setPinBus] = useState({
    latitude: 19.2433, 
    longitude: -103.725,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [ultimaSync, setUltimaSync] = useState(null);

  const getUbicacion = async (idDispositivo = "1") => {
    try {
      const formData = new FormData();
      formData.append("idDispositivo", idDispositivo);

      const res = await fetch(`${BASE_URL}/posiciones_get.php`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (json.ok) {
        setPinBus({
          latitude: parseFloat(json.data.latitud),
          longitude: parseFloat(json.data.longitud),
        });
        setUltimaSync(new Date());
      }
    } catch (e) {
      console.error("Error obteniendo ubicación:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUbicacion();
    const intervalo = setInterval(() => {
      getUbicacion();
    }, 5000); 
    return () => clearInterval(intervalo);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getUbicacion();
  };

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator color="#7C3AED" size="large" />
        <Text style={s.loadingText}>Sincronizando con el Bastón...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={s.screen} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7C3AED" />}
    >
      <View style={s.header}>
        <Text style={s.headerTitle}>🦯 Bastón Inteligente</Text>
        <Text style={s.headerSub}>
          {ultimaSync ? "Última señal: " + ultimaSync.toLocaleTimeString() : "Buscando señal..."}
        </Text>
      </View>

      <View style={s.card}>
        <View style={s.cardHeader}>
          <View style={s.dot} />
          <Text style={s.cardTitle}>Ubicación en Tiempo Real</Text>
        </View>
        
        {/* CONTENEDOR DEL MAPA: Aquí controlamos el tamaño */}
        <View style={s.mapContainer}>
          <MapView 
            style={s.map} 
            region={{
              ...pinBus,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            // Esto evita que el mapa "se robe" el gesto del scroll de la pantalla
            scrollEnabled={true} 
            zoomEnabled={true}
          >
            <Marker coordinate={pinBus} title="Bastón" />
          </MapView>
        </View>

        <View style={s.coords}>
          <View style={s.coordBox}>
            <Text style={s.coordLabel}>Latitud</Text>
            <Text style={s.coordValue}>{pinBus.latitude.toFixed(6)}</Text>
          </View>
          <View style={s.coordBox}>
            <Text style={s.coordLabel}>Longitud</Text>
            <Text style={s.coordValue}>{pinBus.longitude.toFixed(6)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#7C3AED", fontWeight: "600" },
  header: { padding: 20, backgroundColor: "#FFF", borderBottomWidth: 1, borderBottomColor: "#E5E7EB" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1F2937" },
  headerSub: { fontSize: 14, color: "#6B7280" },
  card: { margin: 15, backgroundColor: "#FFF", borderRadius: 15, padding: 15, elevation: 3 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#10B981", marginRight: 8 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#374151" },
  
  // EL TRUCO ESTÁ AQUÍ:
  mapContainer: {
    height: 300, // Altura fija para que no acapare toda la pantalla
    borderRadius: 15,
    overflow: 'hidden', // Para que las esquinas del mapa se vean redondeadas
    backgroundColor: '#E5E7EB'
  },
  map: { 
    width: '100%', 
    height: '100%' 
  },
  
  coords: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  coordBox: { flex: 1, alignItems: "center" },
  coordLabel: { fontSize: 12, color: "#6B7280" },
  coordValue: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
});