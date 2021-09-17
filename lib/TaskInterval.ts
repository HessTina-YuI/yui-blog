// @ts-ignore
import { NodeJS } from 'timers';

class TaskInterval {
    private readonly func: Function;
    private time: number;

    private interval: NodeJS.Timer | null;

    constructor(func: Function, time: number) {
        this.func = func;
        this.time = time;
    }

    start() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(this.func, this.time);

        return this;
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = null;

        return this;
    }

    reset(newTime: number = this.time) {
        this.time = newTime;
        this.start();

        return this;
    }

}

export default TaskInterval;
