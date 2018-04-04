const Gpio = require('onoff').Gpio


const canals = []

for (let i = 2; i < 14; i++) {
    canals.push(new Gpio(i, 'high'))
}
for (let i = 16; i < 20; i++) {
    canals.push(new Gpio(i, 'high'))
}
