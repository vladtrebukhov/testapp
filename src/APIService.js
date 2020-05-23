import React from 'react';

export default class APIService extends React.Component {
    constructor(props) {
        super(props);
    }

    sendCredentialsToGateway = async(url, body) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        });

        try {
            return response.json();
        } catch(error) {
            return error;
        }
    };
}
