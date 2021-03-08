let svgNS = "http://www.w3.org/2000/svg"
class Plate {
    constructor(plateObject) {
        this.unit = 5;
        this.length = plateObject.length;
        this.height = plateObject.height;
        this.pattern = plateObject.pattern;
        this.node = document.createElementNS(svgNS, 'svg');
        this.node.setAttribute("viewBox", `0 0 ${this.length * this.unit} ${this.height * this.unit}`);        
    }
    generateStuds() {
        let x = 1;
        let y = 1;
        for (let i=1; i<this.pattern.length + 1; i++) {
            if (this.pattern[i - 1] == 1) {
                let stud = document.createElementNS(svgNS, 'circle');
                stud.setAttribute("cx", (this.unit * (x - 1)) + (this.unit / 2));
                stud.setAttribute("cy", (this.unit * (y - 1)) + (this.unit / 2));
                stud.setAttribute("r", this.unit * (5/16));
                this.node.appendChild(stud)

                let top = {
                    "x": x,
                    "y": y - 1,
                }
                let right = {
                    "x": x + 1,
                    "y": y,
                }
                let bottom = {
                    "x": x,
                    "y": y + 1,
                }
                let left = {
                    "x": x - 1,
                    "y": y,
                }

                let xPrime = x-1;
                let yPrime = y-1
                
                if (this.outOfRange(top) || this.isStud(top) == false) {
                    let frameFragemnt = document.createElementNS(svgNS, 'path');
                    let argument = `M ${(xPrime) * this.unit} ${(yPrime) * this.unit} L ${(xPrime) * this.unit + this.unit} ${(yPrime) * this.unit}`;
                    frameFragemnt.setAttribute("d", argument);
                    this.node.appendChild(frameFragemnt);
                }

                if (this.outOfRange(right) || this.isStud(right) == false) {
                    let frameFragemnt = document.createElementNS(svgNS, 'path');
                    let argument = `M ${(xPrime) * this.unit + this.unit} ${(yPrime) * this.unit} L ${(xPrime) * this.unit + this.unit} ${(yPrime) * this.unit + this.unit}`;
                    frameFragemnt.setAttribute("d", argument);
                    this.node.appendChild(frameFragemnt);
                }

                if (this.outOfRange(bottom) || this.isStud(bottom) == false) {
                    let frameFragemnt = document.createElementNS(svgNS, 'path');
                    let argument = `M ${(xPrime) * this.unit} ${(yPrime) * this.unit + this.unit} L ${(xPrime) * this.unit + this.unit} ${(yPrime) * this.unit + this.unit}`;
                    frameFragemnt.setAttribute("d", argument);
                    this.node.appendChild(frameFragemnt);
                }

                if (this.outOfRange(left) || this.isStud(left) == false) {
                    let frameFragemnt = document.createElementNS(svgNS, 'path');
                    let argument = `M ${(xPrime) * this.unit} ${(yPrime) * this.unit} L ${(xPrime) * this.unit} ${(yPrime) * this.unit + this.unit}`;
                    frameFragemnt.setAttribute("d", argument);
                    this.node.appendChild(frameFragemnt);
                }
            }

            if ((x) % (this.length) == 0) {
                x = 1;
                y++
            } else {
                x++
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
let plate2x2 = {
    "length": 2,
    "height": 2,
    "pattern": [
        1, 1,
        1, 1
    ]
}

let plateCorner2x2 = {
    "length": 2,
    "height": 2,
    "pattern": [
        1, 0,
        1, 1
    ]
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

let randomShape= {
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

let randomShape2 = {
    "length": 5,
    "height": 5,
    "pattern": generatePattern(5, 5)
}
let spot2 = document.getElementById("brick2");
let test01 = new Plate(randomShape2)
test01.generateStuds()
spot2.appendChild(test01.node)

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