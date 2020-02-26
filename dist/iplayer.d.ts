import { SourceSet, TargetSet } from 'vchat-core';
import { CameraConfig } from './camera-config';
export interface IPlayer {
    el: HTMLElement[];
    readonly name: string;
    canPublish?: boolean;
    play(sourceSet: SourceSet, format?: string): void;
    stop(): void;
    destroy(): HTMLVideoElement;
    setVolume(volume: number): void;
    hasCamera?(): Promise<boolean>;
    startCamera?(params: CameraConfig): void;
    stopCamera?(): void;
    publish?(targetSet: TargetSet): boolean;
    unpublish?(): void;
}
