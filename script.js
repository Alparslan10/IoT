// MQTT Broker bağlantı bilgileri
const options = {
  protocol: "ws",           // WebSocket kullanıyoruz
  hostname: "192.168.195.222",  // Bilgisayarın IP adresini yaz
  port: 9001,               // WebSocket portu (Mosquitto'nun WebSocket portu)
  path: "/mqtt",            // MQTT path (Mesajlaşma yolu)
  clientId: "web-client",   // Web istemci kimliği
  clean: true
};

// MQTT Client oluşturma
const client = mqtt.connect(options);

// LED Durumunu Güncellemek için DOM Elementi
const statusElement = document.getElementById("ledStatus");

// MQTT Bağlantısı Başarılı olduğunda
client.on('connect', function () {
  console.log("MQTT bağlantısı başarılı");
  client.subscribe("esp32/led/state"); // LED durumunu dinliyoruz
});

// MQTT Mesajı Geldiğinde LED Durumunu Güncelle
client.on('message', function (topic, message) {
  if (topic === "esp32/led/state") {
    const state = message.toString();
    statusElement.textContent = state === "on" ? "Açık" : "Kapalı";
    statusElement.style.color = state === "on" ? "green" : "red";  // LED durumu renk değişir
  }
});

// LED Kontrolünü Gönderme
function setLED(state) {
  client.publish("esp32/led/control", state);
  statusElement.textContent = state === "on" ? "Açık" : "Kapalı";
  statusElement.style.color = state === "on" ? "green" : "red";  // LED durumu renk değişir
}
