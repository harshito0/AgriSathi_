from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()

# CORS (Very Important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AgriSathi Backend Running 🚀"}

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    
    file_location = f"temp_{file.filename}"
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ⭐ Dummy AI Prediction (Later replace with real model)
    result = {
        "disease": "Leaf Fungal Infection",
        "confidence": "92%",
        "solution": "Spray Carbendazim fungicide"
    }

    return result