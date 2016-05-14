import RPi.GPIO as GPIO

def gpioMode():
    GPIO.setmode(GPIO.BCM)

# Relayboard 1
def confRelay1():
    GPIO.setup(4, GPIO.OUT, initial=False)
    GPIO.setup(17, GPIO.OUT, initial=False)
    GPIO.setup(18, GPIO.OUT, initial=False)
    GPIO.setup(27, GPIO.OUT, initial=False)
    GPIO.setup(22, GPIO.OUT, initial=False)
    GPIO.setup(23, GPIO.OUT, initial=False)
    GPIO.setup(24, GPIO.OUT, initial=False)
    GPIO.setup(25, GPIO.OUT, initial=False)

# Relayboard 2
def confRelay2():
    GPIO.setup(5, GPIO.OUT, initial=False)
    GPIO.setup(6, GPIO.OUT, initial=False)
    GPIO.setup(12, GPIO.OUT, initial=False)
    GPIO.setup(13, GPIO.OUT, initial=False)
    GPIO.setup(19, GPIO.OUT, initial=False)
    GPIO.setup(16, GPIO.OUT, initial=False)
    GPIO.setup(26, GPIO.OUT, initial=False)
    GPIO.setup(20, GPIO.OUT, initial=False)

def setConfig():
    gpioMode()
    confRelay1()
    confRelay2()
