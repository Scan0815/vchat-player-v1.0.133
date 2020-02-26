import { Callbacks } from '../callbacks';
import { IPlayer } from '../iplayer';
import { PlayerFactory } from '../player-factory';
export interface JpegPlayerConfig {
    /** called when the player has successfully been initialized; it retrieves a parameter hasAudio which indicates whether or not the player started with audio */
    initCallback?: (hasAudio: boolean) => void;
    /** when set to true the additional audio stream will not be loaded; it is advisable to deactivate audio at the moment due to some quality issues */
    noAudio?: boolean;
}
/**
 * A player for a JPEG stream (using the PicStream class from vchat-core). In addition an mp3 or OGG/Vorbis stream can be played to add sound to the images.
 */
export declare class JpegPlayerFactory implements PlayerFactory {
    readonly format = "jpeg";
    private config;
    constructor(config?: JpegPlayerConfig);
    isSupported(): boolean;
    create(callbacks: Callbacks): Promise<IPlayer>;
}
