/**
 * This file glues together a bunch of stuff, to make a superset compatible reactique api
 */

require('./lib/fills');

// core composition
import { RasterManager } from './lib/rastermanager';
import { Component } from './lib/components/component';

// animations and events
import { Animated } from './lib/components/animated';
import { Events, EventEmitter } from './lib/events';

// fillers for native platforms
import { Networking } from './lib/networking';

// syr components
import { View } from './lib/components/view';
import { StackView } from './lib/components/stackview';
import { Button } from './lib/components/button';
import { Text } from './lib/components/text';
import { Image } from './lib/components/image';
import { LinearGradient } from './lib/components/lineargradient';
import { TouchableOpacity } from './lib/components/touchable';
import { ScrollView } from './lib/components/scrollview';
import { Alert } from './lib/components/alertDialogue';
import { Switch } from './lib/components/switch';
import { Frame } from './lib/components/frame';

// syr environment
import { NativeModules } from './lib/nativemodules';
import { Dimensions } from './lib/dimensions';
import { PixelRatio } from './lib/pixelratio';
import { Platform } from './lib/platform';

// rendering platforms
import { DOMRaster } from './lib/rasters/dom';
import { WKRaster } from './lib/rasters/wkwebview';
import { NoDOM } from './lib/rasters/nodom';
import { Multiplex } from './lib/rasters/multiplex';

// central SyrStore (flux Store)
import { SyrStore } from './lib/store';
import { Resolver } from './lib/resolver';

import { RasterUtils } from './lib/rasters/rasterutils';

// detecting rendering bridge
if(RasterUtils.props && RasterUtils.props.isSyrMultiplex) {
  RasterManager.setRaster(Multiplex);
} else if (
  typeof window !== 'undefined' &&
  (window.SyrBridge || (window.webkit && window.webkit.messageHandlers))
) {
  RasterManager.setRaster(WKRaster);
} else {
  if (typeof window == 'undefined' && !global.document) {
    RasterManager.setRaster(NoDOM);
  } else {
    RasterManager.setRaster(DOMRaster);
  }
}

// export render
const Render = RasterManager.render;

// api objects
export {
  Component,
  Render,
  RasterManager,
  View,
  StackView,
  Animated,
  Events,
  Button,
  Text,
  Image,
  NativeModules,
  Dimensions,
  EventEmitter,
  ScrollView,
  LinearGradient,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Alert,
  SyrStore,
  Switch,
  Resolver,
  Frame
};
