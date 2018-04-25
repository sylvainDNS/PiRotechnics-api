const fs = require('fs')

module.exports = {
    target: 'node',

    externals: (() => {
        const nodeModules = {}
        fs
            .readdirSync('node_modules')
            .filter(function(x) {
                return ['.bin'].indexOf(x) === -1
            })
            .forEach(function(mod) {
                nodeModules[mod] = 'commonjs ' + mod
            })
        return nodeModules
    })()
}
