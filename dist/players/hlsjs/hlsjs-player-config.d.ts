import { PlayPromiseInfo } from '../../play-promise-info';
import { QualityBoundaries } from '../../quality-boundaries';
export interface HlsJsPlayerConfig {
    /** called when either a play() call was successful or the play() call failed;
     * this function receives a playInfo object (see [PlayPromiseInfo])
     * */
    playLogger?: (playInfo: PlayPromiseInfo) => void;
    /** a path to a poster to be set on the video element */
    poster?: string;
    /** an object with attributes low, medium, good indicating which quality level is reached at what resolution (the value to each key is the minimal video width) */
    qualityBoundaries?: QualityBoundaries;
    /** when set to true a separate canvas is used instead of the video elements own poster attribute in order to provide a valid image whenever the video element is stuck */
    useCanvasPoster?: boolean;
    /** called when the video elements throws a pause event or when the automatic playback failed; receives a function as first parameter; this function can then be used to trigger a new play() event on the video element */
    userInteractionCallback?: (userInteractionFunc: (e: any) => void) => void;
    /** timeout in milliseconds (starting when the video element throws a waiting event) until the player is torn down and the vchat-player tries the next one */
    waitingTimeout?: number;
}
