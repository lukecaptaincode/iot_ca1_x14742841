try:
    import grovepi
except:
    print("No grovepi, you must be testing")
from random import randint
import time

class Sensors:
    # sensor ports
    light_sensor = 0
    sound_sensor = 1
    switch = 4
    led = 3
    buzzer = 2

    # Turn on LED once sensor exceeds threshold resistance
    threshold_light = 10
    threshold_sound = 400

    is_test = False

    def __init__(self, is_test):
        self.is_test = is_test
        if not is_test:
            grovepi.pinMode(self.light_sensor, "INPUT")
            grovepi.pinMode(self.sound_sensor, "INPUT")
            grovepi.pinMode(self.led, "OUTPUT")
            grovepi.pinMode(self.buzzer, "OUTPUT")
            print(grovepi.digitalRead(self.switch))

    def blink(self):
        digitalWrite(led,1)
        time.sleep(1)
        digitalWrite(led,0)
    def buzz(Self):
        digitalWrite(buzzer,1)
        time.sleep(1)
        digitalWrite(buzzer, 0)

    def get_light(self):
        if self.is_test:
            return randint(0, 10)
        else:
            return grovepi.analogRead(self.light_sensor)

    def get_sound(self):
        if self.is_test:
            return randint(0, 10)
        else:
            return grovepi.analogRead(self.sound_sensor)

    def get_switch(self):
        if self.is_test:
            return 1
        else:
            return grovepi.digitalRead(self.switch)

    def get_readings(self):
        readings = {}
        readings["Sound"] = self.get_sound()
        readings["Light"] = self.get_light()
        return readings
