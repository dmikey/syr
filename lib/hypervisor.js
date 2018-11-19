import { Server } from '@syr/bus';
import { Render, Component, View, RasterManager } from '../index';
require('../samples/images/piggy.png');

class SyrHyperVisor extends Component {
    constructor() {
        super();
        this.state.frames = 0;
        this.server = new Server();
        this.server.handleMultiplex = event => this.recieveMultiplexMessage(event);
        const global = window || global;
        global.SyrHyperVisor = this;
        global.SyrEvents.handler = event => this.handleEvent(event);
    }
    handleEvent(event) {
        console.log(event);
        this.server.sendMessage('http://localhost:8081', {type:'MULTIPLEX_MESSAGE', message: event})
    }
    recieveMultiplexMessage(event) {
        const raster = RasterManager.getRaster();
        const message = JSON.parse(event.data.message);
        if (message.type === 'gui') {
            raster.render(message.message, document.getElementById('root'));
        } else if (message.type === 'animation') {
            raster.sendMessage('animation', message.message);
        }
    }
    render() {
        // the hypervisor should return multi-plexed view code
        return <Text>Hypervisor Running</Text>
    }
    componentDidMount() {
        // send signal for loading apps
        console.log('Hypervisor Mounted!');
    }
    loadApp(path) {
        this.server.loadApp(path, {hidden:true}, {
            foo: 'bar'
        });
    }
};

// currently the hypervisor is rendering to the DOM
// to start it's hooks
Render(SyrHyperVisor, document.getElementById('root'));