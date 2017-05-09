import $ from "jquery";
import animations from "./data-anim";

export class Intro {
    constructor() {
        this.canScroll = true;
        this.touchStart = 0;
        this.presentState = 0;
        this.prevState = 0;
        this.scroller = $('.scroll-img');
    }

    setTouchStart(e) {
        this.touchStart = e.originalEvent.touches[0].clientY || e.originalEvent.touches[0].pageY;
    }

    scrollState(e) {
        e.preventDefault();
        if(this.canScroll){
            let newState = this.presentState;
            if(e.originalEvent.deltaY){
                newState += e.originalEvent.deltaY > 0 ? 1 : -1;
            } else {
                let touchEnd = e.originalEvent.touches[0].clientY || e.originalEvent.touches[0].pageY;
                newState += this.touchStart - touchEnd > 0 ? 1 : -1;
            }

            if(newState < 0 || newState > Object.keys(animations).length) {
                return;
            } else {
                this.scroller.fadeOut(300);
                this.canScroll = false;
                this.prevState = this.presentState;
                this.presentState = newState;
                this.animHelper(this.presentState, this.prevState)();
            }
        }
    }

    moveStraight(pres) {
        let nextAnim = animations[pres].onEnd ? this.animHelper(animations[pres].onEnd, -1) : null;

        if(animations[pres].fadeTo){
            $(animations[pres].selector).delay(animations[pres].delay).fadeTo(animations[pres].time, animations[pres].fadeTo, nextAnim);
        } else {
            $(animations[pres].selector).delay(animations[pres].delay).fadeIn(animations[pres].time, nextAnim);
        }

        if(animations[pres].hidePrev){
            for(var i = 0; i < animations[pres].hidePrev.length; i++){
                if(animations[pres].hidePrev[i].fadeTo){
                    $(animations[pres].hidePrev[i].selector).delay(animations[pres].hidePrev[i].delay).fadeTo(animations[pres].hidePrev[i].time, animations[pres].hidePrev[i].fadeTo, null);
                } else {
                    $(animations[pres].hidePrev[i].selector).delay(animations[pres].hidePrev[i].delay).fadeOut(animations[pres].hidePrev[i].time, null);
                }
            }
        }

        if(!animations[pres].onEnd)
            setTimeout(() => {
                this.scroller.fadeIn(300, ()=>{this.canScroll = true;});
            }, animations[pres].time + animations[pres].delay + 1000);

        this.presentState = pres;

    }

    moveBack(prev) {
        let nextAnim = this.animHelper(animations[prev].back.moveTo, -1);

        $(animations[prev].back.selectorHide).fadeOut(animations[prev].back.time, nextAnim);
        if(animations[prev].back.selectorShow)
            $(animations[prev].back.selectorShow).fadeIn(1000, null);

        if(animations[prev].back.fadeTo)
            $(animations[prev].back.fadeTo.selector).fadeTo(animations[prev].back.fadeTo.time, animations[prev].back.fadeTo.fadeTo, null);

    }

    animHelper(pres, prev) {
        let self = this;
        return () => {
            if (pres > 0) {
                if (pres > prev) {
                    self.moveStraight(pres);
                } else {
                    self.moveBack(prev);
                }
            } else {
                setTimeout(()=>{
                    self.scroller.fadeIn(300, ()=>{self.canScroll = true;});
                }, 1000);

                self.presentState = 0;
            }
        };
    }

    addListeners(){
        $(document).on("touchmove", this.scrollState.bind(this));
        $(document).on("touchstart", this.setTouchStart.bind(this));
        $(document).on("mousewheel", this.scrollState.bind(this));
    }

    removeListeners(){
        $(document).off("touchmove");
        $(document).off("touchstart");
        $(document).off("mousewheel");
    }
}