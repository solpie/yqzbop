export enum EventId{
    setting_serverIPChanged
}

class AppModel {
    ip:string = '192.168.1.73';

}
var appModel = new AppModel();
export {appModel};