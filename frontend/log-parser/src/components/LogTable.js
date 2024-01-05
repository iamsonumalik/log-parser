import '../css/table.css';
import React from "react";

export const LogTable = ({logData}) => {
    return (
        <div>
            <h1>Parsed Output</h1>
            <table className="log-table">
                <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Log Level</th>
                    <th>Transaction ID</th>
                    <th>Error</th>
                </tr>
                </thead>
                <tbody>
                {logData.map((log, index) => (
                    <tr key={index}>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                        <td>{log.loglevel}</td>
                        <td>{log.transactionId}</td>
                        <td>{log.err}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};