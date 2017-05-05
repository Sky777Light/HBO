export class Timer {
    constructor(options){
        this.update = options.update;
        this.endTime = options.endTime;
        this.selector = options.selector;
        this.interval = options.interval;
        this.optTime = options.time * 1000;
        this.start();
    }

    decrementCounter() {
        if(this.tempTime <= 0){
            this.update('00', '00', '00');
            this.endTime();
            this.stop();
            return;
        }


        let hour = Math.floor(this.tempTime/(3600*1000));
        let sec = this.tempTime - (hour * 3600)*1000 ;
        let min = Math.floor(sec/(60*1000));
        sec = Math.floor((sec - (min * 60*1000))/1000);

        hour = hour < 10 ? '0'+hour : ''+hour;
        min = min < 10 ? '0'+min : ''+min;
        sec = sec < 10 ? '0'+sec : ''+sec;

        this.update(hour, min, sec);

        this.tempTime -= this.interval;
    }

    start () {
        this.tempTime = this.optTime;
        clearInterval(this.timer);
        this.timer = setInterval(this.decrementCounter.bind(this), this.interval);
    }

    stop () {
        clearInterval(this.timer);
    }

}
