export class Gpio {
    constructor(gpio, direction, edge, options) {
        this._gpio = gpio;
        this._direction = direction
        this._options = options
        this._edge = edge

        // to make unit test
        this._writer = 0

    }
    watch(fn) {
        fn()
    }
    write(value, fn) {
        this._writer = 1
        fn()
    }
    read(fn) {
        fn("", this._writer)
    }

}