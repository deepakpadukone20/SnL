var snakes  = {
    44:16,
    54:11,
    98:24
}
var ladder = {
    53:93,
    38:95,
    9:78,
    5:45
}
var MAX_PLAYERS = 4;
$(function(){
var Game = function(){
    this.currentPlayer = -1;
    var self = this;
    var rollDice = function(){
        var ran = Math.ceil(Math.random()*100)%7 ||1;
        
        var options =
        {
            priority :  "info",
            title    :  "Player "+(self.board.currentPlayer+1) + " scored" || null,
            message  :  ran
        };
        $.toaster(options);
        return ran;
    }
    var init = function(){
        var container = $(".board");
        container.empty();
        self.board = new Board(container,MAX_PLAYERS); 
    }
    this.play = function(player){
        player = (self.currentPlayer+1)%MAX_PLAYERS
        self.board.currentPlayer = player;
        self.currentPlayer = player;
        var val = rollDice();
        if(val == 6){
            val += rollDice();
        }
        if(val == 6){
            val += rollDice();
        }
        var value = self.board.getPegValue(val);
        var options =
        {
            priority :  null,
            title    : "Score" || null,
            message  : value
        };

        value = compute(value);

        self.board.movePeg(value);
    }   
    var compute = function(v){
        if(snakes[v]){
            var options =
            {
                priority :  "danger",
                title    :  "Player "+(self.board.currentPlayer+1) + " bit by snake" || null,
                message  :  "from "+v+" to "+snakes[v]
            };
            $.toaster(options);
        }
        if(ladder[v] ){
            var options =
            {
                priority :  null,
                title    :  "Player "+(self.board.currentPlayer+1) + " got a ladder "  || null,
                message  :  "from "+v+" to "+ladder[v]
            };
            $.toaster(options);
        }
        return snakes[v] || ladder[v] || v;
    }
    this.destroy = function(){
        $.toaster.reset();
    }
    
    init();
}
var game;
$("button.dice").on('click',function(){
    game && game.play && game.play();
});

$(".new-game").on('click',function(){
    game && game.destroy();
    game = new Game();
})
});

