import {StagePanelViewMobile} from "./StagePanelViewMobile";
import {Setting} from "./setting/Setting";
import Vue = require('vue');
declare var io:any;
declare var pid:string;
declare var op:boolean;
declare var host:any;
declare var wsPort:any;


export class MobileView extends Vue {
    pid:string;
    isOp:boolean;
    panel:any;

    ready() {
        console.log('mobile ready');
    }

    connect() {
        // var wsUrl = `http://${host}:${wsPort}/${this.pid}`;
        // console.log("init panel!!!", this.pid, this.isOp, wsUrl);
        // return io.connect(wsUrl)
    }
}


//router

Vue.use(require('vue-resource'));

import VueRouter = require('vue-router');
import ComponentOption = vuejs.ComponentOption;
import {EventId} from "../model/Const";
Vue.use(VueRouter);
var router = new VueRouter<MobileView>();

router.map({
    '/': {
        component: Setting,
        name: 'home'
    },
    '/panel/stage/op': {
        component: StagePanelViewMobile,
        name: 'stage'
    },
    '/setting': {
        component: Setting,
        name: 'setting'
    },
    // '/screen/:op': {
    //     component: ScreenView,
    // },
    // '/act/:op': {
    //     component: ActivityPanelView,
    //     name: 'act'
    // }
});
router.afterEach((transition) => {
    var toPath = transition.to.path;
    router.app.isOp = /\/op/.test(toPath);


    router.app.$on(`${EventId.setting_serverIPChanged}`, (ip)=> {
        console.log(ip);
    });
    // if (/\/stage/.test(toPath)) {
    //     router.app.pid = PanelId.stagePanel;
    // } else if (/\/act/.test(toPath)) {
    //     router.app.pid = PanelId.actPanel;
    // } else if (/\/screen/.test(toPath)) {
    //     router.app.pid = PanelId.screenPanel;
    // }
    console.log('after each!!!', toPath);
});
////////////////
function onDeviceReady() {
    console.log('onDeviceReady');
    router.start(MobileView, '#app');
}
document.addEventListener('deviceready', onDeviceReady, false);
