# Учебный фронтенд

React + TypeScript + Axios + Redux Toolkit с `create.asyncThunk` — под присланную запись.

```bash
npm install
npm run dev
```

По умолчанию `/api/` проксируется из Vite в локальный PHP на `127.0.0.1:8000`.

Если API уже на Timeweb, создай `.env.local` по образцу `.env.example`, указав `VITE_API_BASE_URL=https://ТВОЙ-ДОМЕН/api/`.

На этом фронтенде реализованы GET, POST, хранение состояния в Redux, обработка ошибок и загрузки, пагинация. Краткий разбор по шагам — в файле `../LESSON.md` из полного архива.
