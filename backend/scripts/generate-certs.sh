#!/bin/bash
# Bash script to generate self-signed SSL certificates for HTTPS
# For Linux/Mac users

echo "🔐 Generating SSL/TLS Certificates..."
echo ""

# Check if OpenSSL is available
if ! command -v openssl &> /dev/null; then
    echo "❌ OpenSSL is not installed"
    echo ""
    echo "Please install OpenSSL:"
    echo "  Ubuntu/Debian: sudo apt-get install openssl"
    echo "  macOS: brew install openssl"
    echo "  CentOS/RHEL: sudo yum install openssl"
    exit 1
fi

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CERTS_DIR="$SCRIPT_DIR/../certs"

# Create certs directory if it doesn't exist
if [ ! -d "$CERTS_DIR" ]; then
    mkdir -p "$CERTS_DIR"
    echo "✅ Created certs directory"
fi

# Generate self-signed certificate
echo "Generating RSA 4096-bit self-signed certificate..."
echo ""

openssl req -x509 -newkey rsa:4096 \
    -keyout "$CERTS_DIR/key.pem" \
    -out "$CERTS_DIR/cert.pem" \
    -days 365 -nodes \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL certificates generated successfully!"
    echo ""
    echo "Certificate files created:"
    echo "  📄 Private Key: $CERTS_DIR/key.pem"
    echo "  📄 Certificate: $CERTS_DIR/cert.pem"
    echo ""
    echo "⚠️  Note: These are self-signed certificates for development only"
    echo "   Browsers will show a security warning - this is expected"
    echo ""
    echo "🚀 You can now start your server with HTTPS support!"
else
    echo ""
    echo "❌ Failed to generate certificates"
    exit 1
fi
