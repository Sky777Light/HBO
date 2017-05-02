import $ from "jquery";
import {Intro} from "./intro/intro";
import {Game} from "./game/game";
import {Timer} from "./game/timer";



$(document).ready(function () {
        let game;
        let timer;
        // let audio = document.getElementById('bg-audio');
        //
        // let Start = new Intro();
        //
        // $("#bg-audio").click(function () {
        //         audio.play();
        // });
        // //audio start on click on mobile devices
        // function startAudio(){
        //         audio.play();
        //         if(audio.currentTime <= 0){
        //                 audio.play();
        //                 window.removeEventListener("click", startAudio, false);
        //         } else {
        //                 window.removeEventListener("click", startAudio, false);
        //         }
        // }

        // Pace.once('hide', () => {
                game = new Game();
                // audio.play();
                // window.addEventListener("click", startAudio, false);
                //
                // $(".scene1").fadeOut( "slow");
                // $(".scroll-img").fadeIn("slow", () => {
                //         Start.addListeners();
                // });
                // $(".scene2").fadeIn( "slow");

                //wait untill textule will load and start the game
                let gameStartInterval = setInterval(function () {
                        if(window.gameLoaded && window.gameStart){
                                timer = new Timer({
                                        time: 360,
                                        selector: '.timer',
                                        interval: 1000,
                                        update: (hour, min, sec) => {
                                                let string = min + ':' + sec;
                                                $('.timer').text(string);
                                                if (min <= 0) {
                                                        $('.timer').css({
                                                                "color": "red"
                                                        });
                                                }
                                        },
                                        endTime: ()=> {}
                                });
                                clearInterval(gameStartInterval);
                        }
                }, 100);
        // });


        //start the game

        // $('.btn-next').on("click", ()=>{
        //         audio.currentTime = 0;
        //         audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';
        //         audio.pause();

                window.gameStart = true;
                game.sceneVideo.play();
                // Start.removeListeners();
                $('.game').fadeIn(2000);
        //
        //         $('.btn-next').off("click");
        // });

        $('.btn-vr').on('click', function(){

                $('.btn-vr').text(game.renderer.mode);

                if(game.renderer.mode === 'normal'){
                        $('.timer2').css({"display": "block"});
                        game.renderer.mode = 'vr';
                        THREEx.FullScreen.request($('.game')[0]);
                } else {
                        $('.timer2').css({"display": "none"});
                        game.renderer.mode = 'normal';
                }

                game.renderer.resize();
        });

        

});


