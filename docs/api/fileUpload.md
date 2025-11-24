# File Upload API

This guide explains how to upload files and retrieve them using the public file routes.

## Overview
- Base URL: `http://127.0.0.1:8000` (or your configured host)
- Storage directory: `uploads` under the project root
- Filenames: unique hex name with original extension preserved
- Routes are public (no authentication required)
- Controller references:
  - Upload: `app/Http/Controllers/FileController.php:16`
  - Serve: `app/Http/Controllers/FileController.php:37`
- Route definitions:
  - Upload: `routes/api.php:23`
  - Get file: `routes/api.php:24`

## Endpoints

### POST /api/files/upload
- Purpose: upload any file and receive its URL  
- Content-Type: `multipart/form-data`  
- Form field: `file` (single file)

**Success (`201 Created`):**
```json
{ "url": "<full-url>", "name": "<stored-name>" }
```

**Errors:**
- `422 Unprocessable Entity` if file is missing or invalid

---

### GET /api/files/{name}
- Purpose: download or view the uploaded file by its stored name  
- Success: `200 OK`, streams file  
- Errors:  
  - `404 Not Found` if missing

---

## Request and Response Examples

### curl

#### Upload:
```bash
curl -X POST "{BASE_URL}/api/files/upload"   -H "Accept: application/json"   -F "file=@/path/to/local-file.png"
```

**Response:**
```json
{
  "url": "http://127.0.0.1:8000/api/files/55c7f3c87b1e4f6e8a3c1d2b.png",
  "name": "55c7f3c87b1e4f6e8a3c1d2b.png"
}
```

#### Retrieve:
```bash
curl -X GET "{BASE_URL}/api/files/55c7f3c87b1e4f6e8a3c1d2b.png" --output downloaded.png
```

---

## JavaScript (fetch)
```js
async function uploadFile(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE_URL}/api/files/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

async function getFile(name) {
  const res = await fetch(`${BASE_URL}/api/files/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error('Not found');
  return res.blob();
}
```

---

## JavaScript (axios)
```js
import axios from 'axios';

async function uploadFile(file) {
  const form = new FormData();
  form.append('file', file);
  const res = await axios.post(`${BASE_URL}/api/files/upload`, form);
  return res.data;
}

async function getFile(name) {
  const res = await axios.get(`${BASE_URL}/api/files/${encodeURIComponent(name)}`, {
    responseType: 'blob',
  });
  return res.data;
}
```

---

## Postman
- Folder: `Files`
  - `Upload File` → form-data with `file`
  - `Get Uploaded File` → uses saved `{{fileName}}`

## Notes
- Server auto-creates `uploads` directory
- Filenames are unique and preserve extensions
- Public route — add auth if needed
