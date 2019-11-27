    import oscP5.*;
import netP5.*;
OscP5 oscP5;

import processing.serial.*;

Serial Arduino1;
Serial Arduino2;

void setup() {
  size(400,400);
  frameRate(1);
  
  oscP5 = new OscP5(this, 12346);
 
  printArray(Serial.list());
  
  Arduino1 = new Serial(this, "/dev/tty.usbmodem14124101", 57600);
  Arduino2 = new Serial(this, "/dev/tty.usbmodem14124401", 57600);
}


void draw() {
  background(0);
}

void oscEvent(OscMessage OSC) {
  print(" addrpattern: "+OSC.addrPattern());
  Arduino1.write(OSC.getBytes());
  Arduino2.write(OSC.getBytes());
}