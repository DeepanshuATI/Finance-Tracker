# Finance Tracker Backend

Backend server for the Finance Tracker application with integrated security demonstrations.

## Features

- RESTful API for finance tracking
- User authentication with JWT
- MongoDB database integration
- HTTPS/SSL support
- Security vulnerability demonstrations (educational)

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenSSL (for HTTPS certificates)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB service

4. Run the server:
```bash
npm start
```

## HTTPS Configuration

### Generating SSL Certificates

For development, you can generate self-signed SSL certificates:

**Windows (PowerShell):**
```powershell
cd backend
.\scripts\generate-certs.ps1
```

**Linux/Mac (Bash):**
```bash
cd backend
chmod +x scripts/generate-certs.sh
./scripts/generate-certs.sh
```

**Manual Generation:**
```bash
cd backend
openssl req -x509 -newkey rsa:4096 \
  -keyout certs/key.pem \
  -out certs/cert.pem \
  -days 365 -nodes \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### Environment Variables

Add these to your `.env` file:

```env
# HTTPS Configuration
ENABLE_HTTPS=true
HTTPS_PORT=3443
CERT_PATH=./certs/cert.pem
KEY_PATH=./certs/key.pem
```

### Server Ports

- **HTTP**: Port 5000 (or PORT from .env)
- **HTTPS**: Port 3443 (or HTTPS_PORT from .env)

Both servers run simultaneously when HTTPS is enabled.

### Browser Security Warnings

Self-signed certificates will trigger browser security warnings. This is expected for development:

1. Click "Advanced" or "Show Details"
2. Click "Proceed to localhost" or "Accept Risk"
3. The warning appears because the certificate is not from a trusted Certificate Authority

### Production Deployment

For production, use certificates from a trusted Certificate Authority:

- **Let's Encrypt** (free): https://letsencrypt.org/
- **Certbot** (automated): https://certbot.eff.org/
- Commercial CAs: DigiCert, GlobalSign, etc.

## Security Demonstrations

### ⚠️ Important Warning

The security demonstration endpoints contain **intentionally vulnerable code** for educational purposes. These endpoints should **NEVER** be deployed to production.

### Enabling/Disabling Security Demos

Set in `.env`:
```env
ENABLE_SECURITY_DEMOS=true  # Enable for development
ENABLE_SECURITY_DEMOS=false # Disable for production
```

### Security Demo Endpoints

**Seed Demo Data:**
```
POST /api/v1/security/seed
```

**Vulnerable Endpoints (Educational):**
```
POST /api/v1/security/vulnerable/login
POST /api/v1/security/vulnerable/comment
```

**Secure Endpoints (Best Practices):**
```
POST /api/v1/security/secure/login
POST /api/v1/security/secure/comment
```

### What You'll Learn

1. **NoSQL Injection**: How attackers manipulate database queries
2. **XSS (Cross-Site Scripting)**: How malicious scripts can be injected
3. **Parameterized Queries**: Proper way to prevent injection attacks
4. **Input Sanitization**: How to clean user input safely

## Troubleshooting

### HTTPS Certificate Errors

**Problem**: Server fails to start with certificate error

**Solution**:
- Ensure certificates exist in `backend/certs/`
- Run the certificate generation script
- Check file permissions on certificate files
- Verify CERT_PATH and KEY_PATH in .env

**Fallback**: Server will run HTTP-only if certificates are missing

### Port Already in Use

**Problem**: `EADDRINUSE` error

**Solution**:
- Change PORT or HTTPS_PORT in .env
- Kill process using the port:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Linux/Mac: `lsof -ti:5000 | xargs kill`

### MongoDB Connection Failed

**Problem**: Cannot connect to MongoDB

**Solution**:
- Ensure MongoDB service is running
- Check MONGO_URL in .env
- Verify MongoDB is accessible on specified port

## API Documentation

### Authentication Endpoints

- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/refresh-token` - Refresh access token

### Finance Endpoints

- `GET /api/v1/dashboard` - Dashboard data
- `GET /api/v1/incomes` - List incomes
- `POST /api/v1/incomes` - Create income
- `GET /api/v1/expenses` - List expenses
- `POST /api/v1/expenses` - Create expense
- `GET /api/v1/budgets` - List budgets
- `GET /api/v1/analytics` - Analytics data

## Development

```bash
# Start with nodemon (auto-reload)
npm run dev

# Start production
npm start
```

## Security Best Practices

1. **Never commit certificates** - They're in .gitignore
2. **Use environment variables** - Never hardcode secrets
3. **Disable security demos in production** - Set ENABLE_SECURITY_DEMOS=false
4. **Use HTTPS in production** - With valid CA certificates
5. **Keep dependencies updated** - Run `npm audit` regularly

## License

ISC
