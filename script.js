var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
var scene;

{
    var clicked = false;
    var hover = false;
    var keys = [];
    keyPressed = function () {
        keys[keyCode] = true;
    };
    keyReleased = function () {
        keys[keyCode] = false;
    };
    mouseClicked = function () {
        clicked = true;
    };
}

var ToggleButton = function(config) {
    this.x = config.x || 300;
    this.y = config.y || 300;
    this.w = config.w || 50;
    this.x2 = this.x + this.w;
    this.px = this.x;
    this.size = config.size || 48;
    this.on = config.on || false;
    this.active = this.false;
    this.onColor = color(147, 207, 123);
    this.offColor = color(252, 141, 114);
    this.color = this.on ? this.onColor : this.offColor;
    this.offTextColor = color(242, 242, 242, 200);
    this.onTextColor = color(242, 242, 242, 200);
    this.onOutlineColor = color(242, 242, 242, 200);
    this.offOutlineColor = color(179, 179, 179, 50);
    this.outlineColor = this.on ? this.onOutlineColor : this.offOutlineColor;
    this.hoverColor = color(50, 50);
    this.func = config.func || function() {};
    
    this.toggle = function() {
        this.on = !this.on;
        scene.sound = !scene.sound;
        this.color = this.on ? this.onColor : this.offColor;
        this.outlineColor = this.on ? this.onOutlineColor : this.offOutlineColor;
        this.active = true;
    };
    this.draw = function() {
        if (dist(mouseX, mouseY, this.x, this.y) <= this.size / 2 ||
            dist(mouseX, mouseY, this.x2, this.y) <= this.size / 2 ||
            (
                mouseX > this.x && 
                mouseX < this.x + this.w && 
                mouseY > this.y - this.size / 2 && 
                mouseY < this.y + this.size / 2)) {
                    
            hover = true;
            
            if(clicked) {
                this.toggle();
                this.func();
            }
        }
        
        if(this.active) {
            if(this.on) {
                this.px = lerp(this.px, this.x2, 0.2);

                if(round(this.px) === this.x2) {
                    this.px = this.x2;
                    this.active = false;
                }
            }
            else {
                this.px = lerp(this.px, this.x, 0.2);

                if(round(this.px) === this.x) {
                    this.px = this.x;
                    this.active = false;
                }
            }
        }
        
        pushStyle();
            noStroke();
            fill(this.color);
    
            ellipse(this.x, this.y, this.size * 1.1, this.size * 1.1);
            ellipse(this.x + this.w, this.y, this.size * 1.1, this.size * 1.1);
            rect(this.x, this.y - (this.size * 1.1 * 0.5), this.w, this.size * 1.11);
            
            fill(this.onTextColor);
            textAlign(CENTER, CENTER);
            textSize(this.size * 0.35);
            text("ON", this.x, this.y);
            fill(this.offTextColor);
            text("OFF", this.x + this.w, this.y);
            
            fill(235);
            stroke(this.outlineColor);
            strokeWeight(2);
            ellipse(this.px, this.y, this.size, this.size);
            
            noStroke();
            fill(this.color);
            triangle(this.px, this.y - this.size * 0.3, this.px, this.y + this.size * 0.3, this.px - this.size * 0.3, this.y);
            rect(this.px - this.size * 0.3, this.y - this.size * 0.1, this.size * 0.3, this.size * 0.2);
            if(scene.sound) {
                noFill();
                stroke(this.color);
                strokeWeight(this.size/20);
                arc(this.px + this.size * 0.1, this.y, this.size * 0.2, this.size * 0.2, radians(-91), radians(90));
                arc(this.px + this.size * 0.1, this.y, this.size * 0.4, this.size * 0.4, radians(-81), radians(80));
            }
            else {
                noFill();
                stroke(this.color);
                strokeWeight(this.size/20);
                line(this.px + this.size * 0.1, this.y - this.size * 0.1, this.px + this.size * 0.25, this.y + this.size * 0.1);
                line(this.px + this.size * 0.1, this.y + this.size * 0.1, this.px + this.size * 0.25, this.y - this.size * 0.1);
            }
        popStyle();
    };
};
var Button = function (config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.size = config.size || 100;
    this.content = config.content || "Home";
    this.on = config.on || false;
    this.onColor = color(147, 207, 123);
    this.offColor = color(252, 141, 114);
    this.color = this.on ? this.onColor : this.offColor;
    this.offTextColor = color(242, 242, 242, 200);
    this.onTextColor = color(242, 242, 242, 200);
    this.onOutlineColor = color(242, 242, 242, 200);
    this.offOutlineColor = color(179, 179, 179, 50);
    this.outlineColor = this.on ? this.onOutlineColor : this.offOutlineColor;
    this.func = config.func || function() {};
    
    this.draw = function () {
        if (dist(mouseX, mouseY, this.x, this.y) <= this.size / 2) {
            hover = true;
            if (clicked) {
                this.on = !this.on;
                this.color = this.on ? this.onColor : this.offColor;
                this.outlineColor = this.on ? this.onOutlineColor : this.offOutlineColor;
                this.func();
            }
        }
        
        pushStyle();
            textAlign(CENTER, CENTER);
            textSize(this.textSize);
            noStroke();
            fill(this.color);
            stroke(this.outlineColor);
            noStroke();
            ellipse(this.x, this.y, this.size, this.size);
            fill(this.textColor);
            switch(this.content) {
                case "How":
                    pushStyle();
                        textSize(this.size*0.3);
                        text(":)", this.x, this.y);
                    popStyle();
                    break;
                default:
                    textSize(this.size*0.5);
                    text(this.content, this.x, this.y);
            }
        popStyle();
    };
};

