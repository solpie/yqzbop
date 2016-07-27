import {VueEx, Component} from "../../../../YuanTV3/src/view/VueEx";
import {appModel} from "../../model/Const";
@Component({
    template: require('./setting.html'),
    props: {
        serverIP: {
            type: String,
            required: true,
            default: '192.168.1.73'
        }
    },
    watch: {
        serverIP: 'onServerIP'
    }
})
export class Setting extends VueEx {
    serverIP:string;

    ready() {
        if (appModel.ip) {
            this.serverIP = appModel.ip;
        }
    }

    onServerIP(v) {
        console.log(`onServerIP${v}`);
        appModel.ip = v;
    }
}
