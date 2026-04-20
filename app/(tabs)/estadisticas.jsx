import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { getEstadisticas } from "../../services/api";

export default function EstadisticasScreen() {
  const [data, setData] = useState({ conteo: {}, ubicacion: null });
  const [refreshing, setRefreshing] = useState(false);

  const cargar = async () => { const res = await getEstadisticas(); setData(res); };
  useEffect(() => { cargar(); }, []);
  const onRefresh = async () => { setRefreshing(true); await cargar(); setRefreshing(false); };

  return (
    <ScrollView style={s.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7C3AED"/>}>
      <View style={s.metricRow}>
        <View style={s.metric}><Text style={s.val}>{data.conteo?.obstaculo ?? 0}</Text><Text style={s.lbl}>Obstáculos</Text></View>
        <View style={s.metric}><Text style={[s.val,{color:"#F87171"}]}>{data.conteo?.caida ?? 0}</Text><Text style={s.lbl}>Caídas</Text></View>
        <View style={s.metric}><Text style={[s.val,{color:"#4ADE80"}]}>{data.conteo?.inicio ?? 0}</Text><Text style={s.lbl}>Inicios</Text></View>
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>Resumen técnico</Text>
        <View style={s.row}><View style={[s.dot,{backgroundColor:"#4ADE80"}]}/><Text style={s.rowLbl}>Tiempo respuesta sensor</Text><Text style={s.rowVal}>&lt;500ms</Text></View>
        <View style={s.row}><View style={[s.dot,{backgroundColor:"#4ADE80"}]}/><Text style={s.rowLbl}>Precisión GPS</Text><Text style={s.rowVal}>2.5m CEP</Text></View>
        <View style={s.row}><View style={[s.dot,{backgroundColor:"#4ADE80"}]}/><Text style={s.rowLbl}>Autonomía estimada</Text><Text style={s.rowVal}>8–12 horas</Text></View>
        <View style={s.row}><View style={[s.dot,{backgroundColor:"#FCD34D"}]}/><Text style={s.rowLbl}>Batería actual</Text><Text style={s.rowVal}>85%</Text></View>
        <View style={s.progress}><View style={[s.progressFill,{width:"85%"}]}/></View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#12002E", padding: 16 },
  metricRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  metric: { flex: 1, backgroundColor: "#1E0A4A", borderRadius: 8, padding: 12, alignItems: "center", borderWidth: 0.5, borderColor: "#3D1F7A" },
  val: { fontSize: 22, fontWeight: "600", color: "#A78BFA" },
  lbl: { fontSize: 11, color: "#9B7CC8", marginTop: 3 },
  card: { backgroundColor: "#1E0A4A", borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 0.5, borderColor: "#3D1F7A" },
  cardTitle: { fontSize: 13, fontWeight: "500", color: "#A78BFA", marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  rowLbl: { flex: 1, fontSize: 13, color: "#E9D5FF" },
  rowVal: { fontSize: 12, color: "#9B7CC8" },
  progress: { height: 4, backgroundColor: "#2D1060", borderRadius: 2, marginTop: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#4ADE80", borderRadius: 2 },
});