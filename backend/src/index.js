import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db/db.js';
import { app } from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const startServer = async () => {
  try {
    
    await db();
    console.log("Database connected successfully!");

    
    const PORT = process.env.PORT || 3000;
    const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
    
    // Start HTTP server
    const server = app.listen(PORT, () => {
      console.log(`✅ HTTP Server is running at: http://localhost:${PORT}`);
    });

    // Try to load SSL certificates and start HTTPS server
    let httpsServer = null;
    const enableHttps = process.env.ENABLE_HTTPS !== 'false';
    
    if (enableHttps) {
      try {
        const certPath = path.join(__dirname, '..', 'certs', 'cert.pem');
        const keyPath = path.join(__dirname, '..', 'certs', 'key.pem');
        
        const httpsOptions = {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath)
        };
        
        httpsServer = https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
          console.log(`✅ HTTPS Server is running at: https://localhost:${HTTPS_PORT}`);
          console.log(`🔒 SSL/TLS encryption enabled`);
        });
        
      } catch (certError) {
        console.log('\n⚠️  HTTPS certificates not found or invalid');
        console.log('📝 Generate certificates with:');
        console.log('   cd backend');
        console.log('   openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"');
        console.log('🌐 Running HTTP only on port ' + PORT + '\n');
      }
    }

    

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Retrying...`);
        setTimeout(() => {
          server.close();
          const newPort = PORT + 1;
          app.listen(newPort, () => {
            console.log(`Server restarted on port: ${newPort}`);
          });
        }, 1000);
      } else {
        console.error("Server encountered an error:", err);
      }
    });
    
    if (httpsServer) {
      httpsServer.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`HTTPS Port ${HTTPS_PORT} is already in use.`);
        } else {
          console.error("HTTPS Server encountered an error:", err);
        }
      });
    }
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
};

// Start the server
startServer();
