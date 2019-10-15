import * as React from 'React'

import bus from '../bus'
import Panel from '../Panel'
import config from './boardConfig'
import './style.css'

interface Props {
    tapTarget: number,
}

interface State {
    panels: Array<number>
}

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

export default class Board extends React.Component<Props, State> {

    public config = config;
    public state: State = {
        panels: new Array(this.config.item).fill(0).map((n, i) => i)
    }
    private boardStyle = {
        margin: `0 -${config.panelGutter / 2}px`,
        width: `${
            (config.panelSize * config.column) +
            (config.panelGutter * config.column)
        }px`
    }
    private panelStyle = {
        width: `${config.panelSize}px`,
        height: `${config.panelSize}px`,
        margin: `0 ${config.panelGutter / 2}px ${config.panelGutter}px`,
    }

    componentDidMount() {
        bus.addListener('numbersgame.game.started', this.onGameStarted.bind(this));
        bus.addListener('numbersgame.panel.passed', this.onPanelPassed.bind(this));
    }

    onGameStarted() {
        const panels = shuffle(this.state.panels)
        this.setState({ panels })
    }

    onPanelPassed() {
        if (this.props.tapTarget === config.item - 1) {
            bus.emit('numbersgame.panel.passed.all')
        }
    }

    render() {
        return (
            <div className="board" style={this.boardStyle}>
                {  this.state.panels.map((n:number) => {
                    return (
                        <div className="board__item" style={this.panelStyle} key={n}>
                            <Panel
                                tapTarget={this.props.tapTarget}
                                number={n}
                            />
                        </div>
                    )
                } ) }
            </div>
        )
    }
}
