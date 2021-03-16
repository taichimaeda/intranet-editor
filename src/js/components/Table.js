import React from 'react';
import Column from "./Column";

export default function Table(props) {
    const trClassName = "WDPLN-ZoneCorpsDimensionTotale";
    const tdClassName = "WDPLN-Conteneur lh0 WDPLN-Premier";

    return (
        <table>
            <tbody>
            <tr className={trClassName}>
                {props.columns.map(column =>
                    <td key={column.id} className={tdClassName}>
                        <Column column={column}/>
                    </td>)}
            </tr>
            </tbody>
        </table>
    );
}