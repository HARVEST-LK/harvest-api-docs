# GN Division CRUD API 

This guide provides a clean and easy-to-follow overview of the **GN Division API**, including authentication, available routes, how to use them, and tips for frontend integration.

---

## Authentication

All API requests require an **Authorization** header:

```
Authorization: Bearer <token>
```

Two types of tokens are accepted:

* **Farmer token** → obtained via OTP flow
* **Admin token** → obtained through Admin Register/Login

**Read operations** accept *either* token.
**Write operations (create/update/delete)** require an **admin token**.

---

## Base URL

```
{{baseUrl}} (default: http://127.0.0.1:8000)
```

All endpoints start with `/api`.

---

## GN Division Resource Structure

Each GN Division object has the following fields:

* `GN_Division_ID`
* `Division_Name`
* `Code`
* `AG_Office_ID`
* `Profile_Picture`

---

## Endpoints

### 1. **List All GN Divisions**

**GET** `/api/gn-divisions`

* Headers: `Accept: application/json`, `Authorization: Bearer <token>`
* **Returns:** `200 OK` → Array of GN Division objects (ordered by ID)

Example item:

```json
{
  "GN_Division_ID": 1,
  "Division_Name": "Central",
  "Code": "CN",
  "AG_Office_ID": 3,
  "Profile_Picture": null
}
```

---

### 2. **Get GN Division by ID**

**GET** `/api/gn-divisions/{id}`

* Headers: `Accept: application/json`, Authorization required
* **Returns:**

  * `200 OK` → Object
  * `404 Not Found` → `[]`

---

### 3. **List GN Divisions by AG Office**

**GET** `/api/gn-divisions/by-ag-office/{agOfficeId}`

* Headers: same as above
* **Returns:** `200 OK` → Array of divisions under that AG Office

---

##  Admin-Only Operations

### 4. **Create GN Division**

**POST** `/api/gn-divisions`

* Headers: `Content-Type: application/json`, admin token required
* Body example:

```json
{
  "Division_Name": "GN Sample",
  "Code": "GNCODE",
  "AG_Office_ID": 1,
  "Profile_Picture": null
}
```

* **Responses:**

  * `201 Created`
  * `403 Forbidden` (if not admin)
  * `422 Unprocessable Entity` (validation errors)

---

### 5. **Update GN Division**

**PUT** `/api/gn-divisions/{id}`

* Headers: JSON + admin token
* Body example (partial update allowed):

```json
{
  "Division_Name": "GN Updated"
}
```

* **Responses:** `200 OK`, `403`, `404`, `422`

---

### 6. **Delete GN Division**

**DELETE** `/api/gn-divisions/{id}`

* Headers: admin token required
* **Responses:**

  * `200 OK` → `[]`
  * `404 Not Found`
  * `403 Forbidden`
  * `409 Conflict` → when FK constraints prevent deletion

**Note:** Deleting may fail if other records (e.g., Farmers) reference the GN Division.

---

## Postman Information

* Collection: `postman/HARVEST-API.postman_collection.json`
* Folder **“GN Divisions”** includes 6 prepared requests:

  * List GN Divisions
  * Get by ID
  * List by AG Office
  * Create (Admin)
  * Update (Admin)
  * Delete (Admin)

### Common Postman Variables

* `baseUrl`
* `access_token`
* `admin_token`
* `agOfficeId`
* `gnDivisionId` (auto-filled after create request)

---

## Frontend Usage Tips

* Always send the correct token type for each operation.
* Use `Content-Type: application/json` for POST/PUT.
* Handle the following gracefully in UI:

  * `404` → Not found
  * `409` → Cannot delete (in use)
* Always rely on server-provided IDs from API responses.

---


