import { CameraPosition } from './camera-position';
export interface CameraConfig {
    /** defines the corner of the player to show the cam 2 cam overlay */
    position?: CameraPosition;
    /** only used when neither width nor height is set; needed to calculate the proper cam 2 cam size based on the video width */
    widthRatio?: number;
    /** only used when neither width nor height is set; needed to calculate the proper cam 2 cam size based on the video height */
    heightRatio?: number;
    /** set the cam 2 cam video element to given width; height will be calculated based on aspect ratio of camera */
    width?: number;
    /** set the cam 2 cam video element to given height, if no width is given; width will be calculated based on aspect ratio of camera */
    height?: number;
}
