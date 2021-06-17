class Food{
    constructor(){
        this.foodStock
        this.lastFed
        this.image=loadImage("images/Milk.png");
        this.milkBottle = false;
    }
    getFoodStock(){
        database.ref('food').on("value",function(data){
            foods = data.val();
        })
    }
    updateFoodStock(){
        database.ref('/').update({
            food:foods-1
        });
        fedTime = hour();
        database.ref('/').update({
            hour: fedTime
        });
    }
    deductFood(){
        database.ref('/').update({
            food:foods-1
        });
    }
    display(){
        var x = 50, y = 120;
        imageMode(CENTER);
        if (this.milkBottle){
            image(this.image,90,height-height/4,70,70);
        }
        if (this.foods !== 0){
            for (var i = 0 ; i < foods ;i++){
                if (i%10 === 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,500);
    }
    washroom(){
        background(washroom,550,500);
    }
    garden(){
        background(garden,550,500);
    }
}