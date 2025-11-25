# HARVEST-API Database Documentation

## Overview
This database stores the core entities used in the agricultural workflow:

- Offices  
- Staff (ADO, ARPA, Admin)  
- Farmers  
- Lands  
- Cultivations  
- Harvests  
- Banking  
- Messaging  
- Authentication (Tokens + OTP)

### Naming Conventions
- Tables use PascalCase with underscores (e.g., `AG_Office`, `Land_Harvest`).
- Primary keys: `<Entity>_ID` or `ID`.
- Foreign keys enforce referential integrity; many use cascade on delete.
- Status columns use string values like `pending`, `approved`, `rejected`.

---

# AG_Office
### What  
Administrative office for a specific region.

### Why  
Links ADO, ARPA, farmers, and GN divisions.

### Columns
- `AG_Office_ID` (PK)  
- `Office_Name` (required)  
- `Address`  
- `Contact_Number`  
- `Profile_Picture`

### Relationships
- 1–1 with ADO  
- 1–many with ARPA  
- 1–many with GN_Division  
- 1–many with Farmer  

---

# GN_Division
### What  
Grama Niladhari administrative division.

### Why  
Used for grouping farmers and connecting ARPA.

### Columns
- `GN_Division_ID` (PK)  
- `Division_Name`  
- `Code`  
- `AG_Office_ID` (FK)  
- `Profile_Picture`

### Relationships
- Many–1 AG_Office  
- 1–1 ARPA (unique)

---

# ADO (Agricultural Development Officer)
### What  
Office-level officer handling approvals.

### Why  
Approves cultivations; supervises ARPAs.

### Columns
- `ADO_ID` (PK)  
- `NIC` (unique)  
- `First_Name`, `Last_Name`  
- `Email` (unique)  
- `Password`  
- `Contact_Number`  
- `AG_Office_ID` (FK, UNIQUE)  
- `Profile_Picture`

### Relationships
- 1–1 AG_Office  
- 1–many ARPA  
- Indirect relations with Farmers  

---

# ARPA (Agricultural Research and Production Assistant)
### What  
Field officer assigned to a GN division.

### Why  
Supports farmers and handles initial approvals.

### Columns
- `ARPA_ID` (PK)  
- `First_Name`, `Last_Name`  
- `NIC` (unique)  
- `Email` (unique)  
- `Password`  
- `Service_ID`  
- `Contact_Number`  
- `AG_Office_ID` (FK)  
- `ADO_ID` (FK)  
- `GN_Division_ID` (FK, UNIQUE)  
- `Profile_Picture`

### Relationships
- Many–1 AG_Office  
- Many–1 ADO  
- 1–1 GN_Division  
- 1–many Farmer  

---

# Admin
### What  
System-level administrator.

### Columns
- `Admin_ID` (PK)  
- `Name`  
- `Profile_Picture`  
- `Username` (unique)  
- `Password_Hash`  
- `Email` (unique)

---

# Access Tokens
### Purpose  
Temporary API authentication for Admin, ADO, ARPA, and Farmers.

### Tables
- `Admin_Access_Token`  
- `ADO_Access_Token`  
- `ARPA_Access_Token`  
- `Farmer_Access_Token`

### Common Columns
- `ID`  
- `<Role>_ID` (FK)  
- `Token_Hash`  
- `Expires_At`  
- `Revoked`

---

# OTP Tables
### Purpose  
Verification for mobile login / user creation.

### Tables
- `Farmer_OTP`  
- `Pending_OTP`  
- `Arpa_Pending_OTP`

### Columns
- `ID`  
- `Mobile_Number`  
- `Code_Hash`  
- `Expires_At`  
- `Verified`

---

# Season
### What  
Named agricultural seasons.

### Columns
- `Season_ID`  
- `Season_Name`

### Relationships
- 1–many Cultivation

---

# Farmer
### What  
Registered farmer profile.

### Why  
Core participant owning lands and bank accounts.

