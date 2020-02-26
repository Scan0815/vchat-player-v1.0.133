import { when } from 'ts-mockito';
import { IPlayer } from '../../src/iplayer';
import { mockInterface } from './mock-interface';

export function mockPlayer(playerName: string): IPlayer {
    const mockedPlayer = mockInterface<IPlayer>();
    when(mockedPlayer.name).thenReturn(playerName);
    when(mockedPlayer.el).thenReturn([]);

    return mockedPlayer;
}
