import $ from "jquery";
import {Intro} from "./intro/intro";
import {Game} from "./game/game";
import {Timer} from "./game/timer";
import {preLoader} from "./game/preLoader";



$(document).ready(function () {
        let game, gameLoaded = false, gameStart = false;
        let bgAudio = document.getElementById('bg-audio');
        let sceneAudio = document.getElementById('audio');

        let Start = new Intro();


        $(".preload>.btn-next").click(function () {
                bgAudio.play();
                $('.loader').css('display', 'flex');
                $('.logo').css('display', 'block');
                $('.preload').css('display', 'none');
                window.paceStart();

                Pace.once('hide', () => {
                        $(".scene1").fadeOut( 2000, function () {
                                new preLoader((textures, video)=>{
                                        game = new Game(textures, video, sceneAudio, bgAudio);
                                        gameLoaded = true;
                                });

                                //wait untill textule will load and start the game
                                let gameStartInterval = setInterval(function () {
                                        if(gameLoaded && gameStart){
                                                game.sceneAudio.children[0].src = './assets/audio/city.mp3';
                                                game.sceneAudio.load();
                                                game.sceneAudio.play();

                                                game.timer = new Timer({
                                                        time: 240,
                                                        selector: '.timer',
                                                        interval: 1000,
                                                        update: (hour, min, sec) => {
                                                                let string = min + ':' + sec;
                                                                $('.timer').text(string);
                                                                if (min <= 0) {
                                                                        $('.timer').css({"color": "red"});
                                                                        if(game.bgAudio.paused){
                                                                                game.bgAudio.currentTime = 0;
                                                                                game.bgAudio.children[0].src = './assets/audio/GameMusic.mp3';
                                                                                game.bgAudio.load();
                                                                                game.bgAudio.play();
                                                                        }
                                                                }
                                                        },
                                                        endTime: ()=> {
                                                                game.bgAudio.pause();
                                                                game.gameLose();
                                                        }
                                                });
                                                clearInterval(gameStartInterval);
                                        }
                                }, 100);
                        });
                        $(".scroll-img").fadeIn("slow", () => {Start.addListeners();});
                        $(".scene2").fadeIn( "slow");

                });
        });


        
//start the game
        $('.game-start').on("click", ()=>{
                bgAudio.loop = false;
                bgAudio.currentTime = 0;
                if(!bgAudio.paused){
                        bgAudio.pause();
                } else {
                        bgAudio.children[0].src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';
                        bgAudio.load();
                        bgAudio.play();
                }

                sceneAudio.currentTime = 0;
                sceneAudio.children[0].src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';
                sceneAudio.play();
                gameStart = true;
                document.getElementById('video').play();
                Start.removeListeners();
                $('.game').fadeIn(2000);
                THREEx.FullScreen.request($('.game')[0]);

                $('.game-start').off("click");
        });

        $('.btn-vr').on('click', function(){
                if(game.renderer.mode === 'normal'){
                        $('.timer2').css({"display": "block"});
                        game.renderer.mode = 'vr';
                        THREEx.FullScreen.request($('.game')[0]);
                        $('.btn-vr').addClass("vr-active");
                } else {
                        $('.timer2').css({"display": "none"});
                        game.renderer.mode = 'normal';
                        $('.btn-vr').removeClass("vr-active");
                }
                game.renderer.resize();
        });

});


