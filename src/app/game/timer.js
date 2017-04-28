import $ from "jquery";

export class Timer {
    constructor(options){
        this.selector = options.selector;
        this.interval = options.interval;
        this.tempTime = options.time;
        this.start();
    }

    decrementCounter() {
        if(this.tempTime <= 0){
            this.stop();
        }


        let hour = Math.floor(this.tempTime/3600);
        let sec = this.tempTime - (hour * 3600) ;
        let min = Math.floor(sec/60);
        sec = sec - (min * 60);

        hour = hour < 10 ? '0'+hour : ''+hour;
        min = min < 10 ? '0'+min : ''+min;
        sec = sec < 10 ? '0'+sec : ''+sec;

        let string = hour + ':' + min + ':' + sec;
        this.updateTime(string);

        this.tempTime --;
    }

    start () {
        clearInterval(this.timer);
        this.timer = setInterval(this.decrementCounter.bind(this), this.interval);
    }

    stop () {
        clearInterval(this.timer);
    }

    updateTime(string){
        $(this.selector).text(string);
    }
}
