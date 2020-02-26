import { mock, when, anything } from 'ts-mockito';
import { IPlayer } from '../../src/iplayer';
import { PlayerFactory } from '../../src/player-factory';

export function mockPlayerFactory(
    format: string,
    isSupported: boolean,
    returnOnCreate: IPlayer | Error
): PlayerFactory {
    const mockedFactory = mock<PlayerFactory>();

    when(mockedFactory.format).thenReturn([format]);
    when(mockedFactory.isSupported()).thenReturn(isSupported);

    if (returnOnCreate instanceof Error) {
        when(mockedFactory.create(anything(), anything())).thenReject(
            returnOnCreate
        );
    } else {
        when(mockedFactory.create(anything(), anything())).thenResolve(
            returnOnCreate
        );
    }

    return mockedFactory;
}
