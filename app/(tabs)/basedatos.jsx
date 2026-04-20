import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl, ScrollView } from "react-native";
import { getAlertas } from "../../services/api";

const badges = { obstaculo: { bg: "#3D1F7A", color: "#C4B5FD" }, caida: { bg: "#7F1D1D", color: "#FCA5A5" }, inicio: { bg: "#064E3B", color: "#6EE7B7" } };

export default function BaseDatosScreen() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const cargar = async () => { const res = await getAlertas(100); setData(res); };
  useEffect(() => { cargar(); }, []);
  const onRefresh = async () => { setRefreshing(true); await cargar(); setRefreshing(false); };

  return (
    <View style={s.container}>
      <Text style={s.title}>baston_db → alertas</Text>
      <ScrollView horizontal>
        <View>
          <View style={s.thead}>
            <Text style={[s.th, {width:40}]}>ID</Text>
            <Text style={[s.th, {width:100}]}>Tipo</Text>
            <Text style={[s.th, {width:70}]}>Dist(cm)</Text>
            <Text style={[s.th, {width:120}]}>Fecha</Text>
            <Text style={[s.th, {width:50}]}>Bat%</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#7C3AED"/>}
            renderItem={({ item, index }) => (
              <View style={[s.trow, index % 2 === 0 && s.trowAlt]}>
                <Text style={[s.td, {width:40}]}>{item.id}</Text>
                <View style={{width:100}}>
                  <Text style={[s.badge, {backgroundColor: badges[item.tipo_alerta]?.bg ?? "#3D1F7A", color: badges[item.tipo_alerta]?.color ?? "#C4B5FD"}]}>{item.tipo_alerta}</Text>
                </View>
                <Text style={[s.td, {width:70}]}>{item.distancia_cm ?? "—"}</Text>
                <Text style={[s.td, {width:120}]}>{item.fecha_hora?.slice(0,16)}</Text>
                <Text style={[s.td, {width:50, color:"#4ADE80"}]}>{item.bateria_pct}%</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#12002E", padding: 16 },
  title: { fontSize: 13, fontWeight: "500", color: "#A78BFA", marginBottom: 10 },
  thead: { flexDirection: "row", backgroundColor: "#3D1F7A", paddingVertical: 8, paddingHorizontal: 4 },
  th: { fontSize: 11, fontWeight: "500", color: "#E9D5FF", paddingHorizontal: 4 },
  trow: { flexDirection: "row", paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 0.5, borderBottomColor: "#2D1060" },
  trowAlt: { backgroundColor: "#1A0533" },
  td: { fontSize: 12, color: "#C4B5FD", paddingHorizontal: 4 },
  badge: { fontSize: 11, fontWeight: "500", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, overflow: "hidden", textAlign: "center" },
});