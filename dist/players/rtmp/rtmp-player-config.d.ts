export interface RtmpPlayerConfig {
    /** path to player.swf file which can be found in vchat-player/rtmp-player/build/debug */
    swfPath?: string;
    /** timeout in milliseconds until the vchat-player cancels the setup of the flash player (fallback for when the browser does not correctly support flash / flash is not activated and we try our best to offer the flash player to the customer) */
    timeout?: number;
    /** when set to false the cam 2 cam feature will not use the flash component (due to browser issues which do not correctly provide the flash element / do not activate the camera) but will fall back to the PicupStream (vchat-core) */
    useUpstream?: boolean;
    /** called when the factory is first called */
    onPreInit?: () => void;
    /** called when the flash player successfully initialized */
    onInit?: () => void;
}
