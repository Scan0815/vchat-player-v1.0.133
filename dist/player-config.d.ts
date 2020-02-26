import { PlayerFactory } from './player-factory';
import { PlayerHandler } from './player-handler';
export interface PlayerConfig {
    /** the actual HTML DOM element to render the player into */
    container: HTMLElement;
    /** a list of player factories the player can use to find the best fitting streaming technology */
    factories: PlayerFactory[];
    /** an instance of the PlayerHandler (see [PlayerHandler]) */
    handler: PlayerHandler;
    /** a HTML5 video element of a previous session to avoid initialization issues (like muted autoplay) */
    video?: HTMLVideoElement;
    /** not yet in use, ID for tracking purposes */
    trackingId?: string;
    /** when set to true any preexisting player will be reused instead of trying to find the best solution again (e.g. on change of streams, pause of chat, ...) */
    preferExistingPlayer?: boolean;
}
