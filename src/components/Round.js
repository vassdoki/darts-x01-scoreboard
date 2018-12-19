import React from "react";
import strings from '../utils/localization'

export default class Round extends React.Component {
    render () {
        var thr = []
        for(var i = 1; i <= 3; i++) {
            if (this.props.data.throws.length >= i) {
                var throwClass="btn btn-lg btn-default ";
                var t = this.props.data.throws[i-1]
                switch(t.mod) {
                    case 0: throwClass += "btn-missed"; break;
                    case 1: throwClass += "btn-default"; break;
                    case 2: throwClass += "btn-double"; break;
                    case 3: throwClass += "btn-triple"; break;
                    default: break;
                }
                thr.push(<td key={i}><button className={throwClass}>{t.num}</button></td>)
            } else {
                if (i-1 === this.props.data.throws.length && this.props.activePlayer && this.props.lastRound) {
                  thr.push(<td key={i}>
                        <button className="btn btn-lg btn-default btn-empty curr-throw">&nbsp;</button>
                      </td>)
                } else {
                  thr.push(<td key={i}>
                        <button className="btn btn-lg btn-default btn-empty">&nbsp;</button>
                      </td>)
                }
            }
        }
        var roundSum = this.props.data.throws.reduce((a,t) => {
            a += t.num * t.mod;
            return a;
        }, 0);
        let bustClass = "";
        if (!this.props.data.valid) {
            roundSum = strings.bust;
            bustClass = "bust";
        }
        if (this.props.data.throws.length === 0) {
            roundSum = <span>&nbsp;</span>
        }
        return <tr>
                { thr }
                <td className={"btn btn-lg btn-default btn-overall " + bustClass}>{roundSum}</td>
        </tr>

    }
}