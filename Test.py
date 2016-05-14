import time
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)

GPIO.setup(4, GPIO.OUT, initial=True)
GPIO.setup(17, GPIO.OUT, initial=False)

print(GPIO.input(4))
print(GPIO.input(17))

time.sleep(4)

GPIO.output(4, True)
GPIO.output(17, False)

print(GPIO.input(4))
print(GPIO.input(17))

time.sleep(4)

GPIO.cleanup()
GPIO.setmode(GPIO.BCM)

GPIO.setup(4, GPIO.OUT, initial=True)

p = GPIO.PWM(4, 0.5)
p.start(50)

p.stop()
GPIO.cleanup()
