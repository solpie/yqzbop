import {VueEx, Component} from "../../../../YuanTV3/src/view/VueEx";
import {EventId, appModel} from "../../model/Const";
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
    // serverIP:string;

    onServerIP(v) {
        console.log(`onServerIP${v}`);
        appModel.ip = v;
    }
}
