import time
import RPi.GPIO as GPIO


GPIO.setmode(GPIO.BCM)

GPIO.setup(4, GPIO.OUT, initial=True)

p = GPIO.PWM(4, 0.5)
p.start(50)

p.stop()
GPIO.cleanup()
