/**
 * Name: IOTdevice_read_config_1_0.ino
 * Version: 1.0.2
 * Creation Date:12/11/2017
 * Author: Ab Kurk
 * Description:
 * This sketch is part of a tutorial to teach you how to create a user configurable IOT project
 * using the ESP8266 Adafruit HUzzah. This is the completed sketch that both enables you to
 * configure your IOT device and Operate it.
 * 
 * Using a hardware switch you can switch between normal mode and setup mode. It also has basic content
 * error checking to make sure the input on the web form is correct.
 * 
 */

#include <WiFiClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>

//Webserver declaration
ESP8266WebServer server(80);
//WiFi Setup variables
char ssidc[30];//Stores the router name for IOT
char passwordc[30];//Stores the password for IOT
int ip_group=0;//sets what number set of the IP address we are collecting. 5 in total
String string_IP="";//temporarily stores a IP group number
IPAddress wap_ip(192,168,1,1);
IPAddress wap_gateway(192,168,1,254);
IPAddress subnet(255, 255, 255, 0); 
const char *ssid2 = "Test";
const char *password2 = "password";


//Global Variables
#define button_Pin 13
String ssid_Arg;// Error message for ssid input
String password_Arg;// Error message for password input
String ip_Arg;// Error message for ip input
String gw_Arg;// Error message for gateway input
//Creating the input form
String INDEX_HTML;

//creates int out of a string for your IP address
int ip_convert(String convert){
  int number;
  if (convert.toInt()){
      number=convert.toInt();
      string_IP="";
      return number;
     }else{
      Serial.println("error. ONe Not an IP address");
      return 400;
     }
 }
//Reads a string out of memory
String read_string(int l, int p){
  String temp;
  for (int n = p; n < l+p; ++n)
    {
     if(char(EEPROM.read(n))!=';'){
        if(isWhitespace(char(EEPROM.read(n)))){
          //do nothing
        }else temp += String(char(EEPROM.read(n)));
      
     }else n=l+p;
     
    }
  return temp;
}

void setup() {
   EEPROM.begin(512);
    Serial.begin(115200);
    pinMode(LED_BUILTIN, OUTPUT);
   pinMode(button_Pin, INPUT);
   if(digitalRead(button_Pin) == HIGH) {
    IOT();
   }else if(digitalRead(button_Pin) == LOW){
    WAP();
   }
  //Configuring Web Server
  server.on("/", handleRoot);
  server.on("/on",handleOn);
  server.on("/off",handleOff);
  server.on("/submit",handleSubmit);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("HTTP server started");
}
void handleOn(){// handles htttp request for path /on. It switches on the onboard led
  server.send(200,"text/html","<h1> LED is ON</h1>");
  digitalWrite(LED_BUILTIN, LOW);
}
void handleOff(){// handles htttp request for path /off. It switches off the onboard led
  server.send(200,"text/html","<h1> LED is OFF</h1>");
  digitalWrite(LED_BUILTIN, HIGH);
}

//Handles http requests for paths not defined
void handleNotFound()
{
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET)?"GET":"POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i=0; i<server.args(); i++){
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}
/*The WAP() function configures and calls all functions and
 * variables needed for creating a WiFi Access Poit
 *
 */
void WAP(){
  delay(1000);
   WiFi.softAPConfig(wap_ip, wap_gateway, subnet);
  Serial.print("Setting soft-AP ... ");
  WiFi.softAP(ssid2, password2);
  Serial.print("Soft-AP IP address = ");
  Serial.println(WiFi.softAPIP());
}
/*The IOT() function configures and calls all functions and variables 
 * needed for configuring an IOT device
 */
void IOT(){
    //reading the ssid and password out of memory
    delay(3000);
    String string_Ssid="";
    String string_Password="";
    string_Ssid= read_string(30,0); 
    string_Password= read_string(30,100); 
    Serial.println("ssid: "+string_Ssid);
    Serial.println("Password:"+string_Password);
    string_Password.toCharArray(passwordc,30);
    string_Ssid.toCharArray(ssidc,30);  
  
  //Reading IP information out of memmory
    int ip_Info[5];//holds all converted IP integer information
    for (int n = 200; n < 216; ++n)
    {
     if(char(EEPROM.read(n))!='.'&& char(EEPROM.read(n))!=';'){//
      string_IP += char(EEPROM.read(n));
     }else if(char(EEPROM.read(n))=='.'){//if(char(EEPROM.read(n))=='.')
        ip_Info[ip_group]=ip_convert(string_IP);
        ip_group++;
     }else if(char(EEPROM.read(n))==';'){
        ip_Info[ip_group]=ip_convert(string_IP);
        ip_group++;
        n=217;
     }
  } 
    string_IP="";
    string_IP=read_string(4,220);
    Serial.println("GW: "+String(string_IP));
    ip_Info[ip_group]=ip_convert(string_IP);
    Serial.println("IP:"+String(ip_Info[0])+"."+String(ip_Info[1])+"."+String(ip_Info[2])+"."+String(ip_Info[3]));
    
  
   //configuring conection parameters, and connecting to the WiFi router
  IPAddress  IOT_ip(ip_Info[0], ip_Info[1], ip_Info[2], ip_Info[3]); // defining ip address
  IPAddress IOT_gateway(ip_Info[0], ip_Info[1],ip_Info[2],ip_Info[4]); // set gateway to match your network
   //IPAddress subnet(255, 255, 255, 0); // set subnet mask to match your network
   WiFi.config(IOT_ip,IOT_gateway,subnet);
   WiFi.begin(ssidc, passwordc);
   int onoff=0;
   delay(1000);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("Wifi Status:");
    Serial.println(WiFi.status());
    if(onoff==0){
      digitalWrite(LED_BUILTIN, HIGH);
      onoff=1;
    }else{
     digitalWrite(LED_BUILTIN, LOW); 
     onoff=0;
    }
  }
  Serial.println("Connected");
  digitalWrite(LED_BUILTIN, HIGH);
  
}

