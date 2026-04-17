http://localhost:4000/health  // puerto de servidor (app.js)
# Backend - Traductor Español → Palenquero

## Descripción

Este proyecto es un **backend desarrollado en Node.js con Express** que implementa un **motor de traducción lingüística** desde español hacia lengua palenquera.

Este sistema incluye las siguientes caracteristicas al momento de traducir las palabras:

* Normalización de texto (tildes)
* Tokenización
* Detección de frases compuestas
* Traducción basada en diccionario
* Conservación de signos de puntuación
* Manejo de mayúsculas

## Cómo funciona el traductor?

El flujo de procesamiento es el siguiente:

1. Entrada del texto
2. Normalización (eliminación de tildes)
3. Tokenización del texto
4. Limpieza de tokens (remover signos)
5. Detección de frases compuestas (2 o 3 palabras)
6. Búsqueda en diccionario
7. Reconstrucción del texto traducido
8. Identificación de palabras desconocidas

Ejemplo:

```json
Entrada:
"¿Así es?" //o otras palabras

Salida:
"¿Asina_jue?"

## Estructura del proyecto

```
backend/
│
├── src/
│   ├── controllers/
│   │   ├── translateController.js
│   │   ├── dictionaryController.js
│   │   └── statsController.js
│   │
│   ├── routes/
│   │   ├── translateRoutes.js
│   │   ├── dictionaryRoutes.js
│   │   └── statsRoutes.js
│   │
│   ├── services/
│   │   ├── translateService.js
│   │   └── dictionaryService.js
│   │
│   ├── linguisticEngine/
│   │   ├── dictionary.js
│   │   ├── tokenizer.js
│   │   └── translator.js
│   │
│   └── middlewares/
│       ├── errorMiddleware.js
│       └── notFoundMiddleware.js
│
├── server.js
├── package.json
└── README.md

## Instalación

1. Clonar el repositorio

```bash
git clone <repo-url>

2. Entrar al backend

```bash
cd backend

3. Instalar dependencias

```bash
npm install

4. Ejecutar el servidor

```bash
npm start

Servidor en:
http://localhost:4001


## Endpoints (API v1)

### Traducción

http
POST /api/v1/translate

Body:

```json
{
  "text": "Hoy agua azul"
}

Respuesta:

```json
{
  "ok": true,
  "original": "Hoy agua azul",
  "translation": "Agüe apu asú",
  "tokens": ["Hoy", "agua", "azul"],
  "unknownWords": []
}

### Diccionario completo

```http
GET /api/v1/dictionary

### Buscar palabra

```http
GET /api/v1/dictionary/:word

### Estadísticas

```http
GET /api/v1/stats
```

Respuesta:

```json
{
  "ok": true,
  "data": {
    "totalDictionaryWords": 28,
    "availableEndpoints": [
      "/api/v1/translate",
      "/api/v1/dictionary",
      "/api/v1/dictionary/:word",
      "/api/v1/stats"
    ]
  }
}

## Características principales

* Traducción palabra por palabra
* Traducción de frases compuestas
* Soporte de tildes
* Manejo de signos: ¿ ? ¡ !
* Conservación de puntuación
* Manejo de mayúsculas
* Identificación de palabras desconocidas
* API versionada

## Ejemplos

### Entrada

```json
{
  "text": "¿Hoy planta medicinal?"
}

### Salida

```json
{
  "translation": "¿Agüe anamú?"
}

## Tecnologías utilizadas

* Node.js
* Express
* JavaScript (ES6)
* Thunder Client (testing)

## Autor

Proyecto universitario - Traductor Español a Palenquero
**Integrantes de trabajo
Jeffry Salazar Tapia----encargado de Backend
Kiara Galvis Caballero----encargada de fronted
Diego Armando Casseres----encargado de base de datos de palabras español--palenquero**

## Estado del proyecto

✅ Backend completo

* Motor lingüístico funcional
* API estructurada
* Listo para integración con frontend

## Próximos pasos

* Integración con frontend
* Expansión del diccionario
* Mejora del motor lingüístico
* Soporte de frases más complejas

---------------------- ///// --------------------------/////-----------------------------------/////----------------------/////-----------------------

Este proyecto demuestra la implementación de un sistema de traducción basado en reglas lingüísticas y procesamiento de texto natural básico.