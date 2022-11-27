const crypto = require('crypto')

export async function getRandomNumber() {
    return Math.floor(Math.random() * 10000 + 1)
}

export async function getRandomString() {                                            // generating the string with really random characters
    return crypto.randomBytes(20).toString('hex')
}