void loop() {
  // put your main code here, to run repeatedly:
server.handleClient();
}
// handles htttp request for path /
/**
 * handles htttp request for path /. If the setup switch is turned off 
 * it will display instructions how to turn the onboard led on or off.
 * If the setup switch is turned on it displays an input form
 */
void handleRoot(){
  if(digitalRead(button_Pin)==HIGH){
    String responce="<H2>Your Are Connected to demo Internet Of Things Device</H2>";
    responce +="<p>Here are instructions on how to turn the onboard led on and off<br>";
    responce +="<p>To Turn on the onboard LED type http://";
    responce +=String(WiFi.localIP()[0]) + "." + String(WiFi.localIP()[1]) + "." + String(WiFi.localIP()[2]) + "." + String(WiFi.localIP()[3]);
    responce +="/on in your browser<br>";
    responce +="<p>To Turn off the onboard LED type http://";
    responce +=String(WiFi.localIP()[0]) + "." + String(WiFi.localIP()[1]) + "." + String(WiFi.localIP()[2]) + "." + String(WiFi.localIP()[3]);
    responce +="/off in your browser";
    server.send(200,"text/html",responce);
  }else{
    create_form("","","","");
    server.send(200, "text/html", INDEX_HTML);
  }
}
// This function creates main input form
void create_form(String ssidr,String passwordr,String ipr, String gwr){
    INDEX_HTML = "<!DOCTYPE HTML>";  
    INDEX_HTML +="<html>";
    INDEX_HTML +="<head>";
    INDEX_HTML +="<meta content=\"text/html; charset=ISO-8859-1\"";
    INDEX_HTML +=" http-equiv=\"content-type\">";
    INDEX_HTML +="<title>ESP8266 Web Form Demo</title>";
    INDEX_HTML +="</head>";
    INDEX_HTML +="<body>";
    INDEX_HTML +="<h1>ESP8266 Web Form Demo</h1>";
    INDEX_HTML +="<FORM action=\"/submit\" method=\"post\">";
    INDEX_HTML +="<P>";
    INDEX_HTML +=ssid_Arg;
    INDEX_HTML +="<br><label>ssid:&nbsp;</label>";
    INDEX_HTML +="<input size=\"30\" maxlength=\"30\" value=\"" ;
    INDEX_HTML +=ssidr;
    INDEX_HTML += "\" name=\"ssid\">";
    INDEX_HTML +="<br>";
    INDEX_HTML +=password_Arg;
    INDEX_HTML +="<br><label>Password:&nbsp;</label><input size=\"30\" maxlength=\"30\"  value=\"";
    INDEX_HTML +=passwordr;
    INDEX_HTML +=" \"name=\"Password\">";
    INDEX_HTML +="<br>";
    INDEX_HTML +=ip_Arg;
    INDEX_HTML +="<br><label>IP:&nbsp;</label><input size=\"15\" maxlength=\"15\" name=\"IP\" value=\"";
    INDEX_HTML +=ipr;
    INDEX_HTML +="\"><br>";
    INDEX_HTML +=gw_Arg;
    INDEX_HTML +="<br><label>Gateway:&nbsp;</label><input size=\"3\" maxlength=\"3\" name=\"GW\"value=\"";
    INDEX_HTML +=gwr;
    INDEX_HTML +="\"><br>";
    INDEX_HTML +="<br>";
    INDEX_HTML +="<INPUT type=\"submit\" value=\"Send\"> <INPUT type=\"reset\">";
    INDEX_HTML +="</P>";
    INDEX_HTML +="</FORM>";
    INDEX_HTML +="</body>";
    INDEX_HTML +="</html>";
}
//Handles  http request for path /submit
void handleSubmit(){
   int error[4];
   int err=0;
  if(digitalRead(button_Pin)==LOW){
    if (server.hasArg("ssid") && server.hasArg("Password") && server.hasArg("IP") && server.hasArg("GW") ) { //If all form fields contain data call handelSubmit() 
      error[0]=ssid_error_Check(server.arg("ssid"));
      error[1]=password_error_Check(server.arg("Password"));
      error[2]=ip_error_Check(server.arg("IP"));
      error[3]=gw_error_Check(server.arg("GW"));
      for(int n=0;n<4;n++){
        if(error[n]!=0){
          create_form(server.arg("ssid"),server.arg("Password"),server.arg("IP"), server.arg("GW"));
          server.send(200, "text/html", INDEX_HTML);
          err=1;
          break;
        }
       }
       if(err==0){
        String response = "<h1>This is the information you entered </h1><BR>";
        response += "<p>The ssid is ";
        response += server.arg("ssid");
        response += "<br>";
        response += "And the password is ";
        response += server.arg("Password");
        response += "<br>";
        response += "And the IP Address is ";
        response += server.arg("IP");
        response += "<br>";
        response += "And the Gateway Address is ";
        response += server.arg("GW");
        response += "</P><BR>";
        response += "<P>Set your switch to normal operations and restart your device<br>";
        response += "Congratulations! You have completed the setup task!</P>";
        response += "<H2><a href=\"/\">go home</a></H2><br>";
        server.send(200, "text/html", response);
        //calling function that writes data to memory
        write_to_Memory(String(server.arg("ssid")), String(server.arg("Password")), String(server.arg("IP")), String(server.arg("GW")));
      }
     }else{
      create_form("","","","");
      server.send(200, "text/html", INDEX_HTML);
     }
      
   }else{//button check
    server.send(200, "text/html", "<H1>check the position of the setup switch and reset device</h1>");
   }

 }
