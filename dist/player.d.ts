import { SourceSet, TargetSet } from 'vchat-core';
import { CameraConfig } from './camera-config';
import { PlayerConfig } from './player-config';
export declare const PlayerEvent: {
    Error: string;
    Init: string;
    Load: string;
    Pause: string;
    Play: string;
    Playing: string;
    QualityChange: string;
    Reload: string;
    Waiting: string;
};
export declare const PlayModes: {
    /** promise play via button; the browser supports the newer promise return value of the play() function; the promise did not execute properly - neither unmuted nor muted; hence the play() call was triggered via user interaction */
    PROMISE_PLAY_BUTTON: string;
    /** muted promise play; the browser supports the newer promise return value of the play() function; the promise could be executed successfully but only with the video element being muted (autplay started muted) */
    PROMISE_PLAY_MUTED: string;
    /** unmuted promise play; the browser supports the newer promise return value of the play() function; the promise could be executed successfully without muting the element (autoplay started with sound) */
    PROMISE_PLAY_UNMUTED: string;
    /** user interaction; the browser only supports the older standard; the video element does not start automatically - neither unmuted nor muted; the play() call was triggered via user interaction */
    AUTO_PLAY_BUTTON: string;
    /** muted autoplay; the browser only supports the older standard; the video could only be started muted */
    AUTO_PLAY_MUTED: string;
    /** unmuted autoplay; the browser only supports the older standard; the video could be started automatically with sound */
    AUTO_PLAY_UNMUTED: string;
};
export declare class Player {
    static readonly VERSION = "__VERSION__";
    private _container;
    private _playerContainer;
    private _camContainer;
    private _camVideo;
    private _camStream;
    private _camConfig;
    private _camPublisher;
    private _playing;
    private _publishing;
    private _sourceSet;
    private _targetSet;
    private _volume;
    private _queue;
    private _defOrder;
    private _player;
    private _format;
    private _handler;
    private _factory;
    private _callbacks;
    private _factoryMap;
    private _failedFact;
    private _factoryQueue;
    private _video;
    private _allowRearrange;
    constructor(config: PlayerConfig);
    initPlayer(format: string | string[]): Promise<void>;
    readonly format: string;
    /**
     * This function takes the source set and creates the best fitting player and starts playing the selected source.
     *
     * @param sourceSet - The sourceset describing all available streams. Usually retrieved using chat.startStream()
     */
    play(sourceSet: SourceSet): Promise<void>;
    /**
     * Stops (pauses) the player, e.g. to be used when the vhcat-core calls an onChatPause() or when a Live Preview ends. The player will only stop pulling the streams but won't be destroyed - hence the latest frame will still be shown.
     */
    stop(): void;
    /**  */
    readonly playing: boolean;
    /** Status of cam2cam */
    readonly publishing: boolean;
    /**
     * This function takes the targetSet and starts the actual upstream.
     *
     * @param targetSet - information where the stream can be published to, usually retrieved by calling chat.startUpstream()
     *
     * @returns true on success, else false
     */
    publish(targetSet: TargetSet): boolean;
    /**
     * Stops sending the frames taken from the browser's camera.
     */
    unpublish(): void;
    /**
     * Determines whether the browser has access to a camera.
     */
    hasCamera(): Promise<true | false | undefined>;
    /**
     * This function starts the browser's camera and shows the cam 2 cam overlay. Based on this function call you can retrieve the targetSet via chat.startUpstream(). Once you received the targetSet you can start publishing via player.publish(targetSet).
     * @param config - configuration params for the camera, see [CameraConfig] for more info.
     */
    startCamera(config?: CameraConfig): Promise<void>;
    /**
     * Stops the use of the browser's camera.
     */
    stopCamera(): void;
    /** sets the volume of the player */
    /** gets the volume of the player
    *
    * @returns The volume in the range [0.0, 1.0]
    */
    volume: number;
    /** Forces the player to switch to the next best player. */
    playNext(): Promise<void>;
    /** Destroys the player.
     * @returns HTML5 video element if set (HLS.js Player / HLS native Player only) for future use (on next player instantiation).
     */
    destroy(): HTMLVideoElement;
    handleEvent(event: Event): void;
    private _createFactoryQueue;
    private _createPlayer;
    private _getUserMedia;
    private _installPlayer;
    private _createCallbacks;
    private _destroyPlayer;
    private _createCamVideo;
    private _updateCameraPosition;
    private static computeCam2CamVideoSize;
    private _updateCameraSize;
    private _createCamPublisher;
}
