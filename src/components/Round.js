import React from "react";

export default class Round extends React.Component {
    render () {
        var thr = []
        for(var i = 1; i <= 3; i++) {
            if (this.props.data.throws.length >= i) {
                var throwClass="label ";
                var t = this.props.data.throws[i-1]
                switch(t.mod) {
                    case 0: throwClass += "label-out"; break;
                    case 1: throwClass += "label-default"; break;
                    case 2: throwClass += "label-success"; break;
                    case 3: throwClass += "label-danger"; break;
                    default: break;
                }
                // TODO: RANDOM KEY is bad!
                thr.push(<li key={Math.random()}><span className={throwClass}>{t.num}</span></li>)
            } else {
                // TODO: RANDOM KEY is bad!
                thr.push(<li key={Math.random()}><span className="label-none">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li>)
            }
        }
        var roundSum = this.props.data.throws.reduce((a,t) => {
            a += t.num * t.mod;
            return a;
        }, 0);
        if (!this.props.data.valid) {
            roundSum = 0;
        }
        if (this.props.data.throws.length === 0) {
            roundSum = <span>&nbsp;</span>
        }
        return <div className="table">
            <ul>
                { thr }
                <li className="big">{roundSum}</li>
            </ul>
        </div>

    }
}