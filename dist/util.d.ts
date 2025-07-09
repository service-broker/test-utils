export declare function lazy<T>(func: () => T): () => T;
export declare function assertRecord(value: object): asserts value is Record<string, unknown>;
