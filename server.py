from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"

app = FastAPI(title="kaiten-addon-test")

# Optional: keep CORS open for easier testing. You can lock this down later.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ping")
def ping() -> JSONResponse:
    return JSONResponse(
        {
            "ok": True,
            "ts": datetime.now(timezone.utc).isoformat(),
        }
    )


@app.post("/api/run")
async def run(payload: dict[str, Any]) -> JSONResponse:
    # This is where you will call your real scripts.
    job = str(payload.get("job", "demo"))

    # Demo result
    result = {
        "ok": True,
        "job": job,
        "message": f"Job '{job}' executed (demo).",
        "ts": datetime.now(timezone.utc).isoformat(),
    }
    return JSONResponse(result)


# IMPORTANT: Mount static files last so /api/* routes have priority.
app.mount("/", StaticFiles(directory=str(PUBLIC_DIR), html=True), name="public")
