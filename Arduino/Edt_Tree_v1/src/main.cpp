/*
Edt-Tree

Using PlatformIO
*/
#define VERSION "v1"
//#define DEBUG
//#define CButton
#define ZButton

// include as first to avoid intellisense issues in visual studio
#include "ESP8266WiFi.h"

#include "Definitions.h"

#include "Arduino.h"
#include "WiFiUdp.h"
#include "OSCArduino.h"
#include "Statemachine.h"
#include "Time.h"

#include "LightPWM.h"
#include "Trak.h"
#include "Chuk.h"
#include "Pedal.h"

// defines WifiName and WifiPassword
#include "WifiConfig.h"

WiFiUDP Udp;
OSC::Arduino Osc;

EdtLightPWM PWM = EdtLightPWM();
//EdtOSCTrak Trak = EdtOSCTrak(OSC_TRAK);
//EdtOSCPedal Pedal = EdtOSCPedal(OSC_PEDAL);
EdtOSCChuk Chuk = EdtOSCChuk(OSC_SUIT_CHUK);

void setup() {
	Statemachine.begin(5, HIGH);
}

void loop() {
	Statemachine.loop();

	if (Statemachine.isBegin()) {
		Time.begin();

		// Tree code
		int i = 0;
		while (++i < 5) {
			// add some delay
			delay(1000);

			// keep updating status
			Statemachine.loop();
		}

		// Set WiFi mode to station
		WiFi.disconnect();
		WiFi.mode(WIFI_STA);
		WiFi.begin(WifiName, WifiPassword);
		while (WiFi.status() != WL_CONNECTED)
		{
			// really wait for this
			Time.loop();

			if (Time.t100ms) {
				// keep updating status
				Statemachine.loop();
			}

			yield();
		}

		Udp.begin(PORT_BROADCAST);

		Osc = OSC::Arduino(1, 0);
		Osc.bindUDP(&Udp, IP_BROADCAST, PORT_BROADCAST);
		//Osc.addConsumer(&Trak);
		//Osc.addConsumer(&Pedal);
		Osc.addConsumer(&Chuk);

		PWM.start(5);

		Statemachine.ready();
	}
	else {

		int output = 0;
		bool strobo = false;
		unsigned int stroboCycle = 0;
		unsigned int stroboLength = 8096;

		while (Statemachine.isRun()) {
			Time.loop();
			
			Osc.loop(Time.tOSC);

#ifdef CButton
			if (Chuk.data.buttonC()) {
#endif
#ifdef ZButton
			if (Chuk.data.buttonZ()) {
#endif
				output = 255;

				strobo = Chuk.data.joyY() > 0;

				if (strobo) {
					stroboLength = 8096 - (Chuk.data.joyY() * 48);
				}
				else {
					stroboLength = 8096;
				}

				if (Chuk.data.joyY() < 0) {
					output += max(-255, Chuk.data.joyY() * 3);
				}

				if (Chuk.data.joyX() > 40) {
					output = max(output, pow(((double)stroboCycle) / ((double)stroboLength), 2.0) * 255);
				}
			}
			else {
				strobo = false;
				output = 0;
			}

			stroboCycle++;

			if (!Chuk.data.buttonC() && !Chuk.data.buttonZ()) {
				PWM.set(16);
			} 
			else if (strobo) {
				PWM.set((stroboCycle < stroboLength) ? output : 0);
			}
			else {
				PWM.set(output);
			}

			if (stroboCycle > 2 * stroboLength) {
				stroboCycle = 0;
			}

			PWM.loop();

			// yield to the mighty ESP8266 code 
			yield();
		}
	}
}
