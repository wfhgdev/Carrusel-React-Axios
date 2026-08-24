## **Carrusel Dinámico de Productos utilizando REACT, Vite, Router DOM, AXIOS, Clean Code, Atomic Design**

Un banner dinámico de productos es un **espacio publicitario digital que cambia su contenido de forma automática según reglas predefinidas o el comportamiento del usuario**. Si se configura para mostrar los productos más caros, el sistema extrae de tu catálogo los artículos con mayor precio y los actualiza en tiempo real.

## Despliegue en Vercel

- [Link en Vercel](https://carrusel-react-axios-blue.vercel.app/)

## **Cómo Funciona**

- **Conexión al catálogo:** El banner se conecta a [API Platzi Escuela JS](https://api.escuelajs.co/api/v1/products) mediante AXIOS.
- **Filtro de valor:** El sistema ordena los artículos de mayor a menor precio y selecciona los primeros de la lista.
- **Actualización automática:** Si el precio de un producto cambia o se agota el stock, el banner muestra el siguiente producto por orden de precio sin intervención manual.

## 🚀 Instalación y Configuración

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

### 1. Clonar el repositorio

```bash
git clone https://github.com/wfhgdev/Carrusel-React-Axios.git
cd carrusel
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador e ingresa a `http://localhost:5173` (o el puerto indicado en la consola).

### 4. Compilar para producción

```bash
npm run build
```

---