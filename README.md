# kaiten-addon-test

Минимальный тестовый **Kaiten Add-on**:

- `connector.html` — *iframe connector url* (точка входа, где вызывается `Addon.initialize`).
- `card_buttons` — добавляет кнопки в секцию **Addon Actions** на карточке.
- `card_body_section` — добавляет iframe-панель в тело карточки.

## Запуск

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Откройте локально:
- `http://localhost:8000/connector.html`
- `http://localhost:8000/panel.html`

## Подключение в Kaiten

Kaiten требует HTTPS для ресурсов аддона, поэтому в dev-режиме используйте туннель, например:

```bash
ngrok http 8000
# или cloudflared tunnel --url http://localhost:8000
```

Далее в Kaiten (в нужном пространстве):
1. Откройте **Addons**
2. **Create a new addon**
3. В поле **Iframe connector url** укажите, например:
   - `https://<your-tunnel-domain>/connector.html`

После этого откройте любую карточку:
- в **Addon Actions** появятся кнопки,
- в теле карточки появится секция "Test panel" с iframe.

