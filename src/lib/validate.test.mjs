import assert from 'node:assert/strict'
import { isEmail, isPhone, validate } from './validate.js'

assert.ok(isEmail('studio@example.com'))
assert.ok(!isEmail('studio@example'))
assert.ok(!isEmail('studio example.com'))
assert.ok(isPhone('+91 98200 12345'))
assert.ok(isPhone('(022) 2345-6789'))
assert.ok(!isPhone('12345'))
assert.ok(!isPhone('call me'))
assert.ok(!isPhone('+91 98200 12345 99999'))

const fields = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'email', label: 'Email', required: true, type: 'email' },
  { name: 'phone', label: 'Phone', required: false, type: 'tel' },
]
assert.deepEqual(Object.keys(validate(fields, {})), ['name', 'email'])
assert.deepEqual(Object.keys(validate(fields, { name: 'A', email: 'a@b.co', phone: 'x' })), ['phone'])
assert.deepEqual(validate(fields, { name: 'A', email: 'a@b.co' }), {})
console.log('validate: all checks passed')
