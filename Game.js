const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    PLAY: Symbol("play"),
    ANSWER: Symbol("answer"),
    CHECK: Symbol("check"),
    QUIT: Symbol("quit"),
});
const choices = ["car", "plane","computer", "mobile", "tv", "train", "house"];
const car = ["Has four wheels", "has steering wheel", "has a hood"];
const plane = ["Has wheels between 5-16", "has speed between 260-890 km", "has a Tail"];
const computer = ["Has a screen", "has a lot of key", "has an operating system"];
const mobile = ["Has a tiny keyboard", "has a flash", "has a timer"];
const tv = ["Has a remote control", "has a channels ", "has a square chape"];
const train = ["safe transport mean", "fast transport", "has a hood"];
const  house = ["Has four wheels", "has steering wheel", "has a hood"];

module.exports = class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.whichObject = 0;
        this.numCorrectAnswer = 0;
        this.numIncorrectAnswer = 0;
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "Hi, let's have some fun!! How about I SPY!!,type Go ";
                this.stateCur = GameState.PLAY;
                break;
            case GameState.PLAY:
                const nChoice = Math.floor(Math.random() * car.length);
                if (this.whichObject == 0){
                    sReply = car[nChoice];
                }
                else if(this.whichObject == 1){
                    sReply = plane[nChoice];
                }
                else if(this.whichObject == 2){
                    sReply = computer[nChoice];
                }
                else if(this.whichObject == 3){
                    sReply = mobile[nChoice];
                }
                else if(this.whichObject == 4){
                    sReply = tv[nChoice];
                }
                else if(this.whichObject == 5){
                    sReply = train[nChoice];
                }
                else if(this.whichObject == 6){
                    sReply = house[nChoice];
                }
                this.stateCur = GameState.ANSWER;
                break;
            case GameState.ANSWER:
                var trueAnswer = 0
                if(sInput.toLowerCase().match(choices[this.whichObject])){
                    trueAnswer = 1;
                }
                else{
                    trueAnswer = 0
                }
                if(trueAnswer == 1){
                    sReply = "Hurrrray, right ANSWER!! Do you Want to Play again? Y/N";
                    this.numCorrectAnswer += 1;
                    this.whichObject = (this.whichObject + 1) % choices.length ;
                    this.stateCur = GameState.CHECK;
                }
                if(trueAnswer == 0){
                    sReply = "Wrong Answer";
                    this.numIncorrectAnswer += 1;

                    this.stateCur = GameState.PLAY;
                }
                break;
            case GameState.CHECK:
                if(sInput.toLowerCase().match("y")){
                    sReply = " glad you want to play more :) \n type Go";
                    this.stateCur = GameState.PLAY;
                }
                else if(sInput.toLowerCase().match("n")){
                    sReply = "Sorry to see you leave :( \n you have answer " +this.numCorrectAnswer
                    + " correct answers, and " +this.numIncorrectAnswer + " incorrect answers";
                   this.stateCur = GameState.Quit;
                   
                break;
                } 
                break;
            case GameState.QUIT:
                sReply = "disabled"
                this.stateCur = GameState.Quit 
                     
        }
        return([sReply]);    
    }
}