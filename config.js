/**
 * Config application.
 * Values loaded of .env file
 * @module config
 */

const path = require('path');

module.exports = {
    /**
     * Wiston for log.
     * @member
     */
    winston: {
        info: {
            name: 'info',
            filename: path.join(__dirname, 'log', 'info.log'),
            level: 'info'
        },
        error: {
            name: 'error',
            filename: path.join(__dirname, 'log', 'error.log'),
            level: 'error'
        },
        debug: {
            name: 'debug',
            filename: path.join(__dirname, 'log', 'debug.log'),
            level: 'debug'
        }
    }
}