var Ship = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.vx = config.vx || 0;
    this.vy = config.vy || 0;
    this.px = this.x;
    this.py = this.y;
    this.gravity = this.gravity || 15;
    this.angle = config.angle || 0;
    this.collision = false;
    this.landed = true;
    this.drop = 0;
    this.idle = true;
};
Ship.new = function(config) {
    var obj = Object.create(Ship.prototype);
    Ship.apply(obj, arguments);
    return obj;
};
Ship.prototype.drawShip = function() {
    noStroke();
    
    fill(212, 182, 160);
    fill(189, 164, 149);
    beginShape();
        vertex(208, 344);
        vertex(360, 383);
        vertex(265, 307);
    endShape(CLOSE);
    fill(165, 146, 130);
    beginShape();
        vertex(265, 307);
        vertex(330, 312);
        vertex(360, 383);
    endShape(CLOSE);
    fill(143, 141, 143);
    beginShape();
        vertex(208, 344);
        vertex(360, 383);
        vertex(360, 386);
        vertex(208, 347);
    endShape(CLOSE);

    fill(154, 136, 125);
    beginShape();
        vertex(245, 318);
        vertex(257, 325);
        vertex(302, 313);
        vertex(284, 306);
    endShape(CLOSE);
    fill(84, 80, 80);
    beginShape();
        vertex(302, 312);
        vertex(302, 318);
        vertex(295, 320);
        vertex(281, 319);
        vertex(270, 327);
        vertex(257, 331);
        vertex(257, 325);
    endShape(CLOSE);
    fill(100, 100, 100);
    beginShape();
        vertex(257, 325);
        vertex(257, 331);
        vertex(245, 323);
        vertex(245, 318);
    endShape(CLOSE);

    fill(154, 136, 125);
    beginShape();
        vertex(257, 317);
        vertex(291, 308);
        vertex(279, 304);
        vertex(248, 313);
    endShape(CLOSE);
    fill(100, 100, 100);
    beginShape();
        vertex(257, 317);
        vertex(257, 322);
        vertex(248, 317);
        vertex(248, 313);
    endShape(CLOSE);
    fill(84, 80, 80);
    beginShape();
        vertex(257, 317);
        vertex(256, 321);
        vertex(292, 312);
        vertex(291, 308);
    endShape(CLOSE);
    
    fill(74, 70, 70);
    beginShape();
        vertex(272, 308);
        vertex(271, 299);
        vertex(258, 303);
        vertex(259, 312);
    endShape(CLOSE);
    fill(74, 70, 70);
    beginShape();
        vertex(258, 296);
        vertex(268, 293);
        vertex(278, 293);
        vertex(279, 297);
        vertex(265, 303);
        vertex(250, 306);
        vertex(249, 301);
    endShape(CLOSE);
};
Ship.prototype.update = function() {
    this.x+= this.vx;
    this.y = constrain(this.y + this.vy + this.gravity, 100, this.py);
    
    if(!this.collision && this.y === this.py) {
        this.collision = true;
    }
    
    this.vx = 0;
    this.vy = 0;
};
Ship.prototype.draw = function() {
    pushMatrix();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        rotate(radians(this.angle));
        image(scene.images.ship, -this.w / 2, -this.h / 2);
    popMatrix();
};
Ship.prototype.go = function() {
    this.draw();
    this.update();
};

var Dust = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.diameter = config.diameter || random(2, 4);
    this.vx = config.vx || 0;
    this.vy = config.vy || 0;
    this.px = this.x;
    this.py = this.y;
    this.gravity = this.gravity || 4;
    this.color = config.color || color(random(170, 190), random(135, 155), random(95, 115));
};
Dust.new = function(config) {
    var obj = Object.create(Dust.prototype);
    Dust.apply(obj, arguments);
    return obj;
};
Dust.prototype.update = function() {
    this.x+= this.vx;
    this.y = constrain(this.y + this.vy + this.gravity, 100, this.py);
    this.vx = 0;
    this.vy = 0;
};
Dust.prototype.draw = function() {
    pushMatrix();
        translate(this.x, this.y);
        noStroke();
        fill(this.color);
        ellipse(0, 0, this.diameter, this.diameter);
    popMatrix();
};
Dust.prototype.go = function() {
    this.draw();
    this.update();
};

var Rock = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.w = config.w;
    this.h = config.h;
    this.vx = config.vx || 0;
    this.vy = config.vy || 0;
    this.px = this.x;
    this.py = this.y;
    this.gravity = this.gravity || 20;
    this.angle = config.angle || 0;
};
Rock.new = function(config) {
    var obj = Object.create(Rock.prototype);
    Rock.apply(obj, arguments);
    return obj;
};
Rock.prototype.update = function() {
    this.x+= this.vx;
    this.y = constrain(this.y + this.vy + this.gravity, 100, this.py);
    
    this.vx = 0;
    this.vy = 0;
};
Rock.prototype.draw = function() {
    pushMatrix();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        noStroke();
        fill(176, 171, 121, 150);
        ellipse(0, 0, this.w, this.h);
    popMatrix();
};
Rock.prototype.go = function() {
    this.draw();
    this.update();
};

