import { Callbacks } from '../../callbacks';
import { CameraConfig } from '../../camera-config';
import { IPlayer } from '../../iplayer';
import { SourceSet, TargetSet } from 'vchat-core';
export declare const flashInfo: () => any;
export declare let swfFails: number;
export declare const dummy: () => void;
/**
 * A player for flash streams.
 * supported format:  rtmp
 * name:              RTMP
 */
export declare class RtmpPlayer implements IPlayer {
    readonly name = "RTMP";
    canPublish: boolean;
    el: HTMLElement[];
    private id;
    private state;
    private cameraState;
    private publishState;
    private queue;
    private sources;
    private currentSource;
    private cb;
    private swf;
    private initTimeout;
    private videoHeight;
    private videoWidth;
    constructor(callbacks: Callbacks, swfPath: string, timeout: number, onInit: () => void, canPublish: boolean);
    play(sourceSet: SourceSet): void;
    stop(): void;
    hasCamera(): Promise<boolean | undefined>;
    startCamera(params: CameraConfig): Promise<any>;
    stopCamera(): void;
    publish(targetSet: TargetSet): boolean;
    unpublish(): void;
    destroy(): HTMLVideoElement;
    setVolume(volume: number): void;
    private eorq;
    private playNext;
    private sendPlayInfo;
}
