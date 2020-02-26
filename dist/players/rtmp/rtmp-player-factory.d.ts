import { Callbacks } from '../../callbacks';
import { IPlayer } from '../../iplayer';
import { PlayerFactory } from '../../player-factory';
import { RtmpPlayerConfig } from './rtmp-player-config';
export declare class RtmpPlayerFactory implements PlayerFactory {
    readonly format = "rtmp";
    private config;
    constructor(config?: RtmpPlayerConfig);
    isSupported(): boolean;
    create(callbacks: Callbacks): Promise<IPlayer>;
}
