var pcap = require('pcap');

function parseSSID(rawPacket){
  var result;
  if(rawPacket[50] === 0){
    var length = rawPacket[51];
    if(length > 0){
      result = '';
      for(var i = 52; i < 52 + length; i++){
        result += String.fromCharCode(rawPacket[i]);
      }
    }
  }
  return result;
}

var pcapSession = pcap.createSession('wlan0', 'wlan type mgt subtype probe-req');
pcapSession.on('packet', function(rawPacket){
  var packet = pcap.decode.packet(rawPacket);
  console.log('from: ' + packet.link.ieee802_11Frame.shost);
  console.log('to: ' + packet.link.ieee802_11Frame.dhost);
  console.log('signal strength: ' + packet.link.ieee802_11Frame.strength);
  console.log('ssid: ' + parseSSID(rawPacket));
});