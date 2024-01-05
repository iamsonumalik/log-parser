import React, {useState, useRef} from 'react';
import axios from 'axios';
import {LogTable} from "./LogTable";
import {AlertModal} from "./AlertModal";

const CHUNK_SIZE = 500 * 1024; // 500 KB

const LogParserApp = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setData(null);
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            setData(null);
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:3001/parse-log', formData);
            const data = response.data;
            setData(data);
            // Download the JSON file
            const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'parsedLogs.json';
            link.click();
        } catch (error) {
            setError('Error parsing log file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlert = () => {
        setError(null);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload} disabled={!file || loading}>
                {loading ? 'Uploading...' : 'Upload and Download'}
            </button>
            {data && <LogTable logData={data}/>}
            {error && <AlertModal message={error} onClose={handleCloseAlert} />}
        </div>
    );
};

export default LogParserApp;
