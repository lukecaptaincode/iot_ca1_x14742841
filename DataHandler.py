import time
import dweepy
import csv
from Sensors import Sensors


class DataHandler:

    def post(self, data):
        print("Dweeting")
        thing = "luke-captains-iot-dweet"
        print(dweepy.dweet_for(thing, data))
        print("Dweeted")

    def stream_data(self):
        sensors = Sensors(False)
        print("Stream start")
        while True:
            try:
                #if sensors.get_switch() == 1:
                    if sensors.get_light() > 0:
                        # resistance = (float)(1023 - getLight()) * 10 / getLight()
                        print("light_value = %d" % (sensors.get_light()))
                        print("sound_value = %d" % (sensors.get_sound()))
                    sensors.blink()
                    sensors.buzz()
                    # get readings and dweet
                    data = sensors.get_readings()
                    self.post(data)

                    # Appending to CSV
                    with open("output.csv", "a") as csv_file:
                        out_file = csv.writer(csv_file)
                        print("Write to file")
                        out_file.writerow([data["Light"], data["Sound"]])
                        print("Written")
                        time.sleep(1)
                #else:
                   # return print("Switch is off")
            except IOError:
                print("IO Error")
