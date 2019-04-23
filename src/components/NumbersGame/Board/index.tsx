import * as React from 'React';

import Panel from '../Panel';
import './style.css';

interface Props {
    tapTarget: number
}

export default class Board extends React.Component<Props, {}> {

    private SIZE = 9;

    render() {
        return (
            <div className="board">
                {  new Array(this.SIZE).fill(0).map((n:undefined, idx:number) => {
                    return (
                        <div className="board__item" key={idx}>
                            <Panel
                                tapTarget={this.props.tapTarget}
                                number={idx}
                            />
                        </div>
                    )
                } ) }
            </div>
        )
    }
}
