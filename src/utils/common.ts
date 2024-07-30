import lodashIsEmpty from 'lodash/isEmpty'

export const isEmpty = (value: unknown) => {
  if (typeof value === 'number') {
    try {
      const intValue = parseFloat(String(value))

      if (intValue === 0 || intValue === 0.0) return false
    } catch {
      /* empty */
    }

    return !value
  }

  return lodashIsEmpty(value)
}
