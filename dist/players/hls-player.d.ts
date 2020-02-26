import { Callbacks } from '../callbacks';
import { IPlayer } from '../iplayer';
import { PlayPromiseInfo } from '../play-promise-info';
import { PlayerFactory } from '../player-factory';
import { QualityBoundaries } from '../quality-boundaries';
export interface HlsPlayerConfig {
    /** called when either a play() call was successful or the play() call failed;
     * this function receives a playInfo object (see [PlayPromiseInfo])
     * */
    playLogger?: (playInfo: PlayPromiseInfo) => void;
    /** a path to a poster to be set on the video element */
    poster?: string;
    /** an object with attributes low, medium, good indicating which quality level is reached at what resolution (the value to each key is the minimal video width) */
    qualityBoundaries?: QualityBoundaries;
    /** in milliseconds, time until a new play() call will be triggered when the stream does not recover in time */
    recoverTimeout?: number;
    /** this function retrieves a certain reloadFunction which provides an additional play button on Apple devices in the rare case that the stream is active but the video image is stuck */
    reloadCallback?: (reloadFunc: (e: any) => void) => void;
    /** when set to true a separate canvas is used instead of the video elements own poster attribute in order to provide a valid image whenever the video element is stuck */
    useCanvasPoster?: boolean;
    /** called when the video elements throws a pause event or when the automatic playback failed; receives a function as first parameter; this function can then be used to trigger a new play() event on the video element */
    userInteractionCallback?: (userInteractionFunc: (e: any) => void) => void;
    /** timeout in milliseconds (starting when the video element throws a waiting event) until the player is torn down and the vchat-player tries the next one */
    waitingTimeout?: number;
}
/**
A player for HLS streams using the native HLS implementation of the browser (currently available on Apple devices and in Chrome on Android).

* supported format:  hls
* name:              HLS_NATIVE
 */
export declare class HlsPlayerFactory implements PlayerFactory {
    readonly format = "hls";
    private config;
    constructor(config?: HlsPlayerConfig);
    isSupported(): boolean;
    create(callbacks: Callbacks, video: HTMLVideoElement): Promise<IPlayer>;
}
