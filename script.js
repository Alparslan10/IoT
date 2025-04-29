// MQTT ayarları
const options = {
  protocol: "wss",
  hostname: "192.168.195.222",  // Buraya kendi MQTT sunucu IP adresini yaz
  port: 9002,  // WebSocket portunu doğru şekilde belirt
  path: "/mqtt",
  rejectUnauthorized: false
};

const client = mqtt.connect(options);

// LED Durumunu Güncelle
const statusElement = document.getElementById("ledStatus");

client.on('connect', function () {
  console.log("MQTT bağlantısı başarılı");
  client.subscribe("esp32/led/state"); // LED durumunu dinliyoruz
});

// MQTT mesajı geldiğinde durumu güncelle
client.on('message', function (topic, message) {
  if (topic === "esp32/led/state") {
    const state = message.toString();
    statusElement.textContent = "LED Durumu: " + (state === "on" ? "Açık" : "Kapalı");
  }
});

// LED durumu gönderme
function setLED(state) {
  client.publish("esp32/led/control", state);
  statusElement.textContent = "LED Durumu: " + (state === "on" ? "Açık" : "Kapalı");
}
