$(function(){
    var cellTemplate="<li class='cell cell-{{index}} col col-lg-1 col-1 col-sm-1'>{{index}}</li>";
    var pegTemplate = "<a id='peg' class='peg' href='#'></a>";
    var Board =  function(parent,MAX_PLAYERS){
        this.Peg = [];
        this.container = $("<ul class='col-md-12 '></ul>").appendTo(parent);
        this.cells = {};
        this.init =function(){
            for(var i=100;i>0;i--){
                this.cells[i] = new Cell(this.container,i,this.cells[i+1]);
            }
        }
        this.init();   
        for(var i=0;i<MAX_PLAYERS;i++){
            this.Peg[i] = new Peg(this.cells[1],i);
        }
        
        this.getPegValue = function(v){
            var val = this.Peg[this.currentPlayer].getCurrentValue() + v;
            return val;
        }
        this.movePeg = function(val){
            this.Peg[this.currentPlayer].move($(".cell-"+val));
        }
    }
    var Cell = function(container,index,prev) {
        this.container = container;
        this.index = index;
        this.prev = prev;
        this.actionLink = null;
        this.body = null;
        this.create = function(){
            this.body = $(cellTemplate.replace(/{{index}}/ig,index)).appendTo(this.container);
            this.body.data('value',index);
        };
        this.create();
    }
    var Peg = function(container,i){
        this.container = container.body;
        this.init= function(){
            this.peg = $(pegTemplate).appendTo(this.container);
            this.peg.html(i+1)
            this.peg.css("background-color",'#'+Math.random().toString(16).slice(-3))
        }
        this.init();
        this.getCurrentValue = function(){
            return Number(this.peg.parent().data("value"));
        };
        this.move = function(container){
           var peg =  this.peg.detach();
           peg.removeClass("animated lightSpeedIn");
           peg.animate({ "display": "inline-block" }, "fast" ,function(){
               peg.appendTo(container)
               peg.addClass("animated lightSpeedIn");
           });
           
        }
    }
    
    window.Board = Board;
    
});