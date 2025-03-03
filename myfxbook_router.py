from fastapi import FastAPI, HTTPException, Form, APIRouter
import requests

# Initialize FastAPI router
myfxbook_router = APIRouter(prefix="/myfxbook")

# Myfxbook API Base URL
MYFXBOOK_BASE_URL = "https://www.myfxbook.com/api"

# Function to authenticate and get an access token
def authenticate(email: str, password: str):
    url = f"{MYFXBOOK_BASE_URL}/login.json?email={email}&password={password}"
    response = requests.post(url)
    data = response.json()

    if "session" not in data:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return data["session"]

# Function to fetch all accounts using an access token
def fetch_accounts(session: str):
    url = f"{MYFXBOOK_BASE_URL}/get-my-accounts.json?session={session}"
    response = requests.get(url)
    data = response.json()

    if "accounts" not in data:
        raise HTTPException(status_code=400, detail="Failed to fetch accounts")
    
    return data["accounts"]

# Function to fetch details of a specific account using an access token
def fetch_account_details(session: str, account_id: str):
    # Fetch basic account information
    accounts_url = f"{MYFXBOOK_BASE_URL}/get-my-accounts.json?session={session}"
    accounts_response = requests.get(accounts_url)
    accounts_data = accounts_response.json()

    if "accounts" not in accounts_data:
        raise HTTPException(status_code=400, detail="Failed to fetch accounts")

    # Find the specific account
    account_info = None
    for account in accounts_data["accounts"]:
        if str(account.get("id")) == account_id:
            account_info = account
            break

    if not account_info:
        raise HTTPException(status_code=404, detail="Account not found")

    # Fetch detailed history
    history_url = f"{MYFXBOOK_BASE_URL}/get-history.json?session={session}&id={account_id}"
    history_response = requests.get(history_url)
    history_data = history_response.json()

    if "history" not in history_data:
        raise HTTPException(status_code=400, detail="Failed to fetch account history")

    # Fetch daily gain
    daily_gain_url = f"{MYFXBOOK_BASE_URL}/get-daily-gain.json?session={session}&id={account_id}"
    daily_gain_response = requests.get(daily_gain_url)
    daily_gain_data = daily_gain_response.json()

    # Fetch open trades
    open_trades_url = f"{MYFXBOOK_BASE_URL}/get-open-trades.json?session={session}&id={account_id}"
    open_trades_response = requests.get(open_trades_url)
    open_trades_data = open_trades_response.json()

    # Combine all data
    return {
        "account_info": account_info,
        "history": history_data["history"],
        "daily_gain": daily_gain_data.get("dailyGain", []),
        "open_trades": open_trades_data.get("openTrades", [])
    }

# Endpoint to authenticate and fetch accounts
@myfxbook_router.post("/fetch_accounts")
async def fetch_accounts_endpoint(email: str = Form(...), password: str = Form(...)):
    session = authenticate(email, password)
    accounts = fetch_accounts(session)
    return {"session": session, "accounts": accounts}

# Endpoint to fetch a specific account's details using the session token
@myfxbook_router.post("/fetch_account_details")
async def fetch_account_details_endpoint(
    session: str = Form(...), 
    account_id: str = Form(...)
):
    account_details = fetch_account_details(session, account_id)
    return account_details

# Endpoint to fetch account details by accountId (without requiring session)
@myfxbook_router.post("/fetch_account_by_id")
async def fetch_account_by_id_endpoint(
    email: str = Form(...),
    password: str = Form(...),
    account_id: str = Form(...)
):
    session = authenticate(email, password)
    account_details = fetch_account_details(session, account_id)
    return account_details

# Initialize FastAPI app
app = FastAPI()
app.include_router(myfxbook_router) 