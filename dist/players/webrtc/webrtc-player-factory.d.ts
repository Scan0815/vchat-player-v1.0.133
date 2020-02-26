import { Callbacks } from '../../callbacks';
import { IPlayer } from '../../iplayer';
import { PlayerFactory } from '../../player-factory';
export declare class WebRTCPlayerFactory implements PlayerFactory {
    readonly format = "webrtc";
    isSupported(): boolean;
    create(callbacks: Callbacks, video: HTMLVideoElement): Promise<IPlayer>;
}
