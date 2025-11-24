# Farmer API

This guide describes how the frontend integrates with the Farmer API. It covers the OTP-based verification flow, token-gated updates, single-record lookups, and list endpoints.

## Base URL

- Use the environment-provided base URL, e.g. `http://127.0.0.1:8000`
- All routes are under `GET|POST|PUT|DELETE /api/...`

## Common Headers

- `Accept: application/json`
- `Content-Type: application/json` for requests with bodies
- `Authorization: Bearer <access_token>` is required for all protected read/update endpoints; OTP routes do not require it

## Field Reference (Farmer)

Keys present in responses:
`Farmer_ID`, `Farmer_Code`, `NIC`, `First_Name`, `Last_Name`, `Contact_Number`, `Language`, `Address`,
`AG_Office_ID`, `GN_Division_ID`, `ARPA_ID`, `ADO_ID`, `Profile_Picture`, `Mobile_Verified`, `Verified_At`

---

# Verification Flow

## 1) Request OTP

**POST** `/api/farmers/request-otp`

### Body
```json
{
  "farmer_code": "<string>",
  "mobile": "<string>"
}
```

### Success Response `200`
```json
{
  "sent": true,
  "expires_at": "YYYY-MM-DD HH:MM:SS"
}
```

Notes:

- `farmer_code` is the farmer’s ID/code.
- OTP sent via WhatsApp.
- OTP valid for 5 minutes.

---

## 2) Verify OTP → Receive Access Token

**POST** `/api/farmers/verify-otp`

### Body
```json
{
  "farmer_code": "<string>",
  "otp": "<6-digit string>"
}
```

### Success Response `200`
```json
{
  "verified": true,
  "farmer_id": 123,
  "access_token": "<token>",
  "expires_at": "YYYY-MM-DD HH:MM:SS"
}
```

Behavior:

- Farmer record created if not existing.
- Token valid for 30 minutes.
- Store `farmer_id` & `access_token`.

---

# Protected Update

## Update Farmer Details

**PUT** `/api/farmers/{farmer_id}`

Headers: `Authorization: Bearer <access_token>`

### Body (partial allowed)
```json
{
  "First_Name": "John",
  "Last_Name": "Doe",
  "Contact_Number": "9476XXXXXXX",
  "Language": "si|ta|en",
  "Address": "...",
  "AG_Office_ID": 1,
  "GN_Division_ID": 2,
  "ARPA_ID": 3,
  "ADO_ID": 4,
  "Profile_Picture": "https://..."
}
```

### Success Response: `200`
Updated farmer record.

### Errors:
- `403` mobile not verified
- `403` invalid/missing token
- `404` farmer not found

---

# Protected Read: List & Lookups

Requires `Authorization: Bearer <access_token>`.

Returned data is **only for the authorized farmer**.

---

## List All Farmers

**GET** `/api/farmers`

Response: array with only the authorized farmer.

---

## Get by Farmer_Code

**GET** `/api/farmers/by-code/{code}`

Responses:
- `200` object  
- `404` not found

---

## Get by NIC

**GET** `/api/farmers/by-nic/{nic}`

Responses:
- `200` object
- `404` not found

---

## Get by Contact_Number

**GET** `/api/farmers/by-mobile/{mobile}`

Responses:
- `200` first match
- `404` not found

---

## List by AG_Office_ID

**GET** `/api/farmers/by-ag-office/{id}`

Response: array of matching farmers (often zero or one).

---

## List by GN_Division_ID

**GET** `/api/farmers/by-gn-division/{id}`

Response: array

---

## List by ARPA_ID

**GET** `/api/farmers/by-arpa/{id}`

Response: array

---

## List by ADO_ID

**GET** `/api/farmers/by-ado/{id}`

Response: array

---

# Delete Farmer

**DELETE** `/api/farmers/{farmer_id}`

Headers: Authorization required.

### Success Response `200`
Empty JSON.

### Errors
- `404` not found
- `403` token belongs to another farmer
- `409` conflict (rare; FK constraints)

---

# Typical Frontend Sequence

1. Request OTP  
2. Verify OTP  
3. Store `farmer_id` + `access_token`  
4. Update farmer  
5. Fetch records for UI as needed  

---

# Examples

## Request OTP
```bash
curl -X POST "{BASE_URL}/api/farmers/request-otp"   -H "Accept: application/json"   -H "Content-Type: application/json"   -d '{"farmer_code":"111","mobile":"94764588828"}'
```

## Verify OTP
```bash
curl -X POST "{BASE_URL}/api/farmers/verify-otp"   -H "Accept: application/json"   -H "Content-Type: application/json"   -d '{"farmer_code":"111","otp":"123456"}'
```

## Update Farmer
```bash
curl -X PUT "{BASE_URL}/api/farmers/{farmer_id}"   -H "Accept: application/json"   -H "Content-Type: application/json"   -H "Authorization: Bearer {access_token}"   -d '{"First_Name":"John","Last_Name":"Doe"}'
```

## Get by Code
```bash
curl -X GET "{BASE_URL}/api/farmers/by-code/111"   -H "Accept: application/json"   -H "Authorization: Bearer {access_token}"
```

## List by AG Office
```bash
curl -X GET "{BASE_URL}/api/farmers/by-ag-office/1"   -H "Accept: application/json"   -H "Authorization: Bearer {access_token}"
```

## List All Farmers
```bash
curl -X GET "{BASE_URL}/api/farmers"   -H "Accept: application/json"   -H "Authorization: Bearer {access_token}"
```

## Delete Farmer
```bash
curl -X DELETE "{BASE_URL}/api/farmers/{farmer_id}"   -H "Accept: application/json"   -H "Authorization: Bearer {access_token}"
```
