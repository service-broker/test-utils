export function lazy(func) {
    let out;
    return () => (out ?? (out = { val: func() })).val;
}
export function assertRecord(value) {
}
