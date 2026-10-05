# ITP Inventory

Frontend системы **ITP Inventory** для учета, анализа и инвентаризации долгосрочных активов.

## Локальный запуск

Требования:

- Node.js 18–22
- npm 9+

```bash
npm install --legacy-peer-deps
npm run serve
```

По умолчанию проект доступен на `http://localhost:8080`.

## Сборка

```bash
npm run build
```

## Конфигурация API

Контракты backend API не изменены. Адрес backend задается через переменные окружения:

```env
VUE_APP_BASE_URL=
VUE_APP_BASE_UPLOADS=
VUE_APP_USE_MOCKS=false
VUE_APP_ROUTER_MODE_HISTORY=true
```

Если `VUE_APP_USE_MOCKS=true` или `VUE_APP_BASE_URL` не задан, интерфейс использует встроенный тестовый набор данных. Это позволяет запускать frontend автономно и публиковать preview на Vercel.

## Vercel

Репозиторий содержит `vercel.json` с rewrite для Vue Router history mode.

Для preview с тестовыми данными дополнительных переменных не требуется. Для подключения реального backend в Vercel задайте `VUE_APP_BASE_URL`, `VUE_APP_BASE_UPLOADS` и установите `VUE_APP_USE_MOCKS=false`.

## Языки

Интерфейс поддерживает русский, английский и грузинский языки.
