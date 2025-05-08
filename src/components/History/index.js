import React from 'react';

const History = ({ history, reopenSuggestionBox }) => {
    return (
        <div style={{ width: '40vw', padding: '10px' }}>
            <h3>History</h3>
            <div style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                {history.map((entry, index) => (
                    <div
                        key={index}
                        style={{ cursor: 'pointer', padding: '8px', margin: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
                        onClick={() => reopenSuggestionBox(entry)}
                    >
                        <p><strong>{entry.wordPrompted}</strong></p>
                        <p>{entry.contextsGiven.join(", ")}</p>
                        <p><em>{entry.wordChosen}</em></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
