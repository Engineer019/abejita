# Tienda Online - Django + React

Backend en Django REST Framework con JWT (raíz del repositorio) y frontend en React + Vite (carpeta `frontend/`).

## Requisitos
- Python 3.10 o superior
- Node.js 20 o superior
- MySQL 8.0 o superior

## Backend
1. Crear la base de datos en MySQL: `CREATE DATABASE django_api;`
2. Crear y activar el entorno virtual:
   ```
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Instalar dependencias: `pip install -r requirements.txt`
4. Revisar usuario y contraseña de MySQL en `tienda_online/settings.py` (variable `DATABASES`).
5. Migrar y crear superusuario:
   ```
   python manage.py migrate
   python manage.py createsuperuser
   ```
6. Iniciar el servidor: `python manage.py runserver`

Swagger: http://127.0.0.1:8000/swagger/

## Frontend
```
cd frontend
npm install
copy .env.example .env
npm run dev
```
Abrir http://localhost:5173

## Endpoints principales
- `POST /api/v1/auth/register/` registro de usuarios
- `POST /api/v1/auth/token/` login (devuelve el token JWT)
- `GET /api/v1/auth/me/` datos del usuario autenticado (requiere token)
- `GET /api/v1/soap/pais/<codigo>/` consumo de un servicio SOAP con zeep