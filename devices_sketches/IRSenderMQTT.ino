#include <PubSubClient.h>

/*
 * IRremoteESP8266: IRServer - demonstrates sending IR codes controlled from a webserver
 * Version 0.3 May, 2019
 * Version 0.2 June, 2017
 * Copyright 2015 Mark Szabo
 * Copyright 2019 David Conran
 *
 * An IR LED circuit *MUST* be connected to the ESP on a pin
 * as specified by kIrLed below.
 *
 * TL;DR: The IR LED needs to be driven by a transistor for a good result.
 *
 * Suggested circuit:
 *     https://github.com/crankyoldgit/IRremoteESP8266/wiki#ir-sending
 *
 * Common mistakes & tips:
 *   * Don't just connect the IR LED directly to the pin, it won't
 *     have enough current to drive the IR LED effectively.
 *   * Make sure you have the IR LED polarity correct.
 *     See: https://learn.sparkfun.com/tutorials/polarity/diode-and-led-polarity
 *   * Typical digital camera/phones can be used to see if the IR LED is flashed.
 *     Replace the IR LED with a normal LED if you don't have a digital camera
 *     when debugging.
 *   * Avoid using the following pins unless you really know what you are doing:
 *     * Pin 0/D3: Can interfere with the boot/program mode & support circuits.
 *     * Pin 1/TX/TXD0: Any serial transmissions from the ESP8266 will interfere.
 *     * Pin 3/RX/RXD0: Any serial transmissions to the ESP8266 will interfere.
 *   * ESP-01 modules are tricky. We suggest you use a module with more GPIOs
 *     for your first time. e.g. ESP-12 etc.
 */
#include <Arduino.h>
#if defined(ESP8266)
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#endif  // ESP8266
#if defined(ESP32)
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#endif  // ESP32
#include <IRremoteESP8266.h>
#include <IRsend.h>
#include <WiFiClient.h>

const char* kSsid = "BorovayaAP";
const char* kPassword = "25101965";

const char* mqttServer = "m12.cloudmqtt.com";
const int mqttPort = 13787;
const char* mqttUser = "oajcfgbq";
const char* mqttPassword = "JRifvCMEmidH";

WiFiClient espClient;
PubSubClient client(espClient);

MDNSResponder mdns;

#if defined(ESP8266)
ESP8266WebServer server(80);
#undef HOSTNAME
#define HOSTNAME "esp8266"
#endif  // ESP8266
#if defined(ESP32)
WebServer server(80);
#undef HOSTNAME
#define HOSTNAME "esp32"
#endif  // ESP32

const uint16_t kIrLed = 4;  // ESP GPIO pin to use. Recommended: 4 (D2).

IRsend irsend(kIrLed);  // Set the GPIO to be used to sending the message.

void handleRoot() {
  server.send(200, "text/html",
              "<html>" \
                "<head><title>" HOSTNAME " Demo</title></head>" \
                "<meta charset=\"UTF-8\">" \
                "<body>" \
                  "<h1>Hello from " HOSTNAME ", you can send NEC encoded IR" \
                      "signals from here!</h1>" \
                      "<h2>Приставка:<h2>" \
                  "<p><a href=\"ir?code=16712445\">Включение</a></p>" \
                  "<p><a href=\"ir?code=16724175\">Громкость +</a></p>" \
                  "<p><a href=\"ir?code=16718055\">Громкость -</a></p>" \
                  "<p><a href=\"ir?code=16764975\">Канал +</a></p>" \
                  "<p><a href=\"ir?code=16754775\">Канал -</a></p>" \
                  "<p><a href=\"ir?code=16749165\">ОК</a></p>" \
                  "<p> <a href=\"ir?code=16769565\">↑</a></p>" \
                  "<p><a href=\"ir?code=16716525\">←</a>   <a href=\"ir?code=16732845\">→</a></p>" \
                  "<p> <a href=\"ir?code=16765485\">↓</a></p>" \
                  "<p> <a href=\"ir?code=16744575\">1</a> <a href=\"ir?code=16728255\">2</a> <a href=\"ir?code=16760895\">3</a></p>" \
                  "<p> <a href=\"ir?code=16720095\">4</a> <a href=\"ir?code=16752735\">5</a> <a href=\"ir?code=16736415\">6</a></p>" \
                  "<p> <a href=\"ir?code=16769055\">7</a> <a href=\"ir?code=16716015\">8</a> <a href=\"ir?code=16748655\">9</a></p>" \
                  "<p>   <a href=\"ir?code=16711935\">0</a></p>" \
                "<h2>Телевизор:<h2>" \
                "<p><a href=\"ir?code=551489775\">Включение</a></p>" \
                  "<p><a href=\"ir?code=551502015\">Громкость +</a></p>" \
                  "<p><a href=\"ir?code=551534655\">Громкость -</a></p>" \
                  "<p><a href=\"ir?code=551494365\">ОК</a></p>" \
                  "<p> <a href=\"ir?code=551486205\">↑</a></p>" \
                  "<p><a href=\"ir?code=551542815\">←</a>   <a href=\"ir?code=551510175\">→</a></p>" \
                  "<p> <a href=\"ir?code=551518845\">↓</a></p>" \
                  "<p> <a href=\"ir?code=551538735\">Input</a></p>" \
                "</body>" \
              "</html>");
}

void handleIr() {
  for (uint8_t i = 0; i < server.args(); i++) {
    if (server.argName(i) == "code") {
      uint32_t code = strtoul(server.arg(i).c_str(), NULL, 10);
#if SEND_NEC
      irsend.sendNEC(code, 32);
#endif  // SEND_NEC
    }
  }
  handleRoot();
}

void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET)?"GET":"POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++)
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  server.send(404, "text/plain", message);
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
 
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
    byte* payload_copy = reinterpret_cast<byte*>(malloc(length + 1));
    if (payload_copy == NULL) {
      Serial.println("Can't allocate memory for `payload_copy`. Skipping callback!");
      return;
    }
    // Copy the payload to the new buffer
    memcpy(payload_copy, payload, length);

    // Conversion to a printable string
    payload_copy[length] = '\0';
    String callback_string = String(reinterpret_cast<char*>(payload_copy));
    String topic_name = String(reinterpret_cast<char*>(topic));

    client.publish("remote_resp", callback_string.c_str());

    uint32_t code = strtoul(callback_string.c_str(), NULL, 10);
    Serial.println("Code received:");
    Serial.println(callback_string);

    irsend.sendNEC(code, 32);

    // Free the memory
    free(payload_copy);
 
}

void reconnect() {
 // Loop until we're reconnected
  Serial.print("In reconnect");
 while (!client.connected()) {
     Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
      Serial.println("connected");  
      client.publish("remote_resp", "Connected");
      client.subscribe("remote_req");
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
 }
}

void setup(void) {
  irsend.begin();

  Serial.begin(115200);
  WiFi.begin(kSsid, kPassword);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(kSsid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP().toString());

#if defined(ESP8266)
  if (mdns.begin(HOSTNAME, WiFi.localIP())) {
#else  // ESP8266
  if (mdns.begin(HOSTNAME)) {
#endif  // ESP8266
    Serial.println("MDNS responder started");
  }



client.setServer(mqttServer, mqttPort);
client.setCallback(callback);

reconnect();

  server.on("/", handleRoot);
  server.on("/ir", handleIr);

  server.on("/inline", [](){
    server.send(200, "text/plain", "this works as well");
  });

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}



void loop(void) {
  server.handleClient();
   if (!client.connected()) {
  reconnect();
 }
 client.loop();
}
