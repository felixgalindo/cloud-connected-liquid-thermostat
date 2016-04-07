# Cloud Connected Liquid Thermostat

Raspberry PI 2 nodejs app that regulates the liquid temperature and plots liquid temp and liquid level on plotly.

##Applications:
* Aquariums
* Pools
* Water Well Tanks
* And More!

[Check out the graphs!](https://plot.ly/~felixgalindo91/folder/home)

##Parts you'll need:
* Raspberry PI 2B 
* <a href="https://www.adafruit.com/products/381">DS18B20</a> Waterproof Temperature Sensor
* <a href="https://www.adafruit.com/product/1085">ADS1115</a> 16-Bit ADC 
* <a href="http://www.amazon.com/TOOGOO-Module-Development-Appliance-Control/dp/B00TO7IY76/ref=sr_1_1?s=pc&ie=UTF8&qid=1460039137&sr=1-1&keywords=TOOGOO+relay">DC 5V Coil Relay Module</a> 
* <a href="https://www.adafruit.com/products/464">12" eTape Liquid Level Sensor</a>
* Liquid Heater( I used a <a href="https://www.adafruit.com/product/1085">Aquarium Heater</a> )
* Breadboard
* Jumper Cables
* 10 KOhm Resistor
* (2) 1 KOhm Resistor
* And a container with liquid of course (tall enough for the eTape sensor and your heater to fit). 


##Hardware Installation Instructions:

Wire up the sensors as shown here: 

##Software Installation Instructions:
These instructions have been tested with the latest version of Raspian on a Raspberry PI 2B with Nodejs 4 and with internet connection. SSH into your pi and follow the instructions below.

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
Modify the cloud-connected-liquid-thermostat config file to use your desired settings or leave the defaults.       
Make sure you change the plotlyUsername and plotlyApiKey to match your plotly account.

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





