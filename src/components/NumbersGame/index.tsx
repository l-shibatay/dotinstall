import * as React from 'React';

import bus from './bus';
import Board from './Board';
import Timer from './Timer';
import StartButton from './StartButton';

import './style.css';

interface Props {}

interface State {
    tapTarget: number,
    isPlaying: boolean
}

export default class NumbersGame extends React.Component<Props, State> {

    public state: State = {
        tapTarget: 0,
        isPlaying: false,
    }

    componentDidMount() {
        bus.addListener('numbersgame.panel.passed', this.onPanelPassed.bind(this));
        bus.addListener('numbersgame.startButton.clicked', this.startGame.bind(this));
        bus.addListener('numbersgame.panel.passed.all', this.finishGame.bind(this));
    }
    startGame() {
        if (this.state.isPlaying) {
            this.restartGame();
        } else {
            this.setState({ isPlaying: true });
        }
        bus.emit('numbersgame.game.started')
    }
    finishGame() {
        // 終了時の処理
        bus.emit('numbersgame.game.finished')
    }
    restartGame() {
        this.setState({ tapTarget: 0 });
    }
    onPanelPassed() {
        this.setState({
            tapTarget: this.state.tapTarget + 1
        })
    }
    render() {
        return (
            <div className="main">
                <Timer />
                <Board tapTarget={this.state.tapTarget}  />
                <StartButton isPlaying={this.state.isPlaying} />
            </div>
        )
    }
}
