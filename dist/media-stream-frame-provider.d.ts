import { Provider } from 'vchat-core';
import { JpegUploadSettings } from './jpeg-upload-settings';
export declare class MediaStreamFrameProvider implements Provider {
    private _imageCapture;
    private _errorCallback?;
    private _canvas;
    private _jpegUploadSettings;
    constructor(mediaStream: MediaStream, jpegUploadSettings: JpegUploadSettings, errorCallback?: (error: Error) => void);
    getSnapshot(): Promise<Blob>;
    onError?(error: Error): void;
}