var BabyYoda = function(config) {
    this.xOffset = 0;
    this.yOffset = 0;
    this.eye_offset = 0;
    this.blink = false;
    this.blinkTimer = 0;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 80;
    this.scale = 0.85;
    this.colors = {
        green: color(147, 207, 123),
        lightBrown: color(198, 159, 88),
        darkBrown: color(166, 132, 76),
        darkerBrown: color(136, 109, 59),
        black: color(60, 60, 50),
        white: color(234, 234, 229),
        offGreen: color(127, 150, 88),
        shadow: color(100, 30)
    };
    this.sleep = false;
    this.idle = false;
    this.eyeClose = 0;
    this.mx = 0;
    this.my = 0;
    this.force = false;
    
    this.useTheForce = function(force) {
        this.force = force;
        if(force) {
            this.blink = false;
            this.colors.white = color(
                lerp(red(this.colors.white), 191, 0.1), 
                lerp(green(this.colors.white), 191, 0.1), 
                lerp(blue(this.colors.white), 187, 0.1));
        }
        else {
            this.colors.white = color(
                lerp(red(this.colors.white), 234, 0.1), 
                lerp(green(this.colors.white), 234, 0.1), 
                lerp(blue(this.colors.white), 229, 0.1));
        }
    };
    this.move = function() {
        this.xOffset = map(this.mx, 0, width, -10, 10);
        this.yOffset = map(this.my, 0, height, -10, 0);
        
        this.scale = lerp(this.scale, map(this.dy, 0, 100, 0.5, 1), 0.02);
        
        this.x = lerp(this.x, this.dx, 0.02);
        this.y = lerp(this.y, this.dy, 0.02);
    };
    this.drawLeftEar = function() {
        noStroke();
        
        pushMatrix();
            translate(-abs(sin(radians(this.xOffset * 1.2)) * 60), -this.yOffset / 2);
        
            fill(this.colors.green);
            beginShape();
                vertex(356, 282);
                bezierVertex(378, 278, 392, 277, 406, 278);
                bezierVertex(418, 278, 436, 275, 451, 274);
                bezierVertex(467, 275, 481, 277, 490, 279);
                bezierVertex(474, 287, 458, 292, 448, 299);
                bezierVertex(440, 310, 433, 320, 420, 330);
                bezierVertex(407, 336, 393, 338, 367, 337);
            endShape(CLOSE);
            
            fill(50, 30);
            beginShape();
                vertex(379, 319);
                bezierVertex(379, 313, 378, 310, 376, 299);
                bezierVertex(375, 295, 381, 289, 396, 285);
                bezierVertex(414, 283, 426, 281, 439, 280);
                bezierVertex(449, 280, 461, 280, 473, 280);
                bezierVertex(458, 286, 437, 294, 426, 301);
                bezierVertex(408, 309, 389, 317, 379, 321);
            endShape(CLOSE);
        
        popMatrix();
    };
    this.drawRightEar = function() {
        noStroke();
        pushMatrix();
            translate(abs(sin(radians(this.xOffset * 1.2)) * 60), -this.yOffset / 2);

            fill(this.colors.green);
            beginShape();
                vertex(226, 338);
                bezierVertex(208, 338, 198, 339, 191, 336);
                bezierVertex(181, 330, 172, 322, 165, 315);
                bezierVertex(158, 307, 152, 299, 142, 293);
                bezierVertex(130, 289, 118, 286, 107, 280);
                bezierVertex(122, 276, 147, 274, 168, 276);
                bezierVertex(185, 278, 196, 277, 209, 277);
                bezierVertex(218, 278, 225, 279, 242, 281);
            endShape(CLOSE);
            
            fill(50, 30);
            beginShape();
                vertex(215, 319);
                bezierVertex(214, 313, 217, 309, 216, 305);
                bezierVertex(220, 293, 219, 290, 204, 285);
                bezierVertex(185, 283, 169, 281, 156, 280);
                bezierVertex(146, 279, 132, 279, 121, 280);
                bezierVertex(135, 285, 151, 291, 168, 300);
                bezierVertex(186, 310, 200, 319, 215, 320);
            endShape(CLOSE);
        popMatrix();
    };
    this.drawLeftArm = function() {
        noStroke();
        pushMatrix();
            translate(-abs(sin(radians(this.xOffset * 1.2)) * 30), -this.yOffset / 2);
            
            if(this.force) {
                translate(378, 362);
                rotate(radians(7));
                translate(-378, -362);
            }
            
            fill(this.colors.green);
            beginShape();
                vertex(412, 419);
                vertex(413, 431);
                vertex(410, 432);
                vertex(407, 419);
            endShape(CLOSE);
            beginShape();
                vertex(404, 421);
                vertex(408, 434);
                vertex(405, 433);
                vertex(401, 422);
            endShape(CLOSE);
            beginShape();
                vertex(400, 424);
                vertex(402, 433);
                vertex(399, 432);
                vertex(396, 424);
            endShape(CLOSE);
            
            fill(this.colors.darkBrown);
            beginShape();
                vertex(378, 362);
                vertex(419, 419);
                vertex(394, 432);
                vertex(376, 379);
            endShape(CLOSE);
        popMatrix();
    };
    this.drawRightArm = function() {
        noStroke();
        pushMatrix();
            translate(abs(sin(radians(this.xOffset * 1.2)) * 30), -this.yOffset / 2);

            noStroke();
            fill(this.colors.green);
            beginShape();
                vertex(175, 420);
                vertex(171, 425);
                vertex(170, 436);
                vertex(173, 436);
                vertex(175, 428);
                vertex(180, 421);
            endShape(CLOSE);
            beginShape();
                vertex(181, 423);
                vertex(176, 430);
                vertex(176, 437);
                vertex(178, 437);
                vertex(180, 430);
                vertex(184, 424);
            endShape(CLOSE);
            beginShape();
                vertex(186, 424);
                vertex(183, 430);
                vertex(182, 436);
                vertex(184, 436);
                vertex(186, 432);
                vertex(189, 426);
            endShape(CLOSE);
            
            fill(this.colors.darkBrown);
            beginShape();
                vertex(213, 362);
                vertex(172, 420);
                vertex(201, 434);
                vertex(215, 370);
            endShape(CLOSE);
            
        popMatrix();
            
    };
    this.draw = function() {
        pushMatrix();
            translate(300 * (1 - this.scale) + this.x, 300 * (1 - this.scale) + this.y);
            scale(this.scale);
        
            noStroke();
            
            fill(this.colors.shadow);
            ellipse(297, 460, 280, 35);

            if(this.xOffset >= 0) {
                this.drawLeftEar();
            }
            else {
                this.drawRightEar();
            }
            
            fill(this.colors.green);
            beginShape();
                vertex(363, 282);
                bezierVertex(385, 301, 380, 337, 371, 354);
                vertex(303, 378);
                vertex(229, 357);
                bezierVertex(221, 351, 219, 342, 217, 336);
                bezierVertex(210, 293, 225, 289, 232, 281);
                bezierVertex(244, 274, 258, 265, 273, 261);
                bezierVertex(292, 256, 305, 258, 322, 261);
                bezierVertex(332, 264, 347, 270, 363, 282);
            endShape(CLOSE);

            if(this.xOffset < 0) {
                this.drawLeftEar();
            }
            else {
                this.drawRightEar();
            }

            pushMatrix();
                translate(this.xOffset * 1.2, this.yOffset);
                
                fill(this.colors.black);
                beginShape();
                    vertex(256, 293);
                    bezierVertex(266, 294, 274, 299, 278, 306);
                    bezierVertex(284, 316, 285, 326, 281, 334);
                    bezierVertex(274, 340, 262, 340, 252, 338);
                    bezierVertex(242, 334, 236, 324, 237, 313);
                    bezierVertex(240, 300, 249, 293, 256, 293);
                endShape(CLOSE);
                
                fill(this.colors.black);
                beginShape();
                    vertex(338, 293);
                    bezierVertex(346, 294, 352, 300, 355, 306);
                    bezierVertex(358, 316, 360, 324, 351, 335);
                    bezierVertex(340, 341, 328, 340, 319, 335);
                    bezierVertex(311, 328, 313, 318, 316, 309);
                    bezierVertex(321, 299, 327, 294, 338, 293);
                endShape(CLOSE);
                
                if(round(this.eyeClose) < 24) {
                    //eyeball - right side
                    fill(this.colors.white);
                    ellipse(252, 308, 19, 19);
                    ellipse(260, 315, 8, 8);
                    
                    //eyeball - left side
                    fill(this.colors.white);
                    ellipse(331, 308, 19, 19);
                    ellipse(339, 315, 8, 8);
                }
                
                //blinking
                if(this.blink === false) {
                    this.blinky = random();
                    if(this.blinky < 0.005) {
                        this.blink = true;
                        this.blinkTimer = 0;
                    }
                }
                else if(this.blinkTimer > 15) {
                    this.blink = false;
                }
                
                if(this.sleep) {
                    this.eyeClose = lerp(this.eyeClose, 24, 0.075);
                    fill(255);
                    fill(this.colors.green);
                    //right eye
                    rect(313, 289, 45, 2 + this.eyeClose);
                    rect(313, 341 - this.eyeClose, 47, 2 + this.eyeClose);
                    //left eye
                    rect(237, 289, 45, 2 + this.eyeClose);
                    rect(237, 341 - this.eyeClose, 47, 2 + this.eyeClose);
                }
                else if(this.blink) {
                    this.blinkTimer++;
                    fill(255);
                    fill(this.colors.green);
                    //right eye
                    rect(313, 289, 45, 2 + abs(sin(radians(this.blinkTimer * 10)) * 25));
                    rect(313, 341 - abs(sin(radians(this.blinkTimer * 10)) * 25), 47, 2 + abs(sin(radians(this.blinkTimer * 10)) * 25));
                    //left eye
                    rect(237, 289, 45, 2 + abs(sin(radians(this.blinkTimer * 10)) * 25));
                    rect(237, 341 - abs(sin(radians(this.blinkTimer * 10)) * 25), 47, 2 + abs(sin(radians(this.blinkTimer * 10)) * 25));
                }
                
                if(this.force) {
                    //eyelids - show only when using the force
                    fill(this.colors.green);
                    beginShape();
                        vertex(318, 302);
                        bezierVertex(330, 295, 344, 298, 356, 305);
                        bezierVertex(348, 288, 332, 285, 319, 300);
                    endShape(CLOSE);
                    
                    beginShape();
                        vertex(239, 304);
                        bezierVertex(249, 296, 260, 295, 276, 298);
                        bezierVertex(269, 289, 251, 286, 239, 304);
                    endShape(CLOSE);
                }
                
                //eyebrow - right side
                fill(this.colors.offGreen);
                beginShape();
                    vertex(281, 292);
                    bezierVertex(272, 284, 266, 282, 255, 282);
                    bezierVertex(249, 284, 243, 288, 239, 292);
                    bezierVertex(244, 289, 251, 286, 257, 285);
                    bezierVertex(265, 285, 273, 288, 281, 292);
                endShape(CLOSE);
                
                //eyebrow - left side
                fill(this.colors.offGreen);
                beginShape();
                    vertex(357, 291);
                    bezierVertex(350, 285, 344, 282, 336, 282);
                    bezierVertex(328, 283, 322, 286, 317, 291);
                    bezierVertex(326, 288, 330, 286, 337, 285);
                    bezierVertex(344, 286, 350, 288, 357, 291);
                endShape(CLOSE);
                
                //forehead wrinkle - left side
                noFill();
                stroke(this.colors.offGreen);
                beginShape();
                    vertex(301, 279);
                    vertex(310, 271);
                    bezierVertex(321, 272, 329, 273, 338, 276);
                endShape();
                
                //forehead wrinkle - right side
                noFill();
                stroke(this.colors.offGreen);
                beginShape();
                    vertex(296, 279);
                    vertex(287, 272);
                    bezierVertex(278, 271, 268, 272, 260, 276);
                endShape();
                
                //nose
                noStroke();
                fill(this.colors.offGreen);
                beginShape();
                    vertex(298, 323);
                    bezierVertex(304, 323, 308, 326, 309, 329);
                    bezierVertex(308, 332, 307, 333, 303, 332);
                    bezierVertex(301, 337, 296, 337, 293, 332);
                    bezierVertex(292, 334, 289, 333, 288, 331);
                    bezierVertex(288, 327, 292, 324, 298, 323);
                endShape(CLOSE);
                
                //mouth - left side
                fill(this.colors.offGreen);
                beginShape();
                    vertex(314, 341);
                    bezierVertex(318, 348, 325, 353, 330, 356);
                    bezierVertex(321, 353, 316, 347, 313, 341);
                endShape(CLOSE);
                //mouth - right side
                fill(this.colors.offGreen);
                beginShape();
                    vertex(284, 342);
                    bezierVertex(281, 348, 275, 353, 268, 356);
                    bezierVertex(274, 351, 279, 346, 284, 342);
                endShape(CLOSE);
                //mouth center
                fill(this.colors.offGreen);
                beginShape();
                    vertex(276, 354);
                    bezierVertex(284, 352, 294, 350, 303, 350);
                    bezierVertex(310, 351, 316, 353, 321, 354);
                    bezierVertex(313, 353, 303, 352, 296, 352);
                    bezierVertex(289, 352, 282, 353, 276, 354);
                endShape(CLOSE);
                //mouth - center - bottom
                noFill();
                stroke(this.colors.offGreen);
                beginShape();
                    vertex(289, 356);
                    bezierVertex(294, 355, 301, 355, 305, 356);
                endShape(CLOSE);
                beginShape();
                    vertex(320, 356);
                    bezierVertex(314, 365, 305, 370, 299, 370);
                    bezierVertex(287, 368, 281, 362, 278, 356);
                endShape();
            
            popMatrix();

            if(this.xOffset >= 0) {
                this.drawLeftArm();
            }
            else {
                this.drawRightArm();
            }

            //clothes - right side
            fill(this.colors.lightBrown);
            beginShape();
                vertex(214, 375);
                bezierVertex(243, 381, 275, 388, 315, 395);
                bezierVertex(317, 417, 316, 444, 316, 461);
                bezierVertex(291, 463, 267, 462, 246, 461);
                bezierVertex(224, 460, 212, 458, 204, 455);
                bezierVertex(196, 448, 200, 437, 204, 418);
                bezierVertex(207, 406, 211, 391, 213, 380);
            endShape(CLOSE);
            
            //clothes (collar) - right side
            fill(this.colors.darkBrown);
            beginShape();
                vertex(213, 377);
                bezierVertex(209, 370, 208, 362, 207, 356);
                bezierVertex(207, 351, 210, 348, 217, 349);
                bezierVertex(239, 356, 266, 364, 298, 373);
                vertex(298, 395);
                bezierVertex(267, 388, 240, 383, 214, 377);
            endShape(CLOSE);

            //clothes - left side
            fill(this.colors.lightBrown);
            beginShape();
                vertex(305, 374);
                bezierVertex(305, 372, 310, 371, 316, 368);
                bezierVertex(332, 363, 351, 358, 366, 353);
                bezierVertex(374, 351, 378, 354, 379, 360);
                bezierVertex(378, 367, 378, 372, 376, 378);
                bezierVertex(382, 396, 389, 416, 394, 432);
                bezierVertex(393, 440, 392, 451, 383, 456);
                bezierVertex(364, 458, 340, 460, 315, 461);
                bezierVertex(317, 439, 316, 424, 305, 374);
            endShape(CLOSE);
            
            //arm - left side
            if(this.xOffset < 0) {
                this.drawLeftArm();
            }
            else {
                this.drawRightArm();
            }
 
            pushMatrix();
                translate(this.xOffset, 0);
                
                //clothes - left side - moveable (shadow)
                fill(this.colors.darkerBrown);
                beginShape();
                    vertex(276, 376);
                    vertex(270, 376);
                    vertex(277, 397);
                    vertex(277, 398);
                    vertex(304, 397);
                    vertex(307, 405);
                    vertex(305, 416);
                    vertex(307, 461);
                    vertex(314, 461);
                    vertex(309, 379);
                endShape(CLOSE);
                
                //clothes - left side - moveable
                fill(this.colors.lightBrown);
                beginShape();
                    vertex(321, 369);
                    vertex(323, 460);
                    bezierVertex(318, 461, 314, 461, 309, 461);
                    bezierVertex(306, 425, 306, 417, 308, 410);
                    bezierVertex(308, 403, 306, 398, 306, 395);
                    bezierVertex(298, 395, 286, 396, 278, 399);
                    bezierVertex(276, 391, 274, 382, 274, 376);
                    bezierVertex(292, 374, 304, 372, 319, 369);
                endShape(CLOSE);
            popMatrix();
            
            // pushMatrix();
            //     translate(abs(sin(this.xOffset * 1.2) * 30), -this.yOffset / 2);
            //     this.lightsaber.go();
            // popMatrix();

        popMatrix();
    };
    this.go = function() {
        this.draw();
        if(!this.sleep) {
            this.move();
        }
    };
};

