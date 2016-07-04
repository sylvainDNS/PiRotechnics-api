# -*- coding: utf-8 -*-

"""
    Classe Canal
    ===================

    Cette classe défini un canal caractérisé par :
    - son id
    - son port

"""

import time
from utils.config import initGpio, state, fire

class Canal:

    id = 0

    def __init__(self, port, step, duree):
        Canal.id += 1
        self.id = Canal.id
        self.port = port
        self.step = step
        self.duree = duree * 100
        initGpio(port, step)

    def etat(self):
        return state(self.port)

    def feu(self):
        fire(self)
        sleep(self.temps)

    def getPort(self):
        return self.port

    def getStep(self):
        return self.step

    def getId(self):
        return self.id

    def isStepTwo(self):
        if self.step == 2:
            return True
        else:
            return False
