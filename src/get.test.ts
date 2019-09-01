import { AsyncTest, Expect, Test, TestCase, TestFixture } from "alsatian";

import { get } from './get';

@TestFixture("Get Tests")
export class GetTests {

    @TestCase({'a': 1}, 'a', 1)
    @TestCase({a: {b: {c: 2}}}, 'a.b.c', 2)
    @TestCase({array: [{key: 'value'}]}, 'array.0.key', 'value')
    @TestCase({'a': 1}, 'b', undefined)
    @TestCase({'a': 1}, 'a.b.c', undefined)
    @Test('Simple tests')
    public simpleTests(obj: any, path: string, expectedValue: any) {
        Expect(get(obj, path)).toEqual(expectedValue);
    }

    @TestCase('abc', 'a.b.c')
    @TestCase(1, 'a.b.c')
    @TestCase(undefined, 'a.b.c')
    @TestCase(null, 'a.b.c')
    @TestCase({}, 'a.b.c')
    @TestCase(NaN, 'a.b.c')
    @TestCase(function() {}, 'a.b.c')
    @TestCase(Infinity, 'a.b.c')
    @Test('should return undefined to all non-object parameters')
    public returnUndefinedInNonObjectParameter(obj: any, path: string) {
        Expect(get(obj, path)).not.toBeDefined();
    }

    @TestCase({a: 3}, 'a.b.c', 'value')
    @Test("Default values")
    public defaultValues(obj: any, path: string, defaultValue: any) {
        Expect(get(obj, path, defaultValue)).toEqual(defaultValue);
    }
}