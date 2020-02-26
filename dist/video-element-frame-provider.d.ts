import { Provider } from 'vchat-core';
import { JpegUploadSettings } from './jpeg-upload-settings';
export declare class VideoElementFrameProvider implements Provider {
    private _errorCallback?;
    private _canvas;
    private _videoElement;
    private _jpegUploadSettings;
    constructor(videoElement: HTMLVideoElement, jpegUploadSettings: JpegUploadSettings, errorCallback?: (error: Error) => void);
    getSnapshot(): Promise<Blob>;
    onError?(error: Error): void;
}
