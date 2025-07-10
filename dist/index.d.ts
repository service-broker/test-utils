export declare function describe(suiteName: string, setup: (opts: {
    beforeAll: (run: Function) => void;
    afterAll: (run: Function) => void;
    beforeEach: (run: Function) => void;
    afterEach: (run: Function) => void;
    test: (name: string, run: Function) => void;
}) => void): void;
export declare function afterEverything(run: Function): void;
export declare class Expectation {
    constructor(operator: string, expected: unknown, assert: (actual: unknown) => void);
}
export declare function expect(actual: unknown, expected: unknown, path?: string[]): void;
export declare function objectHaving(expectedProps: Record<string, unknown>): Expectation;
export declare function valueOfType(expectedType: string): Expectation;
export declare function oneOf(expectedValues: unknown[]): Expectation;
