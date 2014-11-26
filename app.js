var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serialPort = require("serialport");

if (process.argv.length != 3) {
    console.log("usage: \"node app.js <serial_port>\"");
    process.exit(0);
}

//setup expressjs to serve static files from the static directory and redirect root to index.html
app.use("/", express.static(__dirname + "/static"));
app.get("/", function (req, res) {
    res.redirect('/index.html');
});

http.listen(3000, function () {
    console.log('go to http://127.0.0.1:3000');
});

io.on('connection', function(socket){
    //relay socket.io writes to the serial port
    socket.on('data', function(data){
        console.log("emitting " + data);
        serialConnection.write(data);
    });
});

//initialize serial connection
var serialConnection = new serialPort.SerialPort(process.argv[2], {
    parser: serialPort.parsers.byteLength(1), //
    baudrate: 9600
});

//on data callback broadcast to the default socketio connection
serialConnection.on("open", function () {
    serialConnection.on('data', function (data) {
        io.emit("data", data[0]);
    });
});

//error handling
serialConnection.on("error", function () {
    console.error("Can't establish serial connection with " + process.argv[2]);
    process.exit(1);
});