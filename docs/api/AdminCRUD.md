# Admin API

This guide documents the Admin CRUD and authentication flow. Admins can register, log in, and manage their own accounts. An admin access token can call all protected routes in the system (including farmer endpoints).

## Base URL

- Example: `http://127.0.0.1:8000`
- All routes are under `/api/...`

## Common Headers

- `Accept: application/json`
- `Content-Type: application/json` for requests with bodies
- `Authorization: Bearer <admin_token>` for protected routes

## Admin Fields

- `Admin_ID`, `Name`, `Profile_Picture`, `Username`, `Password_Hash`, `Email`

## Register

- Method: `POST`
- Path: `/api/admin/register`
- Body:
  ```json
  {
    "Name": "Admin One",
    "Profile_Picture": "https://...",
    "Username": "admin1",
    "Password": "secret123",
    "Email": "admin1@example.com"
  }
  ```
- Response: `201` — returns admin record

## Login

- Method: `POST`
- Path: `/api/admin/login`
- Body:
  ```json
  {
    "Username": "admin1",
    "Password": "secret123"
  }
  ```
- Response `200 OK`:
  ```json
  {
    "token": "<admin_token>",
    "expires_at": "YYYY-MM-DD HH:MM:SS",
    "admin_id": 1
  }
  ```

## Me

- Method: `GET`
- Path: `/api/admin/me`
- Headers: `Authorization: Bearer <admin_token>`
- Response: `200` — admin record

## Update

- Method: `PUT`
- Path: `/api/admin/{admin_id}`
- Headers: `Authorization: Bearer <admin_token>`
- Body:
  ```json
  {
    "Name": "Admin One Updated",
    "Profile_Picture": "https://...",
    "Username": "newusername",
    "Password": "newsecret",
    "Email": "new@example.com"
  }
  ```
- Response: `200` — updated admin record

## Delete

- Method: `DELETE`
- Path: `/api/admin/{admin_id}`
- Headers: `Authorization: Bearer <admin_token>`
- Response: `200` — empty JSON

## Admin Access to Protected Routes

### List All Farmers (Admin)
```bash
curl -X GET "{BASE_URL}/api/farmers"   -H "Accept: application/json"   -H "Authorization: Bearer {admin_token}"
```

### Get Farmer by Code (Admin)
```bash
curl -X GET "{BASE_URL}/api/farmers/by-code/111"   -H "Accept: application/json"   -H "Authorization: Bearer {admin_token}"
```

### Delete Farmer (Admin)
```bash
curl -X DELETE "{BASE_URL}/api/farmers/{farmer_id}"   -H "Accept: application/json"   -H "Authorization: Bearer {admin_token}"
```

## Typical Frontend Sequence (Admin)

1. Register admin.
2. Log in and store `admin_token` and `admin_id`.
3. Use `admin_token` to call protected routes.
4. Update/delete self using `/api/admin/{admin_id}`.
