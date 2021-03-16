import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { getColumns } from './utils';

chrome.runtime.onMessage.addListener(message => {
    if (message.command === 'activate') {
        const rootElement = document.querySelector('div#A1_WDPLN-ZoneCorps > table > tbody > tr:nth-of-type(2)');

        chrome.storage.local.get(['columns'], result => {
            if (result.columns !== null) {
                ReactDOM.render(
                    <App columns={result.columns}/>,
                    rootElement
                );
            } else {
                ReactDOM.render(
                    <App columns={getColumns(rootElement)}/>,
                    rootElement
                );
            }
        });
    }
});
