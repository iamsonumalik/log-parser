import fs from 'fs';
import readline from 'readline';
export default class LogParser {
    async parseLogFile(filePath: string): Promise<any[]> {
        const parsedLogs: any[] = [];

        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            try {
                let l = JSON.parse( JSON.stringify( line.trim() ) )

                const regex = /(.+) - (.+) - (.+)/;
                const match = l.match(regex);
                if (match){
                    if (match[2] === 'error' || match[2] === 'warn') {
                        let message  = JSON.parse(match[3].replace(/&quot;/g,'"'));
                        parsedLogs.push({
                            timestamp: new Date(match[1]).getTime(),
                            loglevel: match[2],
                            transactionId: message.transactionId,
                            err: message.err || '',
                        });
                    }
                }
            } catch (error) {
                console.error(`Error parsing line: ${line}`);
            }
        }

        console.log(parsedLogs);
        return parsedLogs;
    }
}