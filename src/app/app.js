import $ from "jquery";
import {Intro} from "./intro/intro";
import {Game} from "./game/game";
import {Timer} from "./game/timer";



$(document).ready(function () {
        let game;
        let timer;

        let Start = new Intro();

        Pace.once('hide', () => {
                game = new Game();
                $(".bg-audio")[0].play();
                $(".scene1").fadeOut( "slow");
                $(".scroll-img").fadeIn("slow", () => {
                        Start.addListeners();
                });
                $(".scene2").fadeIn( "slow");

                let gameStartInterval = setInterval(function () {
                        if(window.gameLoaded && window.gameStart){
                                timer = new Timer({
                                            time: 300,
                                            selector: '.timer',
                                            interval: 1000
                                    });
                                clearInterval(gameStartInterval);
                        }
                }, 100);
        });

        $('.btn-next').on("click", ()=>{
                window.gameStart = true;
                // THREEx.FullScreen.request($('.game canvas')[0]);
                Start.removeListeners();
                $('.btn-next').off("click");
                $('.game').fadeIn(2000);
                $(".bg-audio")[0].pause();
                $(".bg-audio")[0].currentTime = 0;
        });


        $('.btn-vr').on('click', function(){
                $('.btn-vr').text(game.renderer.mode);
                if(game.renderer.mode === 'normal'){
                        game.renderer.mode = 'vr';
                        THREEx.FullScreen.request($('.game canvas')[0]);
                } else {
                        game.renderer.mode = 'normal';
                }
                game.renderer.resize();
        });
        
        

});