var Scene = function() {
    this.images = undefined;
    this.imageIndex = 0;
    this.loaded = false;
    this.page = "load";
    this.force = false;
    this.colors = {
        tan: color(245, 215, 166),
        sky: color(20, 20, 20)
    };
    this.rocks = [];
    this.dusts = [];
    this.zzzs = [];
    this.stars = [];
    this.shake = 0;
    this.shakedown = 0.1;
    this.collide = false;
    this.health = 100;
    this.sound = false;
    // this.sounds = {
    //     thud: getSound("retro/hit2"),
    //     force2: getSound("rpg/battle-spell"),
    //     force: getSound("retro/whistle1")
    // };
    this.fonts = {
        body: createFont("Verdana"),
        title: createFont("Trebuchet MS")
    };
    // this.sounds.force.audio.volume = 0.1;
    this.babyYoda = new BabyYoda({});
    this.idle = 0;
    this.idleTime = millis();
    this.idleDelay = 12;
    this.idleSleepCounter = 0;
    this.idleSleepDelay = 5;
    this.showInstructions = false;
    this.howY = -360;
    this.buttonClicked = false;
    // this.soundButton = new ToggleButton({
    //     x: 25,
    //     y: 574,
    //     size: 34,
    //     w: 40,
    //     func: function() {
    //         scene.buttonClicked = true;
    //     }
    // });
    this.howButton = new Button({
        x: 42,
        y: 560,
        content: "How",
        size: 68,
        func: function() {
            scene.showInstructions = !scene.showInstructions;
            scene.buttonClicked = true;
        }
    });
    this.ship = new Ship({
        x: 420, 
        y: 270, 
        w: 170, 
        h: 80,
        px: 420,
        py: 270,
        vx: 0,
        vy: 0,
        gravity: 15
    });
    this.pattern = function(config) {
        background(0, 0);
        var xoff = 0.0, yoff, bright;
        for(var x = config.px; x < config.px + config.w; x++) {
            yoff = 0.0;
            for(var y = config.py; y < config.py + config.h; y++) {
                bright = map(noise(xoff, yoff), 0, 1, config.min, config.max);
                if(bright > 47) {
                    stroke(89, 89, 75);
                }
                else {
                    stroke(config.r - bright, config.g - bright, config.b - bright);
                }
                point(x, y);
                yoff += config.yf;
            }
            xoff += config.xf;
        }
    };
    this.setup = function() {
        this.images = {
            back: function() {
                noStroke();
                for(var i = 0; i <= 300; i++) { 
                    fill(lerpColor(color(20, 20, 20), color(90, 90, 90), i/300));
                    rect(0, i, width, i);
                }

                //stars
                for(var i = 0; i < 50; i++) {
                    var r = random(1, 2);
                    fill(random(200, 255), random(100, 150));
                    ellipse(random(width), random(height / 2), r, r);
                }
                
                //ellipses
                for(var i = 0; i < 10; i++) {
                    var r = random(25, 60);
                    fill(random(200, 225), random(3, 6));
                    ellipse(random(600), random(250), r, r);
                }

                return get (0, 0, width, 300);
            },
            ground: function() {
                noStroke();
                fill(245, 215, 166);
                fill(255);
                rect(0, 300, width, 300);
                var groundShape = get(0, 300, 600, 300);
                scene.pattern({
                   px: 0,
                   py: 300, 
                   w: 600, 
                   h: 300, 
                   r: 245, 
                   g: 215, 
                   b: 165, 
                   xf: 0.035, 
                   yf: 0.16,
                   min: 0,
                   max: 30
                });
                var groundImage = get(0, 300, 600, 300);
                groundImage.mask(groundShape);
                return groundImage;
            },
            groundShip: function() {
                noStroke();
                fill(245, 215, 166);
                fill(255);
                rect(0, 300, width, 300);
                var groundShape = get(0, 300, 600, 300);
                scene.pattern({
                   px: 0,
                   py: 300, 
                   w: 600, 
                   h: 300, 
                   r: 245, 
                   g: 215, 
                   b: 165, 
                   xf: 0.035, 
                   yf: 0.16,
                   min: 0,
                   max: 30
                });
                var groundImage = get(0, 300, 600, 300);
                groundImage.mask(groundShape);
                image(groundImage, 0, 0);
                return get(400, 320, 190, 80);
            },
            ship: function() {
                background(0, 0);
                scene.ship.drawShip();
                return get(205, 290, 156, 96);
            },
            mountains: function() {
                background(0, 0);
                stroke(0);
                fill(255);
                beginShape();
                    vertex(0, 239);
                    vertex(21, 246);
                    vertex(36, 237);
                    vertex(49, 247);
                    vertex(58, 260);
                    vertex(65, 260);
                    vertex(74, 253);
                    vertex(86, 258);
                    vertex(105, 260);
                    vertex(115, 248);
                    vertex(124, 242);
                    vertex(135, 241);
                    vertex(145, 251);
                    vertex(157, 261);
                    vertex(174, 274);
                    vertex(180, 266);
                    vertex(186, 258);
                    vertex(191, 265);
                    vertex(195, 264);
                    vertex(202, 269);
                    vertex(211, 271);
                    vertex(218, 267);
                    vertex(244, 253);
                    vertex(263, 242);
                    vertex(266, 248);
                    vertex(272, 258);
                    vertex(282, 271);
                    vertex(291, 257);
                    vertex(296, 249);
                    vertex(306, 237);
                    vertex(314, 224);
                    vertex(325, 209);
                    vertex(333, 224);
                    vertex(350, 232);
                    vertex(360, 242);
                    vertex(375, 237);
                    vertex(380, 246);
                    vertex(391, 263);
                    vertex(398, 262);
                    vertex(411, 260);
                    vertex(422, 251);
                    vertex(429, 240);
                    vertex(441, 247);
                    vertex(450, 238);
                    vertex(471, 229);
                    vertex(481, 235);
                    vertex(483, 246);
                    vertex(499, 242);
                    vertex(513, 236);
                    vertex(519, 230);
                    vertex(527, 219);
                    vertex(540, 213);
                    vertex(547, 221);
                    vertex(554, 229);
                    vertex(560, 240);
                    vertex(574, 240);
                    vertex(585, 233);
                    vertex(600, 221);
                    vertex(600, 300);
                    vertex(0, 300);
                endShape(CLOSE);
                stroke(140, 125, 87);
                line(282, 271, 261, 300);
                line(174, 274, 192, 300);
                line(58, 260, 83, 300);
                line(560, 240, 585, 300);
                line(391, 263, 410, 300);
                var groundShape = get(0, 200, 600, 200);
                fill(220, 189, 140);
                scene.pattern({
                   px: 0,
                   py: 200, 
                   w: 600, 
                   h: 100, 
                   r: 220, 
                   g: 189, 
                   b: 140, 
                   xf: 0.15, 
                   yf: 0.05,
                   min: 0,
                   max: 80
                });
                var groundImage = get(0, 200, 600, 200);
                groundImage.mask(groundShape);
                return groundImage;
            },
            rock: function() {
                background(0, 0);
                noStroke();
                fill(158, 141, 110);
                beginShape();
                    vertex(34, 1);
                    vertex(74, 1);
                    vertex(85, 17);
                    vertex(96, 25);
                    vertex(100, 46);
                    vertex(93, 63);
                    vertex(99, 76);
                    vertex(91, 86);
                    vertex(78, 94);
                    vertex(64, 99);
                    vertex(48, 93);
                    vertex(29, 97);
                    vertex(18, 89);
                    vertex(3, 76);
                    vertex(1, 51);
                    vertex(5, 31);
                    vertex(10, 9);
                endShape(CLOSE);
                
                return get(0, 0, 100, 100);
            }
        };
        
        //dust around the ship
        for(var i = 0; i < 30; i++) {
            this.dusts.push(Dust.new({
                x: random(390, 590),
                y: random(320, 322)
            }));
        }
    };
    this.setup();
    this.load = function (s) {
        var obj = Object.keys(this.images);
        this.images[obj[this.imageIndex]] = this.images[obj[this.imageIndex]]();
        this.imageIndex++;
        
        background(this.colors.tan);
        pushStyle();
            fill(0, 150);
            textAlign(CENTER, CENTER);
            textSize(40);
            text('LOADING... :)', 300, 250);
            noStroke();
            fill(this.colors.sky, 150);
            rect(width * 0.1, 300, (this.imageIndex / obj.length) * width * 0.8, 15);
        popStyle();
    
        if(this.imageIndex < obj.length){
            this.loaded = false;
        }
        else {
            this.loaded = true;
            this.page = s;
        }
    };
    this.healthBar = function() {
        noStroke();
        fill(212, 209, 176, 200);
        rect(490, 560, 100, 30);
        fill(252, 141, 114);
        rect(490, 560, map(this.health, 0, 100, 0, 100), 30);
    };
    this.setHealth = function(n) {
        this.health = constrain(this.health + n, 0, 100);  
    };
    this.shakeScreen = function() {
        if(this.shake > 0) {
            this.shake = lerp(this.shake, 0, this.shakedown);
            translate(round(random(-this.shake, this.shake)), round(random(-this.shake, this.shake)));
        }
    };
    this.performAction = function() {
        //move baby yoda
        if(clicked && !this.buttonClicked && !this.babyYoda.sleep) {
            this.babyYoda.dx = map(mouseX, 0, 600, -200, 200);
            this.babyYoda.dy = map(mouseY, 0, 600, 0, 100);
        }
        
        //if up key then use the force
        this.force = keys[UP] && !this.babyYoda.sleep;
        
        if(this.force) {
            this.shake = 0.75;
            this.ship.landed = false;
            this.collide = false;
            this.idleTime = millis();
            
            // if(this.sound){
            //     this.sounds.force.audio.play();
            // }
            
            this.health = constrain(this.health - 0.2, 0, 100);
            
            if(this.health === 0) {
                this.babyYoda.sleep = true;
            }

            this.ship.vy = -15.5;
            this.ship.angle+= sin(radians(frameCount * 0.75)) * 0.1;
            this.ship.collision = false;
            
            this.ship.drop = (this.ship.py - this.ship.y) / 100;
        }
        else if(this.ship.collision && this.ship.landed === false) {
            this.ship.landed = true;
            this.shake = this.ship.drop * 8;
            this.ship.collision = false;
            this.collide = true;
            
            // if(this.sound){
            //     this.sounds.thud.audio.play();
            //     this.sounds.force.audio.pause();
            //     this.sounds.force.audio.currentTime = 0;
            // }
            
            for(var i = 0; i < this.dusts.length; i++) {
                this.dusts[i].vy = random(this.ship.drop * -30, this.ship.drop * -5);
            }
        }
        else {
            this.health = constrain(this.health + 0.2, 0, 100);
            
            if(this.babyYoda.sleep && this.health === 100) {
                this.babyYoda.sleep = false;
                this.babyYoda.eyeClose = 0;
                keys[UP] = false;
                
                // if(this.sound){
                //     this.sounds.force.audio.pause();
                //     this.sounds.force.audio.currentTime = 0;
                // }
            }

            if(this.babyYoda.sleep) {
                //add some zzzs
                if(frameCount % 60 === 0) {
                    this.zzzs.push({
                       x: (300 * (1 - this.babyYoda.scale) + this.babyYoda.x + (300 * this.babyYoda.scale)),
                       y: (300 * (1 - this.babyYoda.scale) + this.babyYoda.y + (305 * this.babyYoda.scale)),
                       size: (40 * this.babyYoda.scale),
                       opacity: 200
                    });
                }
            }
        }
        
        this.babyYoda.useTheForce(this.force);
        
        this.idle = ~~((millis() - this.idleTime) / 1000);
        
        if(this.babyYoda.idle === false && this.idle >= 10) {
            if(this.idle % this.idleDelay === 0) {
                this.idleSleepCounter++;
                if(this.idleSleepCounter === this.idleSleepDelay) {
                    if(random() < 0.5) {
                        keys[UP] = true;
                        this.idleSleepCounter = 0;
                        this.idleSleepDelay = ~~random(5, 10);
                    }
                    else {
                        this.babyYoda.sleep = true;
                        this.health = 0;
                        this.idleSleepCounter = 0;
                        this.idleSleepDelay = ~~random(5, 10); 
                    }
                }
                else {
                    this.babyYoda.dx = map(random(width), 0, 600, -200, 200);
                    this.babyYoda.dy = map(random(height), 0, 600, 0, 100);
                    this.idleDelay = ~~random(8, 16);
                }
            }
            this.babyYoda.mx = (300 * (1 - this.babyYoda.scale) + this.babyYoda.x + (300 * this.babyYoda.scale)) + sin(radians(frameCount * 2)) * 200;
            this.babyYoda.my = (300 * (1 - this.babyYoda.scale) + this.babyYoda.y + (300 * this.babyYoda.scale)) + cos(radians(frameCount * 3)) * 150;
        }
    };
    this.runStars = function() {
        if(random() < 0.005) {
            this.stars.push({
               x: random(width),
               y: random(-50, -20),
               size: 2,
               opacity: ~~random(100, 150),
               vx: random(-5, 5),
               vy: random(5, 8)
            });
        }
        
        noStroke();
        for(var i = this.stars.length - 1; i >= 0; i--) {
            var star = this.stars[i];
            fill(250, star.opacity);
            star.x+= star.vx;
            star.y+= star.vy;
            ellipse(star.x, star.y, star.size, star.size);
            
            if(star.y + star.size > height / 2) {
                this.stars.splice(i, 1);
            }
        }
    };
    this.runZs = function() {
        if(this.zzzs.length > 0) {
            pushStyle();
                textAlign(CENTER, CENTER);
                textFont(this.fonts.title);
                
                for(var i = this.zzzs.length - 1; i >= 0; i--) {
                    var z = this.zzzs[i];
                    
                    pushMatrix();
                        translate(z.x, z.y);
                        rotate(radians(frameCount * 2));
                        
                        fill(0, z.opacity);
                        textSize(z.size);
                        
                        text("Z", 0, 0);

                        z.opacity-=2;
                        z.y-= 2;

                        if(z.opacity <= 0) {
                            this.zzzs.splice(i, 1);
                        }
                    popMatrix();
                }
            popStyle();
        }
    };
    this.how = function() {
        pushMatrix();
            translate(0, this.howY);
            pushStyle();
                noStroke();
                fill(240, 150);
                rect(120, 0, 360, 230, 10);
                fill(40);
                textFont(this.fonts.title);
                textAlign(LEFT, TOP);
                textSize(16);
                text("Created By Fresh :)");
            
            popStyle();
        popMatrix();
    };
    this.main = function() {
        if(this.collide) {
            this.shakeScreen();
        }
        
        image(this.images.back, 0, 0);

        this.runStars();
        
        image(this.images.mountains, 0, 200);
        image(this.images.ground, 0, 300);

        this.ship.go();
        image(this.images.groundShip, 400, 320, 190, 80);
        
        for(var i = 0; i < this.dusts.length; i++) {
            this.dusts[i].go();
        }
        
        this.runZs();
        this.healthBar();

        if(this.showInstructions) {
            this.howY = lerp(this.howY, 100, 0.1);
        }
        else {
            this.howY = lerp(this.howY, -360, 0.1);
        }
        
        this.how();
        this.shakeScreen();
        this.babyYoda.go();
        // this.soundButton.draw();
        this.howButton.draw();
        this.performAction();
    };
};

scene = new Scene();

draw = function() {
    background(20, 20, 20);

    switch(scene.page) {
        case "load":
            scene.load("main");
            break;
        case "main":
            scene.main();
            break;
    }
    
    cursor(hover ? 'pointer' : 'default');    
    hover = false;
    clicked = false;
    scene.buttonClicked = false;
};

mouseMoved = function() {
    scene.babyYoda.mx = mouseX;
    scene.babyYoda.my = mouseY;
    if(!scene.babyYoda.sleep) {
        keys[UP] = false;
    }
    scene.idleTime = millis();
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);