### Columns
- `Farmer_ID` (PK)  
- `Farmer_Code` (unique)  
- `NIC` (unique, optional for OTP)  
- `First_Name`, `Last_Name`  
- `Contact_Number`  
- `Language`  
- `Address`  
- `AG_Office_ID` (FK, nullable)  
- `GN_Division_ID` (FK, nullable)  
- `ARPA_ID` (FK, nullable)  
- `ADO_ID` (FK, nullable)  
- `Profile_Picture`  
- `Mobile_Verified`  
- `Verified_At`  
- `Status` (pending/approved/rejected)

### Relationships
- 1–many Land  
- 1–many Bank_Account  

---

# Bank_Account
### What  
Bank accounts used for subsidy disbursements.

### Columns
- `Account_ID`  
- `Account_Number`  
- `Account_Name`  
- `Farmer_ID` (FK)

### Relationships
- 1–many Subsidy  
- Cascade delete when Farmer is removed

---

# Land
### What  
Land parcels owned by farmers.

### Columns
- `Land_ID`  
- `Land_Name`  
- `Location`  
- `Area`  
- `Ownership_Type`  
- `Farmer_ID` (FK)  
- `Ownership_Document_URL`  
- `Photos`  
- `Approved`

### Relationships
- 1–many Cultivation  
- 1–many Land_Harvest  
- Cascade delete: Cultivation, Subsidies, Land_Harvest

---

# Cultivation
### What  
Crop cultivation per land per season.

### Columns
- `Cultivation_ID`  
- `Actual_Yield`, `Expected_Yield`  
- `Paddy_Type`  
- `Season_ID` (FK)  
- `Land_ID` (FK)  
- `Approved_By_ARPA`  
- `Approved_By_ADO`  
- `Time`

### Relationships
- Many–1 Season  
- Many–1 Land  
- 1–many Subsidy  

### Special Behavior
ADO approval auto-creates a Land_Harvest entry.

---

# Land_Harvest
### What  
Monthly harvest record per land.

### Columns
- `ID`  
- `Land_ID` (FK)  
- `Year`  
- `Month` (1–12)  
- `Harvest`

### Constraints
- Unique: `(Land_ID, Year, Month)`  
- Cascade delete with Land  

---

# Subsidy
### What  
Monetary support for cultivations.

### Columns
- `Subsidy_ID`  
- `Amount`  
- `Status`  
- `Disbursement_Date`  
- `Account_ID` (FK)  
- `Cultivation_ID` (FK)

### Relationships
- Many–1 Bank_Account  
- Many–1 Cultivation  
- Cascade on Account or Cultivation delete  

---

# Message
### What  
Stored system messages.

### Columns
- `Message_ID`  
- `Content`  
- `Timestamp`  
- `Status`  
- `Farmer_ID` (nullable FK)  
- `ADO_ID`  
- `ARPA_ID`

### Behavior
- On Farmer delete → `Farmer_ID` becomes NULL

---

# Data Management Guidelines

### Approvals
- Farmer: pending → approved → rejected  
- Land: approved / not approved  
- Cultivation: pending → approved (ARPA/ADO)

### Cascade Rules
- Deleting Farmer → Lands, Accounts, Cultivations, Subsidies, Harvests removed  
- Deleting Land → Cultivations, Harvests, Subsidies removed  

### Uniqueness
- 1 ADO per AG office  
- 1 ARPA per GN division  
- 1 harvest entry per land-month-year  
- Farmer Code & NIC unique  

---

# Cross-Table Flow

### Farmer → Land → Cultivation → Subsidy
- Farmers own lands  
- Lands have cultivations  
- Cultivations link to subsidies  

### Approvals & Harvest
- ADO approval = auto-create monthly harvest record  

### Offices & Staff
- AG Office → ADO = 1–1  
- GN Division → ARPA = 1–1  

---

# References
- Controllers: `FarmerController.php`, `LandController.php`, `CultivationController.php`, `LandHarvestController.php`  
- Migration files in `/database/migrations/`  
- SQL schema in `DB.sql`
