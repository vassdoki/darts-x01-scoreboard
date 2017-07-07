import React from "react";

export default class Round extends React.Component {
    render () {
        const throws = this.props.data.throws.map((t, i) => {
            var throwClass="label ";
            switch(t.mod) {
                case 0: throwClass += "label-out"; break;
                case 1: throwClass += "label-default"; break;
                case 2: throwClass += "label-success"; break;
                case 3: throwClass += "label-danger"; break;
                default: break;
            }
            return <li key={Math.random()}><span className={throwClass}>{t.num}</span></li>
        });
        var roundSum = this.props.data.throws.reduce((a,t) => {
            a += t.num * t.mod;
            return a;
        }, 0);
        if (!this.props.data.valid) {
            roundSum = 0;
        }
        return <div className="table">
            <ul>
                { throws }
                <li className="big">{roundSum}</li>
            </ul>
        </div>

    }
}