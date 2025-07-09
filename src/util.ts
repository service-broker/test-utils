
export function lazy<T>(func: () => T): () => T {
  let out: { val: T } | undefined
  return () => (out ?? (out = { val: func() })).val
}

export function assertRecord(value: object): asserts value is Record<string, unknown> {
}
