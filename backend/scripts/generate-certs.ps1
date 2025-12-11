# PowerShell script to generate self-signed SSL certificates for HTTPS
# For Windows users

Write-Host "🔐 Generating SSL/TLS Certificates..." -ForegroundColor Cyan
Write-Host ""

# Check if OpenSSL is available
$opensslPath = Get-Command openssl -ErrorAction SilentlyContinue

if (-not $opensslPath) {
    Write-Host "❌ OpenSSL is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install OpenSSL:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://slproweb.com/products/Win32OpenSSL.html" -ForegroundColor Yellow
    Write-Host "  2. Or install via Chocolatey: choco install openssl" -ForegroundColor Yellow
    Write-Host "  3. Or install via Scoop: scoop install openssl" -ForegroundColor Yellow
    exit 1
}

# Create certs directory if it doesn't exist
$certsDir = Join-Path $PSScriptRoot "..\certs"
if (-not (Test-Path $certsDir)) {
    New-Item -ItemType Directory -Path $certsDir | Out-Null
    Write-Host "✅ Created certs directory" -ForegroundColor Green
}

# Generate self-signed certificate
Write-Host "Generating RSA 4096-bit self-signed certificate..." -ForegroundColor Yellow
Write-Host ""

$keyPath = Join-Path $certsDir "key.pem"
$certPath = Join-Path $certsDir "cert.pem"

& openssl req -x509 -newkey rsa:4096 `
    -keyout $keyPath `
    -out $certPath `
    -days 365 -nodes `
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SSL certificates generated successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Certificate files created:" -ForegroundColor Cyan
    Write-Host "  📄 Private Key: $keyPath" -ForegroundColor White
    Write-Host "  📄 Certificate: $certPath" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  Note: These are self-signed certificates for development only" -ForegroundColor Yellow
    Write-Host "   Browsers will show a security warning - this is expected" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🚀 You can now start your server with HTTPS support!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Failed to generate certificates" -ForegroundColor Red
    exit 1
}
