/**
 * Config application.
 * Values loaded of .env file
 * @module config
 */

const path = require('path');

const current = new Date();

const PROVIDER_WEB = 1;
const PROVIDER_FACEBOOK = 2;
const PROVIDER_GOOGLE = 3;
const PROVIDER_TWITTER = 4;

const PROVIDERS = [];
PROVIDERS[PROVIDER_WEB] = 'WW';
PROVIDERS[PROVIDER_FACEBOOK] = 'FB';
PROVIDERS[PROVIDER_GOOGLE] = 'GG';
PROVIDERS[PROVIDER_TWITTER] = 'TW';

const DB = {
    SIZE_TEXT_SMALL: 10,
    SIZE_TEXT_MEDIUM: 40,
    SIZE_TEXT_LARGE: 120,
    SIZE_TEXT_BIG: 500,
    SIZE_CHAR_TWO: 2,
    USER_TYPE_ADMIN: 0,
    USER_TYPE_USER: 1,
    USER_TYPE_OPERATOR: 2,
    STATUS_ACTIVE: 1,
    STATUS_INACTIVE: 2,
    GENDER_NONE: 0
};

const TOKEN = {
    PASSWORD_RESET: 1,
    ACTIVATION: 2
};

const ENV = {
    DEVELOPMENT: 'development',
    TEST: 'test',
    PRODUCTION: 'production'
};

module.exports = {
    CURRENT_YEAR: current.getFullYear(),
    USERNAME_SEPARATOR: '.',
    PROVIDER_WEB: PROVIDER_WEB,
    PROVIDER_FACEBOOK: PROVIDER_FACEBOOK,
    PROVIDER_GOOGLE: PROVIDER_GOOGLE,
    PROVIDER_TWITTER: PROVIDER_TWITTER,
    PROVIDERS: PROVIDERS,
    TOKEN_EXPIRES_TIME: 3600000,
    TOKEN_SIZE: 48,
    ERR_INTERNAL_SERVER: 500,
    ERR_NOT_FOUND: 404,
    LIMIT_ID_FACEBOOK: -5,
    LIMIT_MSG_ERROR: 3,
    DB: DB,
    TOKEN: TOKEN,
    ENV: ENV
};

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