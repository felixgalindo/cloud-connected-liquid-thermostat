# Cloud Connected Liquid Thermostat

Raspberry PI 2 nodejs app that regulates the liquid temperature and plots liquid temp and liquid level on plotly.

##Applications:
* Aquariums
* Pools
* Water Well Tanks
* And More!

<img src="http://i.imgur.com/JtbtZLYh.jpg" width="600px">

[Check out the graphs!](https://plot.ly/~felixgalindo91/folder/home)

##Parts you'll need:
* Raspberry PI 2B 
* <a href="https://www.adafruit.com/products/381">DS18B20</a> Waterproof Temperature Sensor
* <a href="https://www.adafruit.com/product/1085">ADS1115</a> 16-Bit ADC 
* <a href="http://www.amazon.com/TOOGOO-Module-Development-Appliance-Control/dp/B00TO7IY76/ref=sr_1_1?s=pc&ie=UTF8&qid=1460039137&sr=1-1&keywords=TOOGOO+relay">DC 5V Coil Relay Module</a> 
* <a href="https://www.adafruit.com/products/464">12" eTape Liquid Level Sensor</a>
* Liquid Heater( I used a <a href="http://www.amazon.com/Fluval-M-200-Watt-Submersible-Heater/dp/B0027VQ0WM/ref=sr_1_37?s=pet-supplies&ie=UTF8&qid=1460183445&sr=1-37">Aquarium Heater</a> )
* Breadboard
* Jumper Cables
* 10 KOhm Resistor
* (2) 1 KOhm Resistor  
* And a container with liquid of course (tall enough for the eTape sensor and your heater to fit).   

##Hardware Installation Instructions:  

<img src="http://i.imgur.com/9tz37qVh.jpg" width="600px">  
 
###Wire up the ADS1115:
ADS1115 (Pin 1 Vdd)    --->     Pi (Pin 4 5V)    
ADS1115 (Pin 2 Gnd)    --->     Pi (Pin 6 Gnd)    
ADS1115 (Pin 3 SCL)    --->     Pi (Pin 3 SDA1)  
ADS1115 (Pin 4 SDA)    --->     Pi (Pin 5 SCL1)    


###Wire up the Relay Module:
Relay Module (Pin 1 Signal)   --->  Pi (Pin 40)  
Relay Module (Pin 2 V+)       --->  Pi (Pin 2 5v)  
Relay Module (Pin 3 GND)      --->  Pi (Pin 20 GND)  

###Wire up the DS18B20:
DS18B20 (Data Wire)     --->     Pi (Pin 7 1-Wire)  (with 10Kohm pull up resistor to Pi Pin 1 3.3V)  
DS18B20 (V+)            --->     Pi (Pin 1 3.3V)  
DS18B20 (Gnd)           --->     Pi (Pin 20 GND)  

###Wire up the Etape:  
ADS1115 (Pin 7 A0)     --->     eTape (Pin 1)   
eTape (Pin 1)          --->     1K ohm ---> Pi (Pin 2 5v)   (voltage divider circuit)  
ADS1115 (Pin 8 A1)     --->     eTape (Pin 2)  
eTape (Pin 2)          --->     1K ohm ---> Pi (Pin 2 5v)   (voltage divider circuit)    
eTape (Pin 3 & Pin 4)  --->     Pi (Pin 9 Gnd)  

###Wire up the heater to the Relay Module:
Splice Common wire on heater.
Connect 1 end of spliced wire to Relay Output Pin 1.  
Connect the other end of spliced wire to Relay Output Pin 2.  
Connect heater power cord power source(eg. 120v ac wall outlet).  

##Software Installation Instructions:
These instructions have been tested with the latest version of Raspian on a Raspberry PI 2B with Nodejs 4 and with internet connection.  SSH into your pi and follow the instructions below.  

###Setup the DSB18B20 

####Add One Wire support

```
sudo nano /boot/config.txt
```

Add the following line to the end of the file:  
```
dtoverlay=w1-gpio
```

Reboot the Pi:

```
sudo reboot
```

Get your ds18b20 serial number by running:  

```
sudo modprobe w1-gpio
sudo modprobe w1-therm
cd /sys/bus/w1/devices/
ls
```
You should see something a number that starts with 28- like 28-80000003a557. If you dont, check your wiring and  
make sure you followed all the steps above. Make note of this number as this is your ds18b20 serial number you will   
need to configure the app.  

###Setup the ADS1115 
####Install smbus and i2c tools

```
sudo apt-get install python-smbus
sudo apt-get install i2c-tools
```

####Install Kernel Support

Run:
```
sudo nano /etc/modules
```

Add the following:

```
i2c-bcm2708 
i2c-dev
```

Depending on your distribution, you may also have a file called /etc/modprobe.d/raspi-blacklist.conf  

If you do not have this file then there is nothing to do, however, if you do have this file, run :  

```
sudo nano /etc/modprobe.d/raspi-blacklist.conf
```

And comment/remove the following lines:  

```
blacklist spi-bcm2708  
blacklist i2c-bcm2708  
```

If you are running a recent Raspberry Pi (3.18 kernel or higher) you will also need to update the /boot/config.txt file. Edit it with: 
```
sudo nano /boot/config.txt
```

And add the following lines:  

```
dtparam=i2c1=on
dtparam=i2c_arm=on
```

Reboot the Pi:

```
sudo reboot
```
###Setup Plotly Account
Setup a plotly account at <a href="https://plot.ly/">https://plot.ly/</a>
Make note of your username and api key which are found at <a href="https://plot.ly/settings/api">https://plot.ly/settings/api</a>;

###Installing and Running the App

Clone the cloud-connected-liquid-thermostat repo:

```
git clone https://github.com/felixgalindo/cloud-connected-liquid-thermostat.git
```

Modify the cloud-connected-liquid-thermostat config file to use your desired settings.       
Make sure you at least change the plotlyUsername and plotlyApiKey to match your plotly account.
Also change ds18b20Id to match your ds18b20 serial number.

```
sudo nano ./cloud-connected-liquid-thermostat/cloud-connected-liquid-thermostat/config/index.js 
```
Exit nano and go back to the cloud-connected-liquid-thermostat folder.
Run an npm install:

```
npm install
```

Then run the app:

```
sudo node index.js
```





