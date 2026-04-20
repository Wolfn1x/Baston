# Baston

Aplicacion movil (Expo + React Native) para monitorear un baston inteligente con:
- login
- mapa con ubicacion en tiempo real
- historial de alertas
- vista de estadisticas
- vista de base de datos (tabla de alertas)

El proyecto tambien incluye un backend PHP + MySQL en `php/` para recibir y consultar datos.

## Stack

- Expo / React Native
- Expo Router
- react-native-maps
- PHP (mysqli)
- MySQL

## Estructura del proyecto

```text
app/                Pantallas de la app (login, mapa, tabs)
services/api.js     Cliente de API para login, alertas y estadisticas
php/                Endpoints PHP para MySQL
```

## Requisitos

- Node.js 18+ (recomendado LTS)
- npm
- Expo Go (para probar en celular) o emulador Android/iOS
- Servidor PHP (XAMPP/WAMP/LAMP)
- MySQL con base de datos `baston_db`

## Instalacion y ejecucion (app movil)

```bash
npm install
npm start
```

Tambien puedes usar:

```bash
npm run android
npm run ios
npm run web
```

## Configuracion del backend (PHP + MySQL)

1. Copia la carpeta `php/` dentro de tu servidor web (por ejemplo en `htdocs/Baston2/php`).
2. Crea la base de datos `baston_db`.
3. Asegura las tablas usadas por el codigo:
   - `usuarios` (campos usados: `id`, `username`, `password_hash`, `activo`)
   - `alertas` (campos usados: `id`, `tipo_alerta`, `distancia_cm`, `latitud`, `longitud`, `bateria_pct`, `dispositivo_id`, `fecha_hora`)
   - `ultima_posicion_dispositivo` (campos usados: `idDispositivo`, `latitud`, `longitud`)
4. Ajusta credenciales de MySQL en los archivos PHP si no usas:
   - host: `localhost`
   - user: `root`
   - password: vacio
   - db: `baston_db`

## Endpoints incluidos

- `POST /php/login.php`
  - params: `usuario`, `password`
- `GET /php/alertas.php?limit=50`
- `POST /php/alertas_recibir.php`
  - params: `tipo_alerta`, `distancia_cm`, `latitud`, `longitud`, `bateria_pct`
- `POST /php/posiciones.php`
  - params: `idDispositivo`, `latitud`, `longitud`
- `POST /php/posiciones_get.php`
  - params: `idDispositivo`
- `GET /php/estadisticas.php`

## Importante: URL del backend

Actualmente hay URLs hardcodeadas con IP local. Antes de correr en tu red, ajusta estas rutas:

- `services/api.js`
- `app/index.jsx`
- `app/mapa.jsx`

Usa tu IP local y ruta real de servidor (ejemplo: `http://192.168.1.10/Baston2/php`).

## Notas

- Este proyecto esta orientado a desarrollo/prototipo.
- El backend PHP usa consultas SQL directas sin prepared statements; para produccion, se recomienda reforzar seguridad.

## Licencia

MIT. Revisa el archivo `LICENSE`.

