const animations = {
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

export default animations;