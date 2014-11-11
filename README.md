#Serial to SocketIO
This project demonstrates how to implement a thin proxy server in [node.js](http://nodejs.org/) that reads input from the serial port and forwards it to web clients via [socket.io](http://socket.io).


The specific client used in this demo presents temperature readings from a board matching Neil Gershenfeld's [hello.temp.45](http://academy.cba.mit.edu/classes/input_devices/temp/hello.temp.45.png) example.

##Usage
###install prerequisites
```bash
    npm install
```

###start
```bash
    node app.js <serial_port>
```

If everything is working you should be able to see temperature readings at [http://127.0.0.1:3000](http://127.0.0.1:3000).