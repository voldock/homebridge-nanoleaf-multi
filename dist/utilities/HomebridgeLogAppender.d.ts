import { AbstractAppender, IEntry, STANDARD_LEVELS } from 'simple-node-logger';
export default class HomebridgeLogAppender extends AbstractAppender {
    private readonly homebridgeLog;
    constructor(homebridgeLog: (message: string) => void);
    write(entry: IEntry): void;
    setLevel(level: STANDARD_LEVELS): void;
}
