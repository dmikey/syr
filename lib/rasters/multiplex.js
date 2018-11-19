class multiplex {
    constructor() {
      this.type = 'nodom';
      this.dimensionValues = { width: 0, height: 0, scale: 0 };
    }
  
    render(component) {
      this.sendMessage('gui', component);
    }
  
    sendMessage(type, message) {
        sendMessageToParent({
            type: type,
            message: message
        });
    }
  
    dimensions() {
      return {
        // these should be set by injection
        width: this.dimensionValues.width || 600,
        height: this.dimensionValues.height || 600,
        scale: this.dimensionValues.scale || 1,
      };
    }
  
    props() {
      // these should be set by injection
      return this.propValues;
    }
  }

  function sendMessageToParent(message) {
    parent.postMessage({type:'MULTIPLEX_MESSAGE', message: JSON.stringify(message)}, '*');
  }
  
  const Multiplex = new multiplex();
  export { Multiplex };
  