//Checks for correct construction of the SSID  
int ssid_error_Check(String content){
 int error=0;
 if(content.length()<2 || content.length()>30){
  ssid_Arg="Your SSID can't be smaller than 2 characters, and not bigger then 30";
  error=1; 
 }else if(content.indexOf(';')!=-1){
  ssid_Arg="The SSID can't contain ;";
  error=1;
 }else{
  ssid_Arg="";
  error=0;
 }
 return error;
}
//Checks for the correct construction of the password
int password_error_Check(String content){
  int error=0;
 if(content.length()<8 || content.length()>30){
  password_Arg="Your password can't be smaller than 8 characters, and not bigger then 30";
  error=1; 
 }else if(content.indexOf(';')!=-1){
  password_Arg="The password can't contain ;";
  error=1;
 }else if(content.indexOf('"')!=-1){
  password_Arg="The password can't contain \"";
  error=1;
 }else if(content.indexOf(';')!=-1){
  password_Arg="The password can't contain \'";
  error=1;
 }else{
  password_Arg="";
  error=0;
 }
 return error;
}


//Checks for the correct construction of the ip address  
int ip_error_Check(String content){
 int error=0;
 if(content.length()<7 || content.length()>15){
  ip_Arg="Your IP can't be smaller than 7 characters, and not bigger then 15";
  error=1; 
 }else {
   ip_Arg="";
    error=0;
 }
 if(error==0){
 int ip_Info=0;//holds all converted IP integer information
  content+=";";
  for (int n = 0; n < content.length(); ++n)
  {
    if(content[n] != '.' && content[n] != ';') { //
      if(isAlpha(content[n])){
        ip_Arg="Missformed IP. It can only contain  4 sets of numbers between 0 and 254 seperated by '.' 1.0";
        error=1;
        return error;
        break;
      }
      string_IP += content[n];
    } else if (content[n] == '.') { 
      ip_Info = ip_convert(string_IP);
    } else if (content[n] == ';') {
      ip_Info = ip_convert(string_IP);
      n = content.length();
    }
    if(ip_Info>254){
      Serial.println("ip_Info: "+String(ip_Info));
      ip_Arg="Missformed IP. It can only contain  4 sets of numbers between 0 and 254 seperated by '.'1.1";
      error=1;
      n = content.length();
    }
  }
 }
 return error;
}
//Checks for the correct construction of the gateway address
int gw_error_Check(String content){
  int error=0;
  
  for(int n=0;n<content.length();n++){
    if(isAlpha(content[n])){
        gw_Arg="Missformed Gateway address. Your Gateway can only contain numbers between 0 and 254 2.0";
        error=1;
        return error;
        break;
      }
  }
  int gwn=ip_convert(content);
  if(content.length()<1 || content.length()>3){
      gw_Arg="Your Gateway can't be smaller than 1 characters, and not bigger then 3";
      error=1; 
 }else if(gwn>254 || gwn<0){
      gw_Arg="Your Gateway can only contain numbers between 0 and 254";
      error=1;
 }else{
    error=0;
    gw_Arg="";
 }
  return error;
}


//Write data to memory
/**
   We prepping the data strings by adding the end of line symbol I decided to use ";".
   Then we pass it off to the write_EEPROM function to actually write it to memmory
*/
void write_to_Memory(String s, String p, String i, String g) {
  s += ";";
  write_EEPROM(s, 0);
  p += ";";
  write_EEPROM(p, 100);
  i += ";";
  write_EEPROM(i, 200);
  g += ";";
  write_EEPROM(g, 220);
  EEPROM.commit();
}
//write to memory
void write_EEPROM(String x, int pos) {
  for (int n = pos; n < x.length() + pos; n++) {
    EEPROM.write(n, x[n - pos]);
  }
}


