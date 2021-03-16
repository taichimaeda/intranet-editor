import React, { useContext } from 'react';
import { DispatchContext } from './App';
import Cell from './Cell';

export default function Column(props) {
    const dispatch = useContext(DispatchContext);

    return (
        <div id={props.column.id} className={props.column.className}>
            {props.column.cells.map(cell =>
                <Cell
                    key={cell.id}
                    cell={cell}
                    onMouseDown={() => {
                        dispatch({
                            type: 'select',
                            selected: {
                                column: props.column,
                                cell: cell,
                            }
                        });
                    }}
                />)}
        </div>
    );
}