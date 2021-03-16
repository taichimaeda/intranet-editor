export function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}

export function sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

export function getTitle(cell) {
    const res = cell.title.match(/(?:\d\d:\d\d\s-\s)?(.+)$/);
    return res[res.length - 1];
}

export function getTime(cell) {
    const res = cell.title.match(/(\d\d:\d\d\s-\s)/);
    return (res === null) ? "" : res[0];
}

export function getColumns(rootElement) {
    const columnElements = rootElement.querySelectorAll('td > div:nth-of-type(2)');
    const columns = [];

    Array.prototype.forEach.call(columnElements, (columnElement, columnIndex) => {
        const cellElements = columnElement.querySelectorAll('div.WDPLN-RendezVousExterne');
        const cells = [];

        Array.prototype.forEach.call(cellElements, (cellElement, cellIndex) => {
            const ulElement = cellElement.querySelector('ul');
            const liElements = cellElement.querySelectorAll('ul > li');
            const divElements = cellElement.querySelectorAll('ul > li > div');
            cells.push({
                index: cellIndex,
                id: cellElement.id,
                className: cellElement.className,
                title: divElements[0].innerText,
                content: divElements[1].innerText,
                style: {
                    display: 'block',
                    top: cellElement.style.top,
                    left: cellElement.style.left,
                    width: ulElement.style.width,
                    height: ulElement.style.height,
                    color1: liElements[0].style.backgroundColor,
                    color2: liElements[1].style.backgroundColor,
                },
            });
        });

        columns.push({
            index: columnIndex,
            id: columnElement.id,
            className: columnElement.className,
            cells: cells
        });
    });

    return columns;
}

export function getStyles(cell) {
    return {
        container: {
            display: cell.style.display,
            position: 'absolute',
            zIndex: '4',
            top: `calc(${cell.style.top} + 2px)`,
            left: `calc(${cell.style.left})`,
            // width: `calc(${cell.style.width} + 2px`,
            height: `calc(${cell.style.height} + 2px`,
        },
        ul: {
            width: cell.style.width,
            height: cell.style.height,
        },
        li: [
            {
                paddingTop: '1px',
                boxShadow: `0px 20px 10px -10px ${cell.style.color2} inset`,
                backgroundColor: cell.style.color1,
            },
            {
                height: '100%',
                backgroundImage: "url('https://sp.rosey.ch/AgendaEleve_WEB/ext/covid16.png')",
                backgroundColor: cell.style.color2,
            }
        ],
        div: {
            width: `calc(${cell.style.width} - 4px)`,
        }
    }
}
