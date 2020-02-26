import { Callbacks } from '../callbacks';
import { IPlayer } from '../iplayer';
import { PlayerFactory } from '../player-factory';
export interface TestPlayerConfig {
    name: string;
    format: string | string[];
    supported: boolean;
    raiseErrorAfter?: number;
}
export declare class DummyPlayerFactory implements PlayerFactory {
    readonly format: string | string[];
    private logName;
    private config;
    constructor(config: TestPlayerConfig);
    isSupported(): boolean;
    create(callbacks: Callbacks, video: HTMLVideoElement): Promise<IPlayer>;
    private log;
}
