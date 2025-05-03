const brokerIP = "192.168.195.222"; // Bilgisayarın IP'si (telefon hotspot ağı)
const client = mqtt.connect(`wss://${brokerIP}:9001`, {
  clientId: 'web_' + Math.random().toString(16).substr(2, 8)
});

const toggleBtn = document.getElementById('toggleBtn');
const ledStateSpan = document.getElementById('ledState');
let currentState = 'OFF';

client.on('connect', () => {
  console.log("MQTT Bağlantısı Kuruldu");
  client.subscribe("esp32/led/status");
});

client.on('message', (topic, message) => {
  if (topic === "esp32/led/status") {
    currentState = message.toString();
    ledStateSpan.textContent = currentState;
    toggleBtn.className = currentState === 'ON' ? 'on' : 'off';
  }
});

toggleBtn.addEventListener('click', () => {
  const newState = currentState === 'ON' ? 'OFF' : 'ON';
  client.publish("esp32/led/control", newState);
});
