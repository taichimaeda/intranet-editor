import { deepCopy, getTitle, getTime } from "./utils";

export function handleSelect(state, action) {
    const columns = deepCopy(state.columns);
    return {
        columns: columns,
        selected: {
            column: action.selected.column,
            cell: action.selected.cell,
        }
    };
}

export function handleRemove(state, action) {
    const columns = deepCopy(state.columns);
    columns[state.selected.column.index].cells[state.selected.cell.index].style.display = 'none';

    return {
        columns: columns,
        selected: {
            column: state.selected.column,
            cell: state.selected.cell,
        }
    };
}

export function handleChange(state, action) {
    const columns = deepCopy(state.columns);
    const cell1 = columns[action.target.column.index].cells[action.target.cell.index];
    const cell2 = columns[state.selected.column.index]
        .cells[state.selected.cell.index];

    cell2.style.color1 = cell1.style.color1;
    cell2.style.color2 = cell1.style.color2;
    cell2.content = cell1.content;

    const title = getTitle(cell1);
    const time = getTime(cell2);
    cell2.title = time + title;

    return {
        columns: columns,
        selected: {
            column: state.selected.column,
            cell: state.selected.cell,
        },
    };
}

export function handleDefault(state, action) {
    return state;
}