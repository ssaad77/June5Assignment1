const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    PLAY: Symbol("play"),
    ANSWER: Symbol("answer"),
    CHECK: Symbol("check"),
    QUIT: Symbol("quit"),
});
const choices = ["car", "banana", "plane","computer", "watermelon", "mobile", "tv", "train", "bicycle", "microwave"];
const car = ["Has four wheels ?", "has steering wheel ?", "has a hood ?"];
const banana = ["Fruit grow in a bunch ?", "Fruit started green and then turned to yellow ?",
                "fruit yellow or Black and yellow color ?"];
const plane = ["Has wheels between 5-16 ?", "it's speed between 260-890 km ?", "has a Tail ?"];
const computer = ["Has a screen ?", "has a lot of key ?", "has an operating system ?"];
const watermelon = ["Fruit with green color from outside ?", "fruit with a red color from inside ?", "fruit with or without seeds ?"];
const mobile = ["Has a tiny keyboard ?", "has a flash ?", "you can talk with it ?"];
const tv = ["Has a remote control ?", "has a channels ?", "has a square chape ?"];
const train = ["a safe transport mean ?", "fast public transport ?", "public transport between cities ?"];
const bicycle = ["Has two wheels ?", "has steering ?", "it's speed between 5 - 130 km ?"];
const microwave = ["heat's up food ?", "Home device square shape ?", "Home device Had a timer ?"];

module.exports = class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.whichObject = 0;
        this.numCorrectAnswer = 0;
        this.numIncorrectAnswer = 0;
        this.totalAnswer = 0;
    }   
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "Hi, you have 3 clues for each question ,"+
                " after each incorrect answer type go,"+
                "let's have some fun!!" +"How about I SPY !!, type Go";
                this.stateCur = GameState.PLAY;
                break;
            case GameState.PLAY:
                const nChoice = Math.floor(Math.random() * car.length);
                if (this.whichObject == 0){
                    sReply = car[nChoice];
                }
                else if(this.whichObject == 1){
                    sReply = banana[nChoice];
                }
                else if(this.whichObject == 2){
                    sReply = plane[nChoice];
                }
                else if(this.whichObject == 3){
                    sReply = computer[nChoice];
                }
                else if(this.whichObject == 4){
                    sReply = watermelon[nChoice];
                }
                else if(this.whichObject == 5){
                    sReply = mobile[nChoice];
                }
                else if(this.whichObject == 6){
                    sReply = tv[nChoice];
                }
                else if(this.whichObject == 7){
                    sReply = train[nChoice];
                }
                else if(this.whichObject == 8){
                    sReply = bicycle[nChoice];
                }
                else if(this.whichObject == 9){
                    sReply = microwave[nChoice];
                }
                this.stateCur = GameState.ANSWER;
                break;
            case GameState.ANSWER:
                var trueAnswer = 0
                if(sInput.toLowerCase() == (choices[this.whichObject])){
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
                var totalAnswer = 0
                if(sInput.toLowerCase() == ("y")){
                    sReply = " glad you want to play more :) \n type Go";
                    this.stateCur = GameState.PLAY;
                }
                else if(sInput.toLowerCase() == ("n")){
                    totalAnswer =(this.numCorrectAnswer + this.numIncorrectAnswer);
                    sReply = "Sorry to see you leave :( \n you have answer " 
                    + this.numCorrectAnswer+ "correct answers, and "
                    +this.numIncorrectAnswer + " incorrect answers ,"
                    + "your percentage is "+" "+
                   ((this.numCorrectAnswer * 100) / totalAnswer).toFixed(2) +" "+ "%";
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