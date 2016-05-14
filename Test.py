import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)

configuration = GPIO.getmode()

print(configuration)

GPIO.setup(4, GPIO.OUT, initial=True)
GPIO.setup(17, GPIO.OUT, initial=False)

print(GPIO.input(4))
print(GPIO.input(17))

GPIO.output(4, True)
GPIO.output(17, False)

print(GPIO.input(4))
print(GPIO.input(17))

GPIO.cleanup()
