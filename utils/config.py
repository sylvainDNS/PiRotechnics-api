import RPi.GPIO as GPIO
import time

def gpioMode():
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)

def initGpio(port, step):
    if step == 1:
        try:
            state(20)
        except:
            GPIO.setup(20, GPIO.OUT, initial=True)

    GPIO.setup(port, GPIO.OUT)

def cleanup():
    GPIO.cleanup()

def fire(canal):
    if(canal.isStepTwo()):
        __setOn(20)

    __setOn(canal.getPort())
    print("/!\ Fire on channel : " + str(canal.getId()))
    time.sleep(0.25)
    __setOff(canal.getPort())

    if(canal.isStepTwo()):
        __setOff(20)

def state(port):
    return GPIO.input(port)

def __setOn(port):
    GPIO.output(port, False)

def __setOff(port):
    GPIO.output(port, True)
