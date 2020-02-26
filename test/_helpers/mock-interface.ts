import { Mocker } from 'ts-mockito/lib/Mock'; // Must be below import 'ts-mockito'

export function mockInterface<T>(
    clazz?: (new (...args: any[]) => T) | (Function & { prototype: T })
): T {
    const mocker = new Mocker(clazz);
    mocker['excludedPropertyNames'] = ['hasOwnProperty', 'then'];
    return mocker.getMock();
}
