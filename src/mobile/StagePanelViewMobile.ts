import {StagePanelView} from "../../../YuanTV3/src/view/panel/stage/StagePanelView";
import Component from "vue-class-component";
import {PanelId,TimerState} from "../../../YuanTV3/src/event/Const";
import {CommandId} from "../../../YuanTV3/src/event/Command";
import {EventId, appModel} from "../model/Const";
@Component({
    template: require('./stage-panel-mobile.html'),
    props: {
        op: {
            type: Boolean,
            required: true,
            default: false
        },
        timerName: {
            type: String,
            default: "start"
        },
        mvpIdx: {
            type: Number,
            required: true,
            default: 0
        },
        gameId: {
            type: Number,
            required: true,
            default: 0
        },
        playerInfoArr: {
            type: Array,
            default: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }
})
export class StagePanelViewMobile extends StagePanelView {
    ready() {
        // super.ready(PanelId.stagePanel, false);

        this.$on(`${EventId.setting_serverIPChanged}`, (ip)=> {
            console.log(ip);
        })
    }

    opReq(cmdId:string, param?:any, callback?:any) {
        var url = `http://${appModel.ip}/panel/${PanelId.stagePanel}/${cmdId}`;
        console.log(`opReq${url}`);
        this.$http.post(url,
            param,
            callback);
    }

    initIO(io:any) {
        console.log('init io!!!');
    }

    onToggleTimer() {
        this.opReq(`${CommandId.cs_toggleTimer}`);
        console.log('onToggleTimer');
    }

    onResetTimer() {
        console.log('onResetTimer');
        this.opReq(`${CommandId.cs_resetTimer}`);
    }

    onAddLeftScore() {
        console.log('onAddLeftScore');
        this.opReq(`${CommandId.cs_addLeftScore}`,
            {param: 'addLeftScore'});
    }

    onAddRightScore() {
        console.log('onAddRightScore');
        this.opReq(`${CommandId.cs_addRightScore}`);
    }

    onQueryPlayer(idx) {
        var queryId = this.getElem("#player" + idx).value;
        console.log('onQueryPlayer', idx, queryId);
        this.post(`/db/player/${queryId}`, (data) => {
            console.log('res: ', data);
            var playerDoc = data.playerDoc;
            this.getElem('#playerImg' + idx).src = playerDoc.avatar;
        });
    }

    onUpdatePlayerNum(idx) {
        var backNum = this.getElem("#playerNum" + idx).value;
        console.log('onUpdatePlayerNum', idx, backNum);
        this.opReq(`${CommandId.cs_updatePlayerBackNum}`, {idx: idx, backNum: backNum});
        // this.playerPanel.playerCardArr[idx].setBackNumber(playerNum);
    }

    onStarting() {
        console.log('onStarting');
        var playerIdArr = [];
        var backNumArr = [];
        for (var i = 0; i < 8; i++) {
            var queryId = Number(this.getElem("#player" + i).value);
            playerIdArr.push(queryId);
            backNumArr.push(Number(this.getElem("#playerNum" + i).value));
        }
        // playerIdArr = [10002, 10003, 10004, 10005,
        //     10008, 10010, 10011, 10012];
        this.opReq(`${CommandId.cs_updatePlayerAll}`,
            {playerIdArr: playerIdArr, backNumArr: backNumArr}
        );
    }

    onSetEloScore(idx) {
        var eloScore = Number(this.getElem("#eloScore" + idx).value);
        this.playerPanel.setEloScore(idx, eloScore);
    }

    onUpdateBackNum() {
        for (var idx = 0; idx < 8; idx++) {
            var backNum = this.getElem("#playerNum" + idx).value;
            console.log('onUpdatePlayerNum', idx, backNum);
            this.opReq(`${CommandId.cs_updatePlayerBackNum}`, {idx: idx, backNum: backNum});
        }
    }

    onUpdatePlayer(idx) {
        console.log('onUpdatePlayer', idx);
        var queryId = Number(this.getElem("#player" + idx).value);
        console.log('onQueryPlayer', idx, queryId);
        this.opReq(`${CommandId.cs_updatePlayer}`, {idx: idx, playerId: queryId});
    }

    onMinRightScore() {
        console.log('onMinRightScore');
        this.opReq(`${CommandId.cs_minRightScore}`);
    }

    onMinLeftScore() {
        console.log('onMinLeftScore');
        this.opReq(`${CommandId.cs_minLeftScore}`);
    }

    onShowWin() {
        console.log('onShowWin mvp ', this.mvpIdx);
        var isBlueMvp = this.mvpIdx < 4;
        if (this.scorePanel.isBlueWin != isBlueMvp) {
            alert('比赛结果与mvp不符')
        }
        else {
            this.opReq(`${CommandId.cs_toggleTimer}`, {state: TimerState.PAUSE});
            this.opReq(`${CommandId.cs_fadeInWinPanel}`, {mvpIdx: this.mvpIdx});
        }
    }

    onHideWin() {
        console.log('onHideWin mvp ');
        this.opReq(`${CommandId.cs_fadeOutWinPanel}`);
    }

    onSubmitGame() {
        var isBlueMvp = this.mvpIdx < 4;
        if (this.scorePanel.isBlueWin != isBlueMvp) {
            alert('比赛结果与mvp不符')
        }
        else {
            var date = new Date();
            var dateTime = date.getTime();
            console.log('onSubmitGame', dateTime);
            this.opReq(`${CommandId.cs_saveGameRec}`, {date: dateTime}, (res) => {
                console.log(res);
                this.isSubmited = true;
                if (res) {
                    alert('比赛结果提交成功');
                }
                else {
                    alert('比赛结果已经提交过了');
                }
            });
        }
    }

    onAddLeftFoul() {
        console.log('onAddLeftFoul');
        this.opReq(`${CommandId.cs_addLeftFoul}`);
    }

    onMinLeftFoul() {
        console.log('onMinLeftFoul');
        this.opReq(`${CommandId.cs_minLeftFoul}`);
    }

    onMinRightFoul() {
        console.log('onMinRightFoul');
        this.opReq(`${CommandId.cs_minRightFoul}`);
    }

    onAddRightFoul() {
        console.log('onAddRightFoul');
        this.opReq(`${CommandId.cs_addRightFoul}`);
    }

    onComingActivity() {
        console.log('onComingActivity');
        this.opReq(`${CommandId.cs_setGameComing}`);
    }
}