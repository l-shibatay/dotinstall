import * as React from 'React';
import './style.css';

interface Props {
    textNode: string
    index: number
}

export default class Target extends React.Component<Props, {}> {
    private maskedText:string;
    private maskChar:string = '_';

    getMaskedText() {
        return `${
            this.maskChar.repeat(this.props.index) +
            this.props.textNode.substr(this.props.index)
        }`;
    }

    render() {

        return (
            <div>
                <div className="target">{ this.getMaskedText() }</div>
            </div>
        )
    }
}
