import { Callbacks } from './callbacks';
import { IPlayer } from './iplayer';
export interface PlayerFactory {
    readonly format: string | string[];
    isSupported(): boolean;
    create(callbacks: Callbacks, video?: HTMLVideoElement): Promise<IPlayer>;
}
