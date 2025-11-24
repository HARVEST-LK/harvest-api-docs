# AG_Office CRUD API

This document explains how frontend clients use the **AG Office API**, including listing, retrieving, and admin-only create/update/delete operations.

---

## Authentication

All routes require:

```
Authorization: Bearer <token>
```

Token types:

- **Farmer Token** → from OTP flow  
- **Admin Token** → from Admin login  

**Read** routes accept *farmer or admin tokens*.  
**Write** routes require an **admin token**.

---

## Base URL

```
{{baseUrl}}
```

All routes start with:

```
/api
```

---

## AG Office Resource Structure

Each AG Office contains:

- `AG_Office_ID`
- `Office_Name`
- `Address`
- `Contact_Number`
- `Profile_Picture`

---

# Endpoints

---

## 1. List AG Offices

**GET** `/api/ag-offices`

**Headers**

- Accept: application/json  
- Authorization: Bearer `<access_token>` or `<admin_token>`

**Response:** `200 OK` → Array sorted by `AG_Office_ID`

---

## 2. Get AG Office by ID

**GET** `/api/ag-offices/{id}`

**Returns:**

- `200 OK` → Object  
- `404 Not Found` → `[]`

---

## 3. Create AG Office (Admin)

**POST** `/api/ag-offices`  
Admin-only route.

### Body Example

```json
{
  "Office_Name": "AG Sample",
  "Address": "Address",
  "Contact_Number": "000",
  "Profile_Picture": null
}
```

### Responses

- `201 Created`  
- `403 Forbidden`  
- `422 Validation Error`  

---

## 4. Update AG Office (Admin)

**PUT** `/api/ag-offices/{id}`  
Admin-only route.

### Body Example

```json
{
  "Office_Name": "Updated Office"
}
```

### Responses

- `200 OK`  
- `403 Forbidden`  
- `404 Not Found`  
- `422 Validation Error`  

---

## 5. Delete AG Office (Admin)

**DELETE** `/api/ag-offices/{id}`  
Admin-only route.

### Responses

- `200 OK` → `[]`  
- `403 Forbidden`  
- `404 Not Found`  
- `409 Conflict`

**Note:**  
Server deletes related records (Farmers, ARPA, ADO, GN Divisions) inside a transaction to prevent FK conflicts.

---

# Postman Information

- Collection: `postman/HARVEST-API.postman_collection.json`
- Folder: **AG Offices**
- Variables:
  - `agOfficeId`
  - `baseUrl`
  - `access_token`
  - `admin_token`
- Create request stores returned `AG_Office_ID` → `agOfficeId`

---

# Frontend Usage Tips

- Use correct Bearer token for each action  
- Handle:
  - `404 Not Found`
  - `409 Conflict`
- Use server-provided IDs for consistency  

---
