import { VideoInfo } from './video-info';
export interface PlayPromiseInfo {
    /** in case of an error during the play() call this holds the name of the error (like AbortError) */
    error?: string;
    /** in case of an error during the play() call this holds an additional error message, providing additional information about the error */
    errorMsg?: string;
    /** the current play mode of the hls player (see below for a description of the possible play modes) */
    playMode: string;
    /** whether the play() call was successful or not */
    success: boolean;
    /** see [VideoInfo] for details */
    videoElement: VideoInfo;
    /** a float value between 0 and 1 indicating the current player volume */
    volume: number;
}
