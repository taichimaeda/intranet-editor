import React from 'react';
import { getStyles } from "../utils";

export default function Cell(props) {
    const liClassName1 = "WDPLN-RendezVousTitre padding A1-sty10812";
    const liClassName2 = "WDPLN-RendezVousImage padding A1-sty10501";

    const styles = getStyles(props.cell);

    return (
        <div
            id={props.cell.id}
            className={props.cell.className}
            onMouseDown={() => { props.onMouseDown(); }}
            style={styles.container}
        >
            <ul title={props.cell.title} style={styles.ul}>
                <li className={liClassName1} style={styles.li[0]}>
                    <div style={styles.div}>
                        {props.cell.title}
                    </div>
                </li>
                <li className={liClassName2} style={styles.li[1]}>
                    <div style={styles.div}>
                        {props.cell.content}
                    </div>
                </li>
            </ul>
        </div>
    );
}
