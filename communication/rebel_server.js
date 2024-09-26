const tls = require('tls');
const fs = require('fs');
const path = require('path');

// TLS server options (replace with your actual certificate and key paths)
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'yavin_pkey.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'yavin_bundle.pem')),
  // Optionally add the CA if necessary (e.g., for self-signed certs)
  ca: fs.readFileSync(path.resolve(__dirname, 'gca_cert.pem')), // for self-signed or chained CA certs
  requestCert: true, // Request client certificate
  rejectUnauthorized: true // You can set this to true to reject unauthorized clients
};

// Create a TLS server
const server = tls.createServer(options, (socket) => {
  console.log('Client connected', socket.getX509Certificate().subject);

  socket.write('Welcome to the TLS server!\n');

  // Handle data received from the client
  socket.on('data', (data) => {
    console.log(`Data received from client: ${data}`);
    socket.write(`Server received: ${data}`);
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Start the server and listen on a specific port
server.listen(8080, () => {
  console.log('TLS server is listening on port 8080');
});
