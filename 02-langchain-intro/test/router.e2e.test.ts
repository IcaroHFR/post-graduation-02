import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'

test('command UPPER transforms message into uppercase', async () => {
    const app = createServer()
    const msg = 'Make this upper case!'
    const expected = msg.toUpperCase()

    const response = await app.inject({
        method: 'POST',
        url: 'chat',
        body: { question: msg},
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)

})

test('command LOWER transforms message into lowercase', async () => {
    const app = createServer()
    const msg = 'Make this LOWER case'
    const expected = msg.toLowerCase()

    const response = await app.inject({
        method: 'POST',
        url: 'chat',
        body: { question: msg},
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)

})