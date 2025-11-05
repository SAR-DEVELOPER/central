# Form1 API Documentation

This module handles the submission and management of Form 1 (Dissertation Survey) responses.

## Database Schema

The Form1 responses are stored in PostgreSQL with the following structure:

**Table:** `form1_responses`

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, auto-generated |
| nama | VARCHAR(255) | Respondent's name |
| perusahaan | VARCHAR(255) | Company name |
| jabatan | VARCHAR(255) | Position/title |
| jenisKelamin | VARCHAR(50) | Gender (Laki-laki/Perempuan) |
| umur | VARCHAR(50) | Age range (< 35 tahun, 35 – 45 tahun, > 45 tahun) |
| pendidikan | VARCHAR(50) | Education level (S1, S2, S3) |
| consent | BOOLEAN | Consent given (default: false) |
| answers | JSONB | Survey answers with numeric values (e.g., {"A11": 1, "A12": 2}) |
| answersRaw | JSONB | Raw Likert choices (e.g., {"A11": "SS", "A12": "S"}) |
| openEnded | JSONB | Open-ended responses (comments, suggestions) |
| submittedAt | TIMESTAMP | When the form was submitted |
| createdAt | TIMESTAMP | Record creation timestamp |
| updatedAt | TIMESTAMP | Record update timestamp |
| ipAddress | VARCHAR(45) | IP address of submitter (optional) |
| userAgent | TEXT | Browser user agent (optional) |

### Likert Scale Values

The form uses a 6-point Likert scale:
- SS (Sangat Setuju) = 1
- S (Setuju) = 2
- AS (Agak Setuju) = 3
- ATS (Agak Tidak Setuju) = 4
- TS (Tidak Setuju) = 5
- STS (Sangat Tidak Setuju) = 6

## API Endpoints

### 1. Submit Form Response

**Endpoint:** `POST /api/form1/submit`

**Description:** Submit a new Form 1 response

**Request Body:**
```json
{
  "identity": {
    "nama": "John Doe",
    "perusahaan": "PT Example",
    "jabatan": "Audit Committee Member",
    "jenisKelamin": "Laki-laki",
    "umur": "35 – 45 tahun",
    "pendidikan": "S2",
    "consent": false
  },
  "answers": {
    "A11": 1,
    "A12": 2,
    "B13": 3,
    ...
  },
  "answersRaw": {
    "A11": "SS",
    "A12": "S",
    "B13": "AS",
    ...
  },
  "openEnded": {
    "comments": "Optional comments",
    "suggestions": "Optional suggestions"
  },
  "submittedAt": "2025-11-05T10:30:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "uuid-here",
    "submittedAt": "2025-11-05T10:30:00.000Z"
  }
}
```

### 2. Get All Responses

**Endpoint:** `GET /api/form1/responses`

**Description:** Retrieve all form responses (ordered by submission date, descending)

**Response (200 OK):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "uuid",
      "nama": "John Doe",
      "perusahaan": "PT Example",
      ...
    }
  ]
}
```

### 3. Get Response by ID

**Endpoint:** `GET /api/form1/responses/:id`

**Description:** Retrieve a specific response by ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nama": "John Doe",
    ...
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Response not found"
}
```

### 4. Get Statistics

**Endpoint:** `GET /api/form1/statistics`

**Description:** Get aggregated statistics about form responses

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "byGender": [
      { "jenisKelamin": "Laki-laki", "count": "60" },
      { "jenisKelamin": "Perempuan", "count": "40" }
    ],
    "byAge": [
      { "umur": "< 35 tahun", "count": "20" },
      { "umur": "35 – 45 tahun", "count": "50" },
      { "umur": "> 45 tahun", "count": "30" }
    ],
    "byEducation": [
      { "pendidikan": "S1", "count": "30" },
      { "pendidikan": "S2", "count": "50" },
      { "pendidikan": "S3", "count": "20" }
    ]
  }
}
```

## Survey Questions

The form contains 48 questions across two sections:

### Section 1: External Auditor Interaction (28 questions)
Questions about interactions between Audit Committee and External Auditors (KAP):
- A11-A12: Recommending appointment of Public Accountant
- B13-B14: Discussing audit fee arrangements
- C15-C16: Approving audit engagement terms
- D17-D19: Assessing auditor independence
- E110-E113: Discussing audit planning elements
- F114-F116: Discussing fraud matters
- G117-G124: Communicating significant audit findings
- H125-H128: Facilitating the audit process

### Section 2: Internal Auditor Interaction (20 questions)
Questions about interactions between Audit Committee and Internal Auditors (SPI):
- A21-A25: Discussing internal audit planning elements
- B26-B28: Assessing independence
- C29-C213: Communicating findings from internal audit
- D214-D216: Periodic reporting to Audit Committee
- E217-E220: Facilitating the internal audit process

## Validation Rules

The DTO validates the following:
- All identity fields are required (nama, perusahaan, jabatan, jenisKelamin, umur, pendidikan)
- jenisKelamin must be one of: "Laki-laki", "Perempuan"
- umur must be one of: "< 35 tahun", "35 – 45 tahun", "> 45 tahun"
- pendidikan must be one of: "S1", "S2", "S3"
- answers object is required and must contain numeric values
- answersRaw object is optional
- openEnded is optional
- submittedAt must be a valid ISO date string

## Environment Configuration

The backend uses PostgreSQL. Configure database connection in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=centri_app
DB_PASSWORD=your_password
DB_DATABASE=centri_db
NODE_ENV=development
```

## Testing the API

### Using curl:

```bash
# Submit a form
curl -X POST http://localhost:4000/api/form1/submit \
  -H "Content-Type: application/json" \
  -d @sample-payload.json

# Get all responses
curl http://localhost:4000/api/form1/responses

# Get statistics
curl http://localhost:4000/api/form1/statistics
```

### Sample Payload:

See [form-disertasi/app/form1/page.tsx](../../../../form-disertasi/app/form1/page.tsx) for the complete payload structure generated by the frontend.

## Security Considerations

1. **Data Privacy:** The form collects personally identifiable information (PII). Ensure compliance with data protection regulations.
2. **CORS:** The backend is configured to accept requests from `http://localhost:3000` by default (configurable via `FRONTEND_URL` environment variable).
3. **Rate Limiting:** Consider implementing rate limiting to prevent abuse.
4. **Authentication:** Currently no authentication is required. Consider adding authentication for the `/responses` and `/statistics` endpoints.
5. **IP Tracking:** IP addresses are stored for audit purposes. Ensure users are informed via privacy policy.

## Database Migrations

TypeORM is configured with `synchronize: true` in development mode, which automatically syncs the schema. For production:

1. Disable `synchronize` in production
2. Use TypeORM migrations:
   ```bash
   npm run typeorm migration:generate -- -n CreateForm1ResponseTable
   npm run typeorm migration:run
   ```
