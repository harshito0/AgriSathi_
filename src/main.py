from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Enable CORS for React frontend
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Models ----------
class LoginModel(BaseModel):
    username: str
    password: str

class FarmerProfile(BaseModel):
    id: str
    name: str
    location: str
    photo: str

class MarketPrice(BaseModel):
    crop: str
    price: str
    market: str

class CropInput(BaseModel):
    landArea: float
    waterSource: str
    season: str

class CropSuggestion(BaseModel):
    crop: str
    notes: str

# ---------- Mock Data ----------
mock_farmers = {
    "F12345": FarmerProfile(
        id="F12345",
        name="Rajesh Kumar",
        location="Varanasi, UP",
        photo="https://i.pravatar.cc/150?img=3"
    )
}

mock_market = {
    "Wheat": MarketPrice(crop="Wheat", price="₹2200/quintal", market="Varanasi Mandi"),
    "Rice": MarketPrice(crop="Rice", price="₹1800/quintal", market="Mirzapur Mandi")
}

mock_crops = [
    {"crop": "Wheat", "seasons": ["Rabi"], "irrigation": ["canal", "borewell"], "minLand": 1, "notes": "Good for moderate water"},
    {"crop": "Rice", "seasons": ["Kharif"], "irrigation": ["rainfed", "canal"], "minLand": 2, "notes": "Needs lots of water"},
    {"crop": "Maize", "seasons": ["Kharif", "Rabi"], "irrigation": ["canal", "borewell"], "minLand": 0.5, "notes": "Quick growing crop"}
]

# ---------- Authentication ----------
@app.post("/login")
def login(user: LoginModel):
    valid_users = {"farmer1": "123", "farmer2": "456"}
    if user.username in valid_users and valid_users[user.username] == user.password:
        return {"token": f"jwt-token-for-{user.username}", "farmerId": "F12345"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# ---------- Farmer Profile ----------
@app.get("/farmer/profile")
def get_farmer_profile(id: str, token: Optional[str] = None):
    if id in mock_farmers:
        return mock_farmers[id]
    raise HTTPException(status_code=404, detail="Farmer not found")

# ---------- Market Prices ----------
@app.get("/market/prices")
def get_market_prices(crop: str, token: Optional[str] = None):
    if crop in mock_market:
        return mock_market[crop]
    raise HTTPException(status_code=404, detail="Crop not found")

# ---------- AI Crop Suggestion ----------
@app.post("/ai/crop-suggestion", response_model=List[CropSuggestion])
def crop_suggestion(data: CropInput, token: Optional[str] = None):
    suggestions = []
    for crop in mock_crops:
        if data.season in crop["seasons"] and data.waterSource in crop["irrigation"] and data.landArea >= crop["minLand"]:
            suggestions.append({"crop": crop["crop"], "notes": crop["notes"]})
    return suggestions if suggestions else [{"crop": "None", "notes": "No suitable crops found"}]
