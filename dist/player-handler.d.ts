import { PlayInfo } from './play-info';
/**
 * The PlayerHandler is a collection of callback functions called by certain events within the vchat-player. Feel free to implement the handler within the product to be able to act upon events of the vchat-player.
 */
export interface PlayerHandler {
    /**
     * Called when the volume within the vchat-player changes.
     *
     * @param volume - is a value between 0.0 and 1.0
     */
    onVolumeChange?(value: number): void;
    /**
     * Triggered when the vchat-player starts switching to another player internally.
     */
    onPlayerSwitch?(format: string): void;
    /**
     * Triggered when the vchat-player finishes switching to another player internally.
     *
     * @param format - represents the selected format
     */
    onPlayerSwitchComplete?(format: any): void;
    /** Called when the vchat-player gives up, i.e. does not find any further player internally that could possibly work on the guest's browser with the sources provided. */
    onError?(error: string | object): void;
    /**
     * This is called whenever a player throws some event (like play, pause, ...).
     *
     * info contains
     * - playerEvent:  the current event (like play, pause, waiting, ....)
     * - playerType:   the name of the current player
     * - playerFormat: the format the current player is playing (e.g. the RTMP Player can handle RTMP and HDS streams hence it needs to specify which format is currently played)
     * - networkInfo:  if available; contains information provided by the navigator connection API (may contain downlink, downlinkMax, effectiveType, rtt, type)
     * - additional information that is passed as an optional parameter when calling the function
     */
    onSendMetrics?(info: any): void;
    onPlayStart?(stream: string): void;
    onPlayStop?(): void;
    /**
     * This is called when the current quality of a player changes or the player starts to play.
     * See [PlayInfo] for more details.
     */
    onPlayInfo?(info: PlayInfo): void;
    onPlayError?(level: number, error?: any): void;
    onCameraOn?(): void;
    onCameraOff?(): void;
    onCameraDenied?(): void;
    onPublishStart?(): void;
    onPublishStop?(): void;
}
