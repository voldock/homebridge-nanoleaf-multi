import { AbstractAppender, IEntry, STANDARD_LEVELS } from 'simple-node-logger';

export default class HomebridgeLogAppender extends AbstractAppender {
  constructor(private readonly homebridgeLog: (message: string) => void) {
    super({
      typeName: 'HomebridgeLogAppender',
    });
  }

  write(entry: IEntry) {
    this.homebridgeLog(entry.msg);
  }

  setLevel(level: STANDARD_LEVELS) {}
}
