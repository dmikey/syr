/** 
 * Class represents a sandboxed frame 
 * Currently Used to Represent an iFrame
*/
import { Component } from './component';

class Frame extends Component {
  tag(instance) {
    let frame = instance || document.createElement('iframe');
    return frame;
  }
}

export { Frame };
