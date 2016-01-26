

var noble = require('noble');
var socket = require('socket.io-client')('http://localhost:3000/scanner');

var count = 0;

socket.on('connect', function(){  
  console.log('connected to server');
});

socket.on("response", function(response) {  
    console.log("From Beacon Server", response, '\n');

});

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});


noble.on('discover', function(peripheral) {

  var beacon = String(peripheral.advertisement.localName);

      if(beacon !== 'undefined') {

        if (beacon.indexOf("MiBeacon") != -1) {
          /*console.log('peripheral discovered (' + peripheral.id +
                  ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
                  ' connectable ' + peripheral.connectable + ',' +
                  ' RSSI ' + peripheral.rssi + ':');*/

            console.log(peripheral.advertisement.localName);
            count++;
            console.log('Number of people in room: ' + count);
      

            if (count < 5) {
              console.log("It's not very busy" + '\n');
            } else {
              console.log("Wow it's busy in here!" + '\n');
            }

            socket.emit('message', beacon, count); 
         
        }
  
      
     /* var serviceData = peripheral.advertisement.serviceData;
      if (serviceData && serviceData.length) {
        console.log('\there is my service data:');
        for (var i in serviceData) {
          console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
        }
      }
      if (peripheral.advertisement.manufacturerData) {
        console.log('\there is my manufacturer data:');
        console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
      }
      if (peripheral.advertisement.txPowerLevel !== undefined) {
        console.log('\tmy TX power level is:');
        console.log('\t\t' + peripheral.advertisement.txPowerLevel);
      }*/


     
      
  }


});

