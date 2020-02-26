import {
    TargetSet,
    PicUpStream,
    SourceSet,
    Source,
    JpegTarget
} from 'vchat-core';
import { Player } from '../src/player';
import { PlayerConfig } from '../src/player-config';
import { PlayerHandler } from '../src/player-handler';
import { PlayerFactory } from '../src/player-factory';
import {
    mock,
    instance,
    when,
    anything,
    verify,
    spy,
    resetCalls
} from 'ts-mockito';
import { IPlayer } from '../src/iplayer';
import { mockPlayer } from './_helpers/player.mocks';
import { mockPlayerFactory } from './_helpers/player-factory.mocks';
import { mockInterface } from './_helpers/mock-interface'; // must be after ts-mockito
import { Callbacks } from '../src/callbacks';

describe('Player', () => {
    let objectUnderTest: Player;
    let handlerSpy: PlayerHandler;

    let mockedPlayer: IPlayer;
    let mockedPlayerFactory: PlayerFactory;

    let mediaDevicesMock: MediaDevices;

    beforeEach(() => {
        handlerSpy = mockInterface<PlayerHandler>();
        const handlerSpyInstance = instance(handlerSpy);

        mediaDevicesMock = mockInterface<MediaDevices>();
        (navigator as any).mediaDevices = instance(mediaDevicesMock);

        mockedPlayer = mockPlayer('PLAYER_ONE');
        const playerOne = instance(mockedPlayer);
        mockedPlayerFactory = mockPlayerFactory('hls', true, playerOne);
        const playerOneFactory = instance(mockedPlayerFactory);

        const playerConfig: PlayerConfig = {
            container: document.createElement('div'),
            factories: [playerOneFactory],
            handler: handlerSpyInstance
        };

        objectUnderTest = new Player(playerConfig);
    });

    describe('play', () => {
        it('does not call create from an unsupported factory', async () => {
            const mockHandlerSpy = mock<PlayerHandler>();
            const unsupportedPlayer = mockPlayer('UNSUPPORTED');
            const UnsupportedFactory = mockPlayerFactory(
                'hls',
                false,
                instance(unsupportedPlayer)
            );
            const supportedPlayer = mockPlayer('SUPPORTED');
            const SupportedFactory = mockPlayerFactory(
                'hls',
                true,
                instance(supportedPlayer)
            );

            const playerConfig: PlayerConfig = {
                container: document.createElement('div'),
                factories: [
                    instance(UnsupportedFactory),
                    instance(SupportedFactory)
                ],
                handler: instance(mockHandlerSpy)
            };

            objectUnderTest = new Player(playerConfig);

            const sourceSet: SourceSet = {
                hls: [{ stream: 'test_stream_url' }]
            };

            await objectUnderTest.play(sourceSet);

            verify(UnsupportedFactory.create(anything(), anything())).never();

            verify(SupportedFactory.create(anything(), anything())).once();
        });

        it('does not call create from a factory without sourceSet entry', async () => {
            const mockHandlerSpy = mock<PlayerHandler>();

            const noEntryPlayer = mockPlayer('NO_ENTRY_IN_SOURCESET');
            const noEntryPlayerFactory = mockPlayerFactory(
                'hls',
                true,
                instance(noEntryPlayer)
            );
            const entryPlayer = mockPlayer('ENTRY_IN_SOURCESET');
            const entryPlayerFactory = mockPlayerFactory(
                'jpeg',
                true,
                instance(entryPlayer)
            );

            const playerConfig: PlayerConfig = {
                container: document.createElement('div'),
                factories: [
                    instance(noEntryPlayerFactory),
                    instance(entryPlayerFactory)
                ],
                handler: instance(mockHandlerSpy)
            };

            objectUnderTest = new Player(playerConfig);

            const sourceSet: SourceSet = {
                jpeg: [{ stream: 'test_stream_url' }]
            };

            await objectUnderTest.play(sourceSet);

            verify(noEntryPlayerFactory.create(anything(), anything())).never();

            verify(entryPlayerFactory.create(anything(), anything())).once();
        });

        describe('with two factories having the same format', () => {
            it('does call create on the second factory if the first create call fails', async () => {
                const mockHandlerSpy = mockInterface<PlayerHandler>();

                const playerFactoryFailingToCreate = mockPlayerFactory(
                    'hls',
                    true,
                    new Error('CREATE_FAILED')
                );

                const playerTwo = mockPlayer('PLAYER_TWO');
                const playerFactoryToCallAfterFail = mockPlayerFactory(
                    'hls',
                    true,
                    instance(playerTwo)
                );

                const playerConfig: PlayerConfig = {
                    container: document.createElement('div'),
                    factories: [
                        instance(playerFactoryFailingToCreate),
                        instance(playerFactoryToCallAfterFail)
                    ],
                    handler: instance(mockHandlerSpy)
                };

                objectUnderTest = new Player(playerConfig);

                const sourceSet: SourceSet = {
                    hls: [{ stream: 'test_stream_url' }]
                };

                await objectUnderTest.play(sourceSet);

                verify(
                    playerFactoryFailingToCreate.create(anything(), anything())
                ).once();

                verify(
                    playerFactoryToCallAfterFail.create(anything(), anything())
                ).once();
            });

            it('does call create on the second factory if the first player fails to play', async () => {
                const mockHandlerSpy = mock<PlayerHandler>();

                const playerOne = mockPlayer('PLAYER_ONE');
                when(playerOne.play).thenThrow(new Error('FAILED_TO_PLAY'));

                const playerFactoryWithPlayerFailingToPlay = mockPlayerFactory(
                    'hls',
                    true,
                    instance(playerOne)
                );

                const playerTwo = mockPlayer('PLAYER_TWO');
                const playerFactoryToCallAfterFail = mockPlayerFactory(
                    'hls',
                    true,
                    instance(playerTwo)
                );

                const playerConfig: PlayerConfig = {
                    container: document.createElement('div'),
                    factories: [
                        instance(playerFactoryWithPlayerFailingToPlay),
                        instance(playerFactoryToCallAfterFail)
                    ],
                    handler: instance(mockHandlerSpy)
                };

                objectUnderTest = new Player(playerConfig);

                const sourceSet: SourceSet = {
                    hls: [{ stream: 'test_stream_url' }]
                };

                await objectUnderTest.play(sourceSet);

                verify(
                    playerFactoryWithPlayerFailingToPlay.create(
                        anything(),
                        anything()
                    )
                ).once();
                verify(
                    playerFactoryToCallAfterFail.create(anything(), anything())
                ).once();
            });

            it('does call create on the second factory if the first player raises an error', async () => {
                const mockHandlerSpy = mock<PlayerHandler>();

                const playerFactoryWithPlayerRaisingAnErrorOnPlay = mockPlayerFactory(
                    'hls',
                    true,
                    null
                );

                when(
                    playerFactoryWithPlayerRaisingAnErrorOnPlay.create(
                        anything(),
                        anything()
                    )
                ).thenCall((cb: Callbacks) => {
                    const playerOne = mockPlayer('PLAYER_ONE');
                    when(playerOne.play(anything(), anything())).thenCall(() =>
                        cb.onError(new Error('PLAY_ERROR'))
                    );
                    return Promise.resolve(instance(playerOne));
                });

                const playerTwo = mockPlayer('PLAYER_TWO');
                const playerFactoryToCallAfterFail = mockPlayerFactory(
                    'hls',
                    true,
                    instance(playerTwo)
                );

                const playerConfig: PlayerConfig = {
                    container: document.createElement('div'),
                    factories: [
                        instance(playerFactoryWithPlayerRaisingAnErrorOnPlay),
                        instance(playerFactoryToCallAfterFail)
                    ],
                    handler: instance(mockHandlerSpy)
                };

                objectUnderTest = new Player(playerConfig);

                const sourceSet: SourceSet = {
                    hls: [{ stream: 'test_stream_url' }]
                };

                await objectUnderTest.play(sourceSet);

                verify(
                    playerFactoryWithPlayerRaisingAnErrorOnPlay.create(
                        anything(),
                        anything()
                    )
                ).once();
                verify(
                    playerFactoryToCallAfterFail.create(anything(), anything())
                ).once();
            });
        });
    });

    describe('hasCamera', () => {
        const createMediaDeviceInfo: (
            kind: MediaDeviceKind
        ) => MediaDeviceInfo = (kind: MediaDeviceKind) => {
            return {
                deviceId: '123',
                groupId: '456',
                kind: kind,
                label: 'test_device',
                toJSON: (): string => ''
            };
        };

        it('with no camera returns false', async () => {
            const mediaDeviceInfos: MediaDeviceInfo[] = [
                createMediaDeviceInfo('audioinput'),
                createMediaDeviceInfo('audiooutput')
            ];

            when(mediaDevicesMock.enumerateDevices()).thenResolve(
                mediaDeviceInfos
            );

            const hasCameraResult = await objectUnderTest.hasCamera();

            expect(hasCameraResult).toBe(false);
        });

        it('with one or more camera returns true', async () => {
            const mediaDeviceInfos: MediaDeviceInfo[] = [
                createMediaDeviceInfo('audioinput'),
                createMediaDeviceInfo('videoinput')
            ];

            when(mediaDevicesMock.enumerateDevices()).thenResolve(
                mediaDeviceInfos
            );

            const hasCameraResult = await objectUnderTest.hasCamera();

            expect(hasCameraResult).toBe(true);
        });
    });

    // describe('startCamera', () => {
    //     it('with the camera being denied calls camera denied handler', async () => {
    //         (<any>objectUnderTest)._getUserMedia = (): Promise<MediaStream> =>
    //             Promise.reject(
    //                 new DOMException('not allowed', 'NotAllowedError')
    //             );

    //         await objectUnderTest.startCamera();

    //         verify(handlerSpy.onCameraDenied()).once();
    //         verify(handlerSpy.onCameraOff()).never();
    //     });

    //     it('with no camera available calls camera denied handler', async () => {
    //         (<any>objectUnderTest)._getUserMedia = (): Promise<MediaStream> =>
    //             Promise.reject(new DOMException('not found', 'NotFoundError'));

    //         await objectUnderTest.startCamera();

    //         verify(handlerSpy.onCameraOff()).once();
    //         verify(handlerSpy.onCameraDenied()).never();
    //     });

    //     it('does call onCameraOn handler', async () => {
    //         await objectUnderTest.startCamera();
    //         verify(handlerSpy.onCameraOn()).once();
    //     });
    // });

    describe('publish', () => {
        it('with an empty targetSet returns false', () => {
            const targetSet: TargetSet = {};

            const result = objectUnderTest.publish(targetSet);

            expect(result).toBe(false);
        });

        // describe('called twice while still publishing', () => {
        //     const targetSet: TargetSet = {
        //         jpeg: [
        //             {
        //                 stream: 'any stream',
        //                 width: 640,
        //                 height: 480,
        //                 fps: 20,
        //                 quality: 1
        //             }
        //         ]
        //     };

        //     let dummyCamPublisher: PicUpStream;
        //     // let spiedObjectUnderTest: Player;

        //     beforeEach(async () => {
        //         resetCalls(handlerSpy);

        //         const mediaStreamMock = mock<MediaStream>();
        //         (<any>objectUnderTest)._getUserMedia = (): Promise<MediaStream> => Promise.resolve(mediaStreamMock);

        //         await objectUnderTest.startCamera();

        //         verify(handlerSpy.onCameraDenied()).never();
        //         verify(handlerSpy.onCameraOff()).never();

        //         dummyCamPublisher = mock(PicUpStream);

        //         (<any>objectUnderTest)._createCamPublisher = (
        //             _jpeg: JpegTarget
        //         ) => dummyCamPublisher;
        //         // spiedObjectUnderTest = spy(objectUnderTest);
        //         // when((<any>spiedObjectUnderTest)._createCamPublisher()).thenReturn(dummyCamPublisher);

        //         objectUnderTest.publish(targetSet);

        //         // resetCalls(spiedObjectUnderTest);
        //         resetCalls(dummyCamPublisher);
        //     });

        //     it('is ignored if using an equal target set', () => {
        //         const publishResult = objectUnderTest.publish(targetSet);

        //         expect(publishResult).toBe(true);
        //         verify(dummyCamPublisher.publish).never;
        //         // expect(playerCreateCamPublisherSpy).not.toHaveBeenCalled();
        //     });

        //     it('throws if using a different target set', () => {
        //         const differentTargetSet: TargetSet = {
        //             jpeg: [
        //                 {
        //                     stream: 'other stream',
        //                     width: 1024,
        //                     height: 768,
        //                     fps: 20,
        //                     quality: 1
        //                 }
        //             ]
        //         };

        //         expect(() =>
        //             objectUnderTest.publish(differentTargetSet)
        //         ).toThrowError();
        //     });
        // });

        describe('to jpeg target', () => {
            it('with no started camera must throw an error', () => {
                const targetSet: TargetSet = {
                    jpeg: [
                        {
                            stream: 'any stream',
                            width: 640,
                            height: 480,
                            fps: 20,
                            // eslint-disable-next-line unicorn/no-zero-fractions
                            quality: 1.0
                        }
                    ]
                };

                expect(() => objectUnderTest.publish(targetSet)).toThrow();
            });
        });
    });

    describe('constructor', () => {
        it('throws if handler is null', () => {
            const playerConfig: PlayerConfig = {
                container: document.createElement('div'),
                factories: [],
                handler: null
            };

            expect(() => new Player(playerConfig)).toThrowError();
        });
    });

    // describe('initPlayer', () => {
    //     it('with single format', () => {
    //         objectUnderTest.initPlayer('test_format_one');
    //     });

    //     it('with multiple formats', () => {
    //         objectUnderTest.initPlayer(['test_format_one', 'test_format_two']);
    //     });
    // });
});
