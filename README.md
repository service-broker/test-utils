# test-utils
Unit testing utilities

## Defining Tests

```typescript
import { describe, expect } from '@service-broker/test-utils'

describe('test-suite', ({ beforeAll, afterAll, beforeEach, afterEach, test }) => {
  beforeEach(() => {
    //setup
  })
  afterEach(() => {
    //cleanup
  })
  test('test-1', () => {
    expect(actual, expectedValue)
    expect(await promise, expectedValue)
  })
})
```

When `expectedValue` is a:
- Primitive: `actual` must be primitive and strictly equal
- Set: `actual` must be a Set containing strictly the same elements
- Map: `actual` must be a Map with the same keys mapped to _expect_-ed values
- Array: `actual` must be an array with pair-wise _expect_-ed elements
- Buffer: `actual` must be a Buffer with the exact same bytes
- Object: `actual` must be an object with _expect_-ed property values

`expectedValue` can also be an `Expectation` object that defines custom assertions. For example:

```typescript
import { Expectation } from '@service-broker/test-utils'

expect(actual, new Expectation('lessThan', 10, actual => {
  if (typeof actual != 'number') throw 'isNotNumber'
  if (actual >= 10) throw 'isNotLessThan10'
})
```

Since objects, arrays, and Maps are compared recursively using _expect_, `Expectation` is handy for nested expectations.

```typescript
expect(request, {
  id: new Expectation('ofType', 'number', actual => {
    if (typeof actual != 'number') throw 'isNotNumber'
  }),
  ip: new Expectation('oneOf', ['::1', '127.0.0.1'], actual => {
    if (!['::1', '127.0.0.1'].includes(actual)) throw 'notLocalIp'
  })
})
```

It's useful to define common expectation 'helpers'. The following helpers are included with the library:

```typescript
import { objectHaving, valueOfType, oneOf } from '@service-broker/test-utils'

expect(request, {
  id: valueOfType('number'),
  ip: oneOf(['::1', '127.0.0.1']),
  headers: objectHaving({
    'content-type': 'application/json',
    'content-length': new Expectation('lessThan', '1MB', actual => {
      assert(actual < 1024*1024, 'requestTooLarge')
    })
  })
})
```

Using _expect_ inside _describe-test_ results in nicely color-coded console outputs.

```
EXPECT {
  header: {
    from: Expectation { ofType: 'string' },
    ip: Expectation { oneOf: [ '::1', '127.0.0.1' ] },
    id: Expectation { ofType: 'string' },
    service: { name: 'sf1' },
    contentType: 'image/png',
    a: 2
  },
  payload: <Buffer 69 6d 61 67 65>
}
ACTUAL {
  header: {
    a: 2,
    service: { name: 's1' },
    ip: '127.0.0.1',
    contentType: 'image/png',
    from: 'xsjmxxcsjtq',
    id: 'xsjmxxcsjtq'
  },
  payload: <Buffer 69 6d 61 67 65>
}
Error: .header.service.name !equalExpected
    at Object.run (/Projects/service-broker/src/index.test.ts:94:5)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async Timeout.run (/Projects/service-broker/src/test-utils.ts:66:11)
```

## Running Tests

Once you define your tests inside a file, run it like a regular Node script.

```
node --enable-source-maps ./dist/index.test.js [suite name] [test name]
```
