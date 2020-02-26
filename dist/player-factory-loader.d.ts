import { Callbacks } from './callbacks';
import { IPlayer } from './iplayer';
import { PlayerFactory } from './player-factory';
export declare class PlayerFactoryLoader implements PlayerFactory {
    format: string;
    private loader;
    private factory;
    constructor(format: string, loader: () => Promise<PlayerFactory>);
    isSupported(): boolean;
    create(callbacks: Callbacks, video: HTMLVideoElement): Promise<IPlayer>;
}
