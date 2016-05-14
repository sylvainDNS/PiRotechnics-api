import time
import RPi.GPIO as GPIO


GPIO.setmode(GPIO.BCM)

GPIO.setup(4, GPIO.OUT, initial=False)

time.sleep(2)
print(start)

p = GPIO.PWM(4, 0.5)
p.start(50)

p.stop()
GPIO.cleanup()
