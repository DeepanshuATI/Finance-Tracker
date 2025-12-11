# Finance Tracker with Security Demonstrations

A full-stack finance tracking application with integrated security vulnerability demonstrations for educational purposes.

## 🚀 Features

### Finance Tracking
- User authentication and authorization
- Income and expense management
- Budget tracking and analytics
- Transaction history
- Dashboard with visualizations

### Security Demonstrations
- **SSL/TLS Encryption**: HTTPS support for secure communication
- **Vulnerability Examples**: Educational demonstrations of common security issues
- **Secure Implementations**: Best practices for preventing attacks
- **Interactive Learning**: Side-by-side comparison of vulnerable vs secure code

## 📁 Project Structure

```
Finance-Tracker/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/       # API controllers
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Custom middleware
│   │   └── utils/             # Utility functions
│   ├── certs/                 # SSL certificates (not committed)
│   ├── scripts/               # Setup scripts
│   └── package.json
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   └── Security/      # Security demo components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context
│   │   └── utils/             # Utility functions
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, sanitize-html
- **HTTPS**: Native Node.js https module

### Frontend
- **Framework**: React
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Lucide React, React Icons
- **Styling**: Tailwind CSS

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenSSL (for HTTPS certificates)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure `.env` file:
```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/finance-tracker
SECRET_KEY=your_secret_key
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CORS_ORIGIN=http://localhost:5173

# HTTPS Configuration
ENABLE_HTTPS=true
HTTPS_PORT=3443

# Security Demos (disable in production)
ENABLE_SECURITY_DEMOS=true
```

5. Generate SSL certificates:

**Windows:**
```powershell
.\scripts\generate-certs.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/generate-certs.sh
./scripts/generate-certs.sh
```

6. Start the server:
```bash
npm start
```

Server will run on:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:3443`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 🔐 Security Features

### HTTPS/SSL Support

The application supports HTTPS encryption for secure data transmission:

- Self-signed certificates for development
- Dual HTTP/HTTPS server support
- Automatic fallback to HTTP if certificates are missing

**Generate Certificates:**
```bash
cd backend
# Windows
.\scripts\generate-certs.ps1
# Linux/Mac
./scripts/generate-certs.sh
```

### Security Demonstrations

⚠️ **Educational Purpose Only** - Contains intentionally vulnerable code

The application includes interactive security demonstrations:

1. **NoSQL Injection**
   - Vulnerable implementation
   - Secure implementation with parameterized queries
   - Attack payloads and explanations

2. **XSS (Cross-Site Scripting)**
   - Vulnerable implementation
   - Secure implementation with input sanitization
   - Multiple attack vectors

**Access Security Demos:**
- Navigate to `/security` in the application
- Or visit: `http://localhost:5173/security`

**Important**: Always set `ENABLE_SECURITY_DEMOS=false` in production!

## 📚 Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [Security Demos Documentation](backend/SECURITY_DEMOS.md) - Detailed security demonstrations guide

## 🎯 Usage

### Finance Tracking

1. **Register/Login**: Create an account or login
2. **Dashboard**: View financial overview
3. **Add Income**: Record income transactions
4. **Add Expenses**: Track spending
5. **View Analytics**: Analyze financial data

### Security Learning

1. **Access Security Dashboard**: Click "Security Demos" in sidebar
2. **Try Vulnerable Demos**: Test attack payloads
3. **Compare Secure Demos**: See how protections work
4. **Learn Best Practices**: Understand security implementations

## 🔒 Security Best Practices

### For Development

✅ Use HTTPS for local development
✅ Test security features in isolated environment
✅ Keep dependencies updated
✅ Review security documentation

### For Production

✅ Disable security demos (`ENABLE_SECURITY_DEMOS=false`)
✅ Use valid SSL certificates from trusted CA
✅ Enable all security headers
✅ Regular security audits
✅ Keep secrets in environment variables
✅ Never commit certificates or secrets

## 🚨 Important Warnings

### Security Demonstrations

- **NEVER deploy vulnerable code to production**
- **ALWAYS disable security demos in production**
- **ONLY use for educational purposes**
- **DO NOT use attack payloads on real systems**

### SSL Certificates

- Self-signed certificates are for development only
- Browsers will show security warnings (expected)
- Use Let's Encrypt or commercial CA for production
- Never commit private keys to version control

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Security Demo Tests

1. Seed demo data:
```bash
curl -X POST http://localhost:5000/api/v1/security/seed
```

2. Test vulnerable endpoint:
```bash
curl -X POST http://localhost:5000/api/v1/security/vulnerable/login \
  -H "Content-Type: application/json" \
  -d '{"username": {"$ne": null}, "password": {"$ne": null}}'
```

3. Test secure endpoint:
```bash
curl -X POST http://localhost:5000/api/v1/security/secure/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

ISC

## 🙏 Acknowledgments

- OWASP for security guidelines
- MongoDB security documentation
- Node.js security best practices

## 📧 Support

For questions or issues:
- Review documentation in `/backend/README.md`
- Check security guide in `/backend/SECURITY_DEMOS.md`
- Open an issue on GitHub

---

**Remember**: This project includes educational security demonstrations. Always follow security best practices and never deploy vulnerable code to production!
