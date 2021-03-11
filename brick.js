let svgNS = "http://www.w3.org/2000/svg"
class Plate {
    constructor(plateObject, fill, fillColor, stroke, strokeColor, borderWidth) {
        this.fill = fill;
        this.stroke = stroke;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.unit = 5;
        this.length = plateObject.length;
        this.height = plateObject.height;
        this.pattern = plateObject.pattern;
        this.borderWidth = borderWidth;
        this.node = document.createElementNS(svgNS, 'svg');
        this.node.setAttribute("viewBox", `0 0 ${this.length * this.unit + (this.borderWidth*2)} ${this.height * this.unit + (this.borderWidth*2)}`);
    }
    generate() {
        if (this.fill == true) {
            this.generateFill();
        }
        if (this.stroke == true) {
            this.generateStroke();
        }
        this.generateStuds()
    }
    generateFill() {
        let x = 1
        let y = 1
        for (let i=1; i<this.pattern.length + 1; i++) {
            if (this.pattern[i-1] == 1) {
                let xPrime = ((x-1) * this.unit) + (this.borderWidth/2);
                let yPrime = ((y-1) * this.unit) + (this.borderWidth/2);
                let fill = document.createElementNS(svgNS, 'path');
                let argument = `M ${xPrime} ${yPrime} L ${xPrime + this.unit} ${yPrime} L ${xPrime + this.unit} ${yPrime + this.unit} L ${xPrime} ${yPrime + this.unit}`;
                fill.setAttribute("d", argument);
                fill.setAttribute("fill", this.fillColor);
                fill.setAttribute("stroke-width", this.borderWidth/2);
                fill.setAttribute("stroke", this.fillColor);
                fill.id = `fill${i}`
                this.node.appendChild(fill);
            }
            if (x % this.length == 0) {
                x = 1;
                y++
            } else {
                x = x+1
            }
        }
    }
    generateStroke() {
        let x = 1
        let y = 1
        for (let i=1; i<this.pattern.length + 1; i++) {
            if (this.pattern[i-1] == 1) {
                let xPrime = ((x-1) * this.unit) + (this.borderWidth/2);
                let yPrime = ((y-1) * this.unit) + (this.borderWidth/2);
                let top = {
                    "x": x,
                    "y": y - 1,
                    "name": "top",
                }
                let right = {
                    "x": x + 1,
                    "y": y,
                    "name": "right",
                }
                let bottom = {
                    "x": x,
                    "y": y + 1,
                    "name": "bottom",
                }
                let left = {
                    "x": x - 1,
                    "y": y,
                    "name": "left",
                }

                let sides = [top, right, bottom, left];
                for (let j=0; j<sides.length; j++) {
                    if (this.outOfRange(sides[j]) || this.isStud(sides[j]) == false) {
                        let frameFragment;
                        let argument;
                        switch (sides[j].name) {
                            case "top":
                                frameFragment = document.createElementNS(svgNS, 'path');
                                argument = `M ${xPrime - this.borderWidth/2} ${yPrime} L ${xPrime + this.unit + this.borderWidth/2} ${yPrime}`;
                                break;
                            case "right":
                                frameFragment = document.createElementNS(svgNS, 'path');
                                argument = `M ${xPrime + this.unit} ${yPrime - this.borderWidth/2} L ${xPrime + this.unit} ${yPrime + this.unit + this.borderWidth/2}`;
                                break;
                            case "bottom":
                                frameFragment = document.createElementNS(svgNS, 'path');
                                argument = `M ${xPrime - this.borderWidth/2} ${yPrime + this.unit} L ${xPrime + this.unit + this.borderWidth/2} ${yPrime + this.unit}`;
                                break;
                            case "left":
                                frameFragment = document.createElementNS(svgNS, 'path');
                                argument = `M ${xPrime} ${yPrime - this.borderWidth/2} L ${xPrime} ${yPrime + this.unit + this.borderWidth/2}`;
                                break;
                        }
                        frameFragment.setAttribute("d", argument);
                        frameFragment.setAttribute("stroke-width", this.borderWidth);
                        frameFragment.setAttribute("stroke", this.strokeColor);
                        frameFragment.id = `frameFragment${i.toString() + j.toString()}`
                        this.node.appendChild(frameFragment);
                    }
                }
            }
            if (x % this.length == 0) {
                x = 1;
                y++
            } else {
                x = x+1
            }
        }
    }
    generateStuds() {
        let x = 1
        let y = 1
        for (let i=1; i<this.pattern.length + 1; i++) {
            if (this.pattern[i-1] == 1) {
                let xPrime = ((x-1) * this.unit) + (this.borderWidth/2);
                let yPrime = ((y-1) * this.unit) + (this.borderWidth/2);
                let stud = document.createElementNS(svgNS, 'circle');
                stud.setAttribute("cx", (xPrime + (this.unit/2)));
                stud.setAttribute("cy", (yPrime + (this.unit/2)));
                stud.setAttribute("r", this.unit * (5/16));
                stud.setAttribute("fill", "none");
                stud.setAttribute("stroke-width", this.borderWidth);
                stud.setAttribute("stroke", this.strokeColor);
                stud.id = `stud${i}`
                this.node.appendChild(stud);
            }
            if (x % this.length == 0) {
                x = 1;
                y++
            } else {
                x = x+1
            }
        }
    }

    isStud(cordObject) {
        if (this.outOfRange(cordObject) != true) {
            let patternValue = ((cordObject.y * (this.length)) - (this.length - cordObject.x) - 1)
            if (this.pattern[patternValue] == 1) {
                return true
            } else {
                return false
            }
        }
    }

    outOfRange(cordObject) {
        if (cordObject.x < 0 || cordObject.x > this.length || cordObject.y < 0 || cordObject.y > this.height || cordObject.x == 0 || cordObject.y == 0) {
            return true
        } else {
            return false
        }
    }
}

function generatePattern(length, width) {
    let patternLength = length * width;
    let pattern = [];
    for (let i=0; i<patternLength; i++) {
        let value = Math.random() * 10
        if (value > 7) {
            pattern.push(0)
        } else {
            pattern.push(1)
        }
    }
    return pattern
}

let plate2x4= {
    "length": 2,
    "height": 4,
    "pattern": [
        1, 1,
        1, 1,
        1, 1,
        1, 1,
    ]
}

let arbitraryShape= {
    "length": 4,
    "height": 5,
    "pattern": [
        1, 1, 1, 1,
        1, 0, 0, 1,
        1, 1, 1, 1,
        0, 1, 0, 1,
        1, 0, 1, 0,
    ]
}

let randomShape = {
    "length": 5,
    "height": 5,
    "pattern": generatePattern(5, 5)
}
let plateNode = document.getElementById("plate");
let plate = new Plate(randomShape, true, "white", true, "#f5f5f5", .3)
plate.generate()
plateNode.appendChild(plate.node)