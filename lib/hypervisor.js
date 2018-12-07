import { Server } from '@syr/bus';
import { Render, Component, View, Button, RasterManager } from '../index';
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
        console.log('oh shooot >>>> ', event);
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
        return (<View style={{width:300, height:50, top:50, left: 20}}>
            <Button  onPress={()=>this.onPress()} style={{width:200,height:20, backgroundColor:'#000'}}>Load an App</Button>
            <Text style={{width:300,height:20, top:25}}>Hypervisor Running</Text>
        </View>)
    }
    onPress(){
       console.log('hallo')
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