import { ICommand, ICommandResponse } from "twokei-xframework";

export default class PingCommand implements ICommand {
    name: string = 'ping';

    callback({ message, args }: ICommandResponse) {



        return 'test';
    }
}