const { afterEach } = require('vitest')
const { cleanup } = require('@testing-library/react')
require('@testing-library/jest-dom/vitest')

afterEach(() => {
  cleanup()
})