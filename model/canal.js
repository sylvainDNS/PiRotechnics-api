const Gpio = require('onoff').Gpio

const Canal = (port, step, duree) => ({
    step = step,
    duree = duree,
    gpio = new Gpio(port, 'out')
})