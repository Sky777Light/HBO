import $ from "jquery";

$(document).ready(function () {
    var canScroll = false;
    var touchStart = 0;
    var presentState = 0;
    var prevState = 0;
    var animations = {
        1: {
            selector:  '.anim1',
            time: 1500,
            delay: 0,
            onEnd: 2
        },
        2: {
            selector:  '.anim2',
            time: 500,
            delay: 0,
            back: {
                selectorHide: '.anim2, .anim1',
                time: 1500,
                moveTo: 0
            }
        },
        3: {
            selector:  '.anim3',
            time: 1500,
            delay: 0,
            onEnd: 4,
            hidePrev: [
                {
                    selector: ".anim2",
                    time: 500,
                    delay: 0
                }
            ]
        },
        4: {
            selector:  '.anim4',
            time: 500,
            delay: 0,
            back: {
                selectorHide: '.anim3, .anim4',
                time: 1500,
                moveTo: 1
            }
        },
        5: {
            selector:  '.anim5',
            time: 1500,
            delay: 0,
            onEnd: 6,
            hidePrev: [
                {
                    selector: ".anim4",
                    time: 500,
                    delay: 0
                }
            ]
        },
        6: {
            selector:  '.anim6',
            time: 500,
            delay: 0,
            back: {
                selectorHide: '.anim6, .anim5',
                time: 1500,
                moveTo: 3
            }
        },
        7: {
            selector:  '.anim7',
            time: 500,
            delay: 1000,
            hidePrev: [
                {
                    selector: ".anim6",
                    time: 500,
                    delay: 0
                },
                {
                    selector: ".anim3, .anim1",
                    time: 1500,
                    delay: 0
                }
            ],
            back: {
                selectorHide: '.anim7',
                selectorShow: '.anim3, .anim1',
                time: 1500,
                moveTo: 5
            }
        },
        8: {
            selector:  '.anim8',
            time: 500,
            delay: 1000,
            hidePrev: [
                {
                    selector: ".anim7",
                    time: 500,
                    delay: 0
                },
                {
                    selector: ".changed-bg, .dark-cont ",
                    time: 1500,
                    delay: 0
                },
                {
                    selector: ".tunnel",
                    time: 1500,
                    delay: 0,
                    fadeTo: 0.2
                }
            ],
            back: {
                selectorHide: '.anim8',
                selectorShow: '.changed-bg, .dark-cont ',
                fadeTo: {
                    selector: '.tunnel',
                    time: 1500,
                    fadeTo: 0.5
                },
                time: 1500,
                moveTo: 7
            }
        },
        9: {
            selector:  '.anim9',
            time: 1500,
            delay: 0,
            onEnd: 10,
            hidePrev: [
                {
                    selector: ".anim8",
                    time: 500,
                    delay: 0
                }
            ]
        },
        10: {
            selector:  '.anim10',
            time: 500,
            delay: 0,
            back: {
                selectorHide: '.anim9, .anim10',
                time: 500,
                moveTo: 8
            }
        },
        11: {
            selector:  '.anim11',
            time: 500,
            delay: 0,
            back: {
                selectorHide: '.anim11',
                time: 500,
                moveTo: 10
            }
        },
        12: {
            selector:  '.anim12',
            time: 500,
            delay: 0,
            back: {
                selectorHide: '.anim12',
                time:500,
                moveTo: 11
            }
        }
    };

    //for mobile devices
    function setTouchStart(e) {
        touchStart = e.originalEvent.touches[0].clientY || e.originalEvent.touches[0].pageY;
    }

    function scrollState(e) {
        e.preventDefault();
        if(canScroll){
            var newState = presentState;
            if(e.originalEvent.deltaY){
                newState += e.originalEvent.deltaY > 0 ? 1 : -1;
            } else {
                var touchEnd = e.originalEvent.touches[0].clientY || e.originalEvent.touches[0].pageY;
                newState += touchStart - touchEnd > 0 ? 1 : -1;
            }

            if(newState < 0 || newState > Object.keys(animations).length) {
                return;
            } else {
                canScroll = false;
                prevState = presentState;
                presentState = newState;
                animHelper(presentState, prevState)();
            }

        }
    }

    function moveStraight(pres) {
        var nextAnim = animations[pres].onEnd ? animHelper(animations[pres].onEnd, -1) : null;

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

        if(!animations[pres].onEnd){
            setTimeout(function () {
                canScroll = true;
            }, animations[pres].time + animations[pres].delay);
        }

        presentState = pres;

    }

    function moveBack(prev) {
        var nextAnim = animHelper(animations[prev].back.moveTo, -1);

        $(animations[prev].back.selectorHide).fadeOut(animations[prev].back.time, nextAnim);
        if(animations[prev].back.selectorShow){
            $(animations[prev].back.selectorShow).fadeIn(1000, null);
        }
        if(animations[prev].back.fadeTo){
            $(animations[prev].back.fadeTo.selector).fadeTo(animations[prev].back.fadeTo.time, animations[prev].back.fadeTo.fadeTo, null);
        }
    }

    function animHelper(pres, prev) {
        return function () {
            if(pres > 0){
                if(pres > prev){
                    moveStraight(pres);
                } else {
                    moveBack(prev);
                }
            } else {
                presentState = 0;
                canScroll = true;
            }
        };

    }




    Pace.on('hide', function () {
        // $(".bg-audio").trigger("play");
        $(".scene1").fadeOut( "slow");
        $(".scroll-img").fadeIn("slow", function () {
            canScroll = true;
        });
        $(".scene2").fadeIn( "slow");
    });

    $(document).on("touchmove", scrollState);
    $(document).on("touchstart", setTouchStart);
    $(document).on("mousewheel", scrollState);
});


