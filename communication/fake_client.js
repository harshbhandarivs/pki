const tls = require('tls');
const fs = require('fs');
const path = require('path');

// Paths to certificate and key
const options = {
  ca: [fs.readFileSync(path.join(__dirname, 'gca_cert.pem'))], // Use server's certificate  
};

const client = tls.connect(8080, {
  ca: [fs.readFileSync(path.join(__dirname, 'gca_cert.pem'))], // Use server's certificate
  host: "yavin.local",
  cert: fs.readFileSync('self_sign_cert.pem'),
  key: fs.readFileSync('self_sign_pkey.pem'),
}, () => {
  console.log('Client connected:', client.authorized ? 'authorized' : 'unauthorized');

  client.write('Hello from the SSL Client!');

  client.on('data', (data) => {
    console.log('Received from server:', data.toString());
  });

  client.on('end', () => {
    console.log('Disconnected from server.');
  });
});
