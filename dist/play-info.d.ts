import { QualityLevel } from './quality-level';
export interface PlayInfo {
    /** width:   the current video width (for HLS: video.videoWidth) */
    width: number;
    /** height:  the current video height (for HLS: video.videoHeight) */
    height: number;
    /** quality: the selected quality currently used (automatically selected by the Browser according to bandwidth, for Flash the quality always is set to "good", for the jpeg stream the quality always is set to "medium") */
    quality: QualityLevel;
    /** paused:  the current paused state of the video element (HLS only) */
    paused: boolean;
    /** volume:  the current volume setting (0 or 1) */
    volume: number;
    /** name:    the name of the current player */
    name: string;
    /** source:  the source currently played */
    source: string;
}
