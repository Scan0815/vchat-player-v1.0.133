import { Callbacks } from '../../callbacks';
import { IPlayer } from '../../iplayer';
import { PlayerFactory } from '../../player-factory';
import { HlsJsPlayerConfig } from './hlsjs-player-config';
/**
 * A player for HLS streams using the hls.js JavaScript library.
 * supported format: hls
 * name:              HLSJS
 */
export declare class HlsJsPlayerFactory implements PlayerFactory {
    readonly format = "hls";
    private config;
    constructor(config?: HlsJsPlayerConfig);
    isSupported(): boolean;
    create(callbacks: Callbacks, video?: HTMLVideoElement): Promise<IPlayer>;
}
