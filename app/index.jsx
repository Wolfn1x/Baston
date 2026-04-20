import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!usuario || !password) { 
      setError("Completa todos los campos"); 
      return; 
    }
    
    setLoading(true); 
    setError("");

    try {
      const formData = new FormData();
      formData.append("usuario", usuario);
      formData.append("password", password);
      
      const res = await fetch("http://192.168.137.246/Baston2/php/login.php", {
        method: "POST",
        body: formData,
      });

      const respuesta = await res.json();
      setLoading(false);

      if (respuesta.ok) {
        // Usamos replace para que el usuario no pueda volver al login con el botón de atrás
        router.replace("/mapa");
      } else {
        setError("Usuario o contraseña incorrectos");
        // Mostramos el alert para debug como en tu imagen
        // Alert.alert("Error", JSON.stringify(respuesta));
      }

    } catch (e) {
      setLoading(false);
      setError("Error de conexión: " + e.message);
      console.log("Error detallado:", e);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={s.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={s.inner}>
        <Text style={s.logo}>🦯</Text>
        <Text style={s.title}>Bastón Inteligente</Text>
        <Text style={s.sub}>Sistema de Asistencia IoT</Text>
        
        <View style={s.card}>
          <Text style={s.label}>Usuario</Text>
          <TextInput 
            style={s.input} 
            placeholder="admin" 
            placeholderTextColor="#6D28D9"
            value={usuario} 
            onChangeText={setUsuario} 
            autoCapitalize="none"
          />
          
          <Text style={s.label}>Contraseña</Text>
          <TextInput 
            style={s.input} 
            placeholder="password" 
            placeholderTextColor="#6D28D9"
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
          />
          
          {error ? <Text style={s.error}>{error}</Text> : null}
          
          {loading ? (
            <ActivityIndicator color="#7C3AED" style={{ marginTop: 12 }} />
          ) : (
            <TouchableOpacity style={s.btn} onPress={handleLogin}>
              <Text style={s.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#12002E" },
  inner: { flex: 1, justifyContent: "center", padding: 32 },
  logo: { fontSize: 56, textAlign: "center", marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "600", color: "#fff", textAlign: "center" },
  sub: { fontSize: 13, color: "#9B7CC8", textAlign: "center", marginBottom: 28 },
  card: { 
    backgroundColor: "#1E0A4A", 
    borderRadius: 12, 
    padding: 20, 
    borderWidth: 0.5, 
    borderColor: "#3D1F7A" 
  },
  label: { fontSize: 12, color: "#9B7CC8", marginBottom: 5 },
  input: { 
    backgroundColor: "#12002E", 
    borderRadius: 8, 
    padding: 10, 
    color: "#fff", 
    fontSize: 14, 
    marginBottom: 14, 
    borderWidth: 0.5, 
    borderColor: "#3D1F7A" 
  },
  error: { color: "#F87171", fontSize: 12, marginBottom: 8 },
  btn: { backgroundColor: "#7C3AED", borderRadius: 8, padding: 12, alignItems: "center", marginTop: 4 },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
