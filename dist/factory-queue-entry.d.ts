import { PlayerFactory } from './player-factory';
export interface FactoryQueueEntry {
    format: string;
    factory: PlayerFactory;
}
