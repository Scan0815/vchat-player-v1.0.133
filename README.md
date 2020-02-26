# vchat-player

vchat-player

## Installing

For the latest stable version:

```
npm install vchat-player
```

## using the vchat-player

``` javascript
player = new Player(config)
```

### The factories

The vchat-player comes with a set of factories which each represent and set up a certain player type. The vchat-player will only use the factories you provide to it in the order they are given within the array (except a prefferedOrder provided by the sourceSet retrieved from the vchat-core overrides this order).
Every factory needs to provide an isSupported function that only returns true if at least one of the factory's formats and the factory's streaming technology are supported by the guest's browser.
The player will check the factories' isSupported functions in order to find a proper factory to play the sourceSet. Once a proper factory has been selected the player call's the factory's create() method to create the actual player instance for the given format.
Each factory takes its own configuration.

#### RTMP Player

``` javascript
rtmpPlayerFactory = new RtmpPlayerFactory(config)
```

#### HLS.js Player

``` javascript
hlsJsPlayerFactory = new HlsJsPlayerFactory(config)
```

A player for HLS streams using the hls.js JavaScript library.

* supported formats: hls
* name:              HLSJS

#### HLS Player

``` javascript
hlsPlayerFactory = new HlsPlayerFactory(config)
```

A player for HLS streams using the native HLS implementation of the browser (currently available on Apple devices and in Chrome on Android).

* supported formats: hls
* name:              HLS_NATIVE

#### JPEG Player

``` javascript
jpegPlayerFactory = new JpegPlayerFactory(config)
```

A player for a JPEG stream (using the PicStream class from vchat-core). In addition an mp3 or OGG/Vorbis stream can be played to add sound to the images.
