// Example adapted from https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
// https://gist.github.com/sid24rane

const udp = require('dgram')
const conf = require('./config/config2')

// creating a client socket
const client = udp.createSocket('udp4')

//buffer msg
var angka = [
    "1,2,3",
    "2,1,3",
    "3,2,1",
  ];

client.on('message', (msg, info) => {
    console.log('Data received from server : ' + msg.toString())
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port)
})

//sending msg
function kirimTerus(){
    var message = new Buffer(angka[Math.floor(Math.random() * angka.length)]);
    client.send(message, conf.port, conf.host, error => {
        if (error) {
            console.log(error)
            client.close()
        } else {
            console.log('Data sent !!!')
        }
    })
}

setInterval(kirimTerus,1000);

client.bind(5501);

// setTimeout( () => {
//     client.close()
// },conf.timeout)