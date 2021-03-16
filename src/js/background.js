import { sendMessage, getTitle } from "./utils";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ columns: null });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
        sendMessage({
            command: 'activate'
        });

        // add context menus
        chrome.contextMenus.removeAll();
        chrome.contextMenus.create({
            title: 'remove',
            contexts: ['all'],
            onclick: () => {
                sendMessage({
                    command: 'remove'
                });
            }
        });
    }
});

chrome.runtime.onMessage.addListener(message => {
    if (message.command === 'create') {
        const flags = {};
        const columns = message.content;
        for (const column of columns)
        for (const cell of column.cells) {
            const title = getTitle(cell);
            if (! flags[title]) {
                flags[title] = true;
                chrome.contextMenus.create({
                    title: 'change to ' + title,
                    contexts: ['all'],
                    onclick: () => {
                        sendMessage({
                            command: 'change',
                            target: {
                                column: column,
                                cell: cell,
                            }
                        });
                    }
                });
            }
        }
    }
});