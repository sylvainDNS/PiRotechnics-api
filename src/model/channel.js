import { gpio } from '../mock/gpio';
import { config } from '../utils/config'

let channels = []

const Gpio = gpio(config.node.env)

export const initChannels = () => {
    if (channels.length == 0) {
        const init = (min, max, switched) => {
            const tmpChannels =
                Array.from({ length: (max - min) })
                    .map((_, index) => {
                        return {
                            gpio: new Gpio(index + min, 'out'),
                            switch: switched
                        }
                    })

            channels = channels.concat(tmpChannels)
        }


        init(2, 13, null)
        init(16, 18, null)
        init(2, 13, new Gpio(19, 'out'))
        init(16, 18, new Gpio(19, 'out'))
    }
}

export const launch = (number, time) => {
    const channel = channels[number]

    const set = (state) => {
        channel.gpio.write(state)
        if (channel.switch == null)
            channel.switch.write(state)
    }

    set(0)
    console.log('Channel %s launched !', number)
    setTimeout(500)
    set(1)
}

export const isActivated = (number) => {
    const channel = channels[number]
    const isGpio = channel.gpio.read() == 1 ? true : false
    const isSwitch = channel.switch == null ? true : (channel.switch.read() == 1 ? true : false)

    return isGpio && isSwitch
}