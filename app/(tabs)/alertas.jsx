import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { getAlertas } from "../../services/api";

const iconos = { caida: "🆘", obstaculo: "⚠️", inicio: "✅" };
const colores = { caida: "#7F1D1D", obstaculo: "#3D1F7A", inicio: "#064E3B" };

export default function AlertasScreen() {
  const [alertas, setAlertas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const cargar = async () => {
    const data = await getAlertas();
    setAlertas(data);
  };

  useEffect(() => { cargar(); }, []);

  const onRefresh = async () => { setRefreshing(true); await cargar(); setRefreshing(false); };

  const renderItem = ({ item }) => (
    <View style={s.row}>
      <View style={[s.icon, { backgroundColor: colores[item.tipo_alerta] ?? "#3D1F7A" }]}>
        <Text style={{ fontSize: 14 }}>{iconos[item.tipo_alerta] ?? "📍"}</Text>
      </View>
      <View style={s.info}>
        <Text style={s.tipo}>{item.tipo_alerta}</Text>
        <Text style={s.hora}>{item.fecha_hora}</Text>
        {item.distancia_cm ? <Text style={s.dist}>Distancia: {item.distancia_cm} cm</Text> : null}
      </View>
      {/* <Text style={s.bat}>{item.bateria_pct}%</Text> */}
    </View>
  );

  return (
    <FlatList
      style={s.container}
      data={alertas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7C3AED"/>}
      ListHeaderComponent={<Text style={s.header}>Historial de alertas</Text>}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#12002E", padding: 16 },
  header: { fontSize: 16, fontWeight: "500", color: "#A78BFA", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: "#2D1060" },
  icon: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  tipo: { fontSize: 13, color: "#E9D5FF", fontWeight: "500" },
  hora: { fontSize: 11, color: "#9B7CC8" },
  dist: { fontSize: 11, color: "#A78BFA" },
  bat: { fontSize: 12, color: "#4ADE80" },
});