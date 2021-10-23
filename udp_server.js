// Server

  
var clients = {};
var pesan = "Hallo";

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  clients[JSON.stringify([rinfo.address, rinfo.port])] = true;
  pesan = msg;
  for (var client in clients) {
      client = JSON.parse(client);
      var port = client[1];
      var address = client[0];
      server.send(pesan, 0, pesan.length, port, address);
  }
  
});


server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(5001);