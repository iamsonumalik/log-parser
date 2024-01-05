import express from 'express';
import bodyParser from 'body-parser';
import LogParser from "./service/logParser.service";
import cors from 'cors';
let logParser = new LogParser();
const app = express();
import multer  from 'multer';
const upload = multer({ dest: 'uploads/' })

app.use(bodyParser.json({ limit: '100MB' }));
app.use(cors());

// API to upload file chunks
app.post('/parse-log', upload.single('file'),async (req, res) => {
    try {
        const parsedLogs = await logParser.parseLogFile(req.file!.path);
        res.json(parsedLogs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;