/* eslint-disable @typescript-eslint/no-empty-function */
import { Callbacks } from '../../../src/callbacks';
import { HlsJsPlayerFactory } from '../../../src/players/hlsjs/hlsjs-player';

const callbacks: Callbacks = {
    onVolumeChange: () => {},
    onError: () => {},
    onSendMetrics: () => {},
    onPlayStart: () => {},
    onPlayStop: () => {},
    onPlayInfo: () => {},
    onPlayError: () => {},
    onCameraOn: () => {},
    onCameraOff: () => {},
    onCameraDenied: () => {},
    onPublishStart: () => {},
    onPublishStop: () => {}
};

describe('HlsJsPlayerFactory', () => {
    it('isSupported returns false as tests run in headless chrome', () => {
        const objectUnderTest = new HlsJsPlayerFactory();

        expect(objectUnderTest.isSupported()).toBe(false);
    });

    it('create', async () => {
        // const objectUnderTest = new HlsJsPlayerFactory();
        // const videoElement = document.createElement('video');
        // const player = await objectUnderTest.create(callbacks, videoElement);
        // expect(player).toBeDefined();
        // expect(player.el).toContain(videoElement);
    });
});
