// TO-DO:



function draw(dot) {

    ctx.clearRect(0, 0, 1500, 1000);

    getOffsetPosition(dot, canvas); //console.log(points.length);
    // ctx.beginPath();
    // ctx.globalCompositeOperation = globalCompositeOperation;
    // ctx.fillStyle="white"
    // ctx.arc(canW/2, canH/2, r1, 0, 2 * Math.PI, false);ctx.fill();

    cx = canW / 2;
    cy = canH / 2;
    ex = currX;
    ey = currY
    var dy = ey - cy;
    var dx = ex - cx;
    theta = Math.atan2(dy, dx); // range (-PI, PI]
    thetaDeg = theta * 180 / Math.PI; // rads to degs, range (-180, 180]
    if (thetaDeg < 0) thetaDeg += 360;
    theta = thetaDeg * Math.PI / 180;
    x1 = canW / 2;
    y1 = canH / 2;
    //theta = 0.5;
    // ctx.moveTo(x1, y1);
    ctx.moveTo(x1 + r1 * Math.cos(theta), y1 + r1 * Math.sin(theta));
    ctx.lineTo(x1 + r2 * Math.cos(theta), y1 + r2 * Math.sin(theta));
    // if(countA<countB) {points.pop();countA=countB;console.log("popB"+countA+countB) ;}

    if (thetaDeg > 267 && 272 > thetaDeg) {
        thetaDeg += 3
    }
    thetaDeg2 = thetaDeg + 90;
    if (thetaDeg2 > 360) {
        thetaDeg2 -= 360;
    } //console.log(thetaDeg)
    if (Math.sqrt((currX - x1) ** 2 + (currY - y1) ** 2) > 0 && Math.sqrt((currX - x1) ** 2 + (currY - y1) ** 2) < r1 && !(currentDay < 5 && markState == 'unavilable' && Math.round((thetaDeg2) / (364 / 32)) > 3 && Math.round((thetaDeg2) / (364 / 32)) < 15)) {


        if ((dot.type === 'mousedown' || dot.type === 'touchstart') && (true)) { //mouseDown

            state = 1;
            countA++;
            console.log("AAAAAAAAAAAAAAA")
            // points.push([[x1 + r1 * Math.cos(theta), y1 + r1 * Math.sin(theta)],[x1 + r2 * Math.cos(theta), y1 + r2 * Math.sin(theta)]])
            points.push(Math.round((thetaDeg2) / (364 / 32)));
        }
        if (((dot.type === 'mouseup' || dot.type === 'touchend') && (true))) { //mouseUp
            state = 2;
            countB++;
            console.log("BBBBBBBBBBBBBBBBB" + countA + countB);
            // points.push([[x1 + r1 * Math.cos(theta), y1 + r1 * Math.sin(theta)],[x1 + r2 * Math.cos(theta), y1 + r2 * Math.sin(theta)]]); state=2
            points.push(Math.round((thetaDeg2) / (364 / 32)));
            if (selected != 0) {
                points.pop();
                points.pop();
                selected = 0;
            }
        }
    } else {
        thetaDeg = 'none';
    }
    drawTime(dot);
    // if((dot.type === 'mouseup' ||  dot.type === 'touchend' ) && state===1 ) { if( popped==0) {state=2;points.pop();countA=countB;console.log("pop"); } else { popped=0;} }

    //document.getElementById('e2').innerText=Math.sqrt((currX-x1)**2+(currY-y1)**2)
    ctx.closePath();
}


function drawTime(dot) {
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1500, 1000);

    ctx.beginPath(); //console.log(lastPoint);
    // ctx.linsseWsidth=5

    if (
        points.length % 2 == 0 &&
        points.length > 0 &&
        points[points.length - 1] == points[points.length - 2]
    ) {
        if (selected != 0) {
            selected = 0;
            can.width = can.width;
            drawTime();
        } else {
            points.pop();
            points.pop();
        }
        console.log("vvvvvvvvvvv");
    }
    if (
        points.length % 2 == 1 &&
        (dot.type == "mouseup" || dot.type == "touchend")
    ) {
        if (selected != 0) {
            selected = 0;
            points.pop();
        } else points.push(Math.round(thetaDeg2 / (364 / 32)));
        popped = 1;
        console.log("kkkkkkkkkkkk");
        thetaDeg = "none";
    }
    if (points.length % 2 == 1 && thetaDeg == "none") {
        // points.pop();
        popped = 1;
        console.log("kkkkkkkkk222");
    }
    for (var i = 0; i < points.length; i++) {
        if (i % 2 == 0) {
            fillFirstAngle = points[i];
        }
        if (i % 2 == 1) {
            if (fillFirstAngle == points[i]) {
                points.splice(i - 1, 2);
            }
        }
    }

    if (
        Math.sqrt((lastPoint - thetaDeg2 / (364 / 32)) ** 2) > 15 &&
        selected == 0 &&
        lastPoint != null &&
        points.length % 2 == 1
    ) {
        points.pop();
    }
    if (points.length % 2 == 1) lastPoint = thetaDeg2 / (364 / 32);
    else {
        lastPoint = null;
    }

    if (points.length % 2 == 0) {
        for (var a = 0; a < points.length; a++) {
            if (a % 2 == 0) {
                var fillFirstPoint = points[a];
            }
            if (a % 2 == 1) {
                if (fillFirstPoint > points[a]) {
                    var temp1 = points[a];
                    points[a] = points[a - 1];
                    points[a - 1] = temp1;
                }
            }
        }

        allPoints4Start();
        for (var i = 0; i < allPoints4.length; i++) {
            if (
                points[points.length - 1] > allPoints4[i][0] &&
                allPoints4[i][0] > points[points.length - 2] &&
                points[points.length - 1] > allPoints4[i][1] &&
                allPoints4[i][1] > points[points.length - 2]
            ) {
                //Remove Complete Overlaps on both Sides
                if (
                    currentDay < 5 &&
                    markState == 'unavilable' &&
                    allPoints4[i][0] == 3 &&
                    allPoints4[i][1] == 15
                ) {
                    points.splice(-1, 0, 3);
                    points.splice(-1, 0, 15);
                } else {
                    points.splice(points.indexOf(allPoints4[i][0]), 2);
                }
            } else if (
                points[points.length - 1] > allPoints4[i][0] &&
                allPoints4[i][0] > points[points.length - 2]
            ) {
                //Remove one side OverLap
                points[points.length - 1] = allPoints4[i][0];
            } else if (
                points[points.length - 1] > allPoints4[i][1] &&
                allPoints4[i][1] > points[points.length - 2]
            ) {
                //Remove another side OverLap
                points[points.length - 2] = allPoints4[i][1];
            } else if (
                //Remove Same points
                points[points.length - 1] == allPoints4[i][1] &&
                allPoints4[i][0] == points[points.length - 2]
            ) {
                console.log(points);
                points.splice(points.length - 2, 2);
                console.log(points);
                break;
            }
        }
    }

    for (var i = 0; i < oldPoints.length; i++) {
        if (i % 2 == 0 && i != oldPoints.length - 1) {
            var fillFirstAngle = angle[oldPoints[i]] - 90;
            var fillFirstPoint = oldPoints[i];
        }
        if (i % 2 == 1 && oldPoints.length > 0) {
            if (markState == 'adjustable') ctx.fillStyle = "rgba(224, 24, 54, 0.5)";
            else ctx.fillStyle = "rgba(0, 255, 255,0.34)";
            var fillSecondAngle = angle[oldPoints[i]] - 90;
            direction = true;
            var fillSecondPoint = oldPoints[i];

            if (fillSecondAngle > fillFirstAngle) { } else {
                var temp1 = oldPoints[i];
                oldPoints[i] = oldPoints[i - 1];
                oldPoints[i - 1] = temp1;
            }

            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.save();
            ctx.moveTo(canW / 2, canH / 2);
            ctx.arc(
                canW / 2,
                canH / 2,
                r1,
                ((angle[oldPoints[i]] - 90) * Math.PI) / 180,
                ((angle[oldPoints[i - 1]] - 90) * Math.PI) / 180,
                direction
            );
            ctx.lineTo(canW / 2, canH / 2);
            ctx.globalCompositeOperation = "destination-over";
            ctx.fill();
            ctx.closePath();
        }
    }

    for (var i = 0; i < points.length; i++) {
        //console.log(points.length);
        if (points.length % 2 == 1 && i == points.length - 1) {
            if (getIndexOfK(allPoints, points[i]) != undefined && selected == 0) {
                lastTouchPoint = -3;
                selected = [
                    allPoints[getIndexOfK(allPoints, points[i])[0]][0] - 1,
                    allPoints[getIndexOfK(allPoints, points[i])[0]][
                    allPoints[getIndexOfK(allPoints, points[i])[0]].length - 1
                    ] + 1,
                    points[i]
                ];
                console.log(selected);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawTime(dot);
            } else if (selected == 0) {
                //selected=undefined ;
                if (thetaDeg2 < angle[points[i]]) {
                    direction = true;
                } else {
                    direction = false;
                }
                ctx.beginPath();
                ctx.lineWidth = 7;
                ctx.save();
                ctx.moveTo(canW / 2, canH / 2);
                ctx.arc(
                    canW / 2,
                    canH / 2,
                    r1,
                    ((angle[points[i]] - 90) * Math.PI) / 180,
                    ((angle[Math.round(thetaDeg2 / (364 / 32))] - 90) * Math.PI) / 180,
                    direction
                );
                ctx.lineTo(canW / 2, canH / 2);
                // ctx.restore()
                // ctx.arc(canW/2, canH/2, r2, (angle[(Math.round((thetaDeg2)/(364/32)))]-90)*Math.PI/180, (angle[i]-90)*Math.PI/180, direction);
                if (markState == 'unavilable') ctx.fillStyle = "rgb(224, 24, 54)";
                else ctx.fillStyle = "rgb(3, 57, 108)";
                ctx.globalCompositeOperation = "destination-over";
                ctx.fill();
                ctx.closePath();
            }
        }
        if (i % 2 == 0) {
            var fillFirstAngle = angle[points[i]] - 90;
            var fillFirstPoint = points[i];
        }
        if (i % 2 == 1 && points.length > 0) {
            if (markState == 'unavilable') ctx.fillStyle = "rgb(224, 24, 54)";
            else ctx.fillStyle = "rgb(3, 57, 108)";
            var fillSecondAngle = angle[points[i]] - 90;
            direction = true;
            var fillSecondPoint = points[i];

            if (fillSecondAngle > fillFirstAngle) { } else {
                var temp1 = points[i];
                points[i] = points[i - 1];
                points[i - 1] = temp1;
            }
            if (changeSelected != false) {
                if (points[i - 1] == selected[0] && points[i] == selected[1]) {
                    if (1) {
                        points[i - 1] += changeSelected;
                        points[i] += changeSelected;
                        selected[2] += changeSelected;
                        selected[0] = points[i - 1];
                        selected[1] += changeSelected;
                        points[points.length - 1] += changeSelected;
                        changeSelected = false;
                        //console.log(points);
                    }
                }
            }

            allPoints3Start();
            for (var q = 0; q < allPoints3.length; q++) {
                if (
                    allPoints3[q][2].indexOf(Math.round(thetaDeg2 / (364 / 32))) != -1
                ) {
                    hovered = 1;
                    if (
                        allPoints3[q][0] == fillFirstPoint &&
                        thetaDeg != "none" &&
                        !window.matchMedia("(any-hover: none)").matches
                    ) {
                        if (markState == 'unavilable') ctx.fillStyle = "rgba(224, 24, 54,0.75)";
                        else ctx.fillStyle = "rgb(4, 209, 209)";
                    } else {
                        //console.log(allPoints3[q][0]+fillFirstPoint);
                    }
                } else {
                    hovered = 0;
                }
            }
            if (
                selected != 0 &&
                (points[i - 1] == selected[0] && points[i] == selected[1])
            ) {
                if (markState == 'unavilable') ctx.fillStyle = "rgba(224, 24, 54,0.5)";
                else ctx.fillStyle = "rgb(68, 234, 234)";
            } else {
                //console.log('ffffffffffffff '+points[points.length-1]+" "+selected[2] );
            }
            // console.log(allPoints3.length);

            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.save();
            ctx.moveTo(canW / 2, canH / 2);
            ctx.arc(
                canW / 2,
                canH / 2,
                r1,
                ((angle[points[i]] - 90) * Math.PI) / 180,
                ((angle[points[i - 1]] - 90) * Math.PI) / 180,
                direction
            );
            ctx.lineTo(canW / 2, canH / 2);

            ctx.globalCompositeOperation = "destination-over";
            ctx.fill();
            ctx.closePath();
        }
    }

    hovered = 0;
    allPoints3Start();
    for (var q = 0; q < allPoints3.length; q++) {
        if (allPoints3[q][2].indexOf(Math.round(thetaDeg2 / (364 / 32))) != -1) {
            hovered = 1;
        } else { }
    }
    for (var i = 0; i < 32; i++) {
        //CLOCK LINES
        // angle[1]=4
        drawCircleAngle = angle[i] - 90;
        //console.log(drawCircleAngle)
        if (drawCircleAngle < 0) {
            drawCircleAngle += 360;
        }

        drawCircleAngle *= Math.PI / 180;
        x1 = canW / 2;
        y1 = canH / 2;
        ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        //console.log(points);
        ctx.lineWidth = 2;
        if (thetaDeg != "none" || points.length % 2 == 1) {
            // thetaDeg2 = thetaDeg + 90;
            // if (thetaDeg2 > 360) {
            //     thetaDeg2 -= 360; }

            if (Math.round(thetaDeg2 / (364 / 32)) == i && selected == 0) {
                //console.log(points);
                // if(dot.type=='mousemove'){ ctx.lineWidth = 10;}else{ if(points.length%2==1){ ctx.lineWidth = 10;} }
                if (dot.type == "touchend") {
                    ctx.lineWidth = 2;
                } else {
                    ctx.lineWidth = 10;
                }
                if (hovered == 1) {
                    ctx.lineWidth = 2;
                }
            }
        }

        for (var c = points.length - 1; c >= 0; c--) {
            if (points[c] == i) {
                ctx.lineWidth = 7;
                if (Math.round(thetaDeg2 / (364 / 32)) == i && thetaDeg != "none")
                    ctx.lineWidth = 10;
            }
            if (points[points.length - 1] == i && selected != 0) ctx.lineWidth = 2;
        }
        ctx.moveTo(
            x1 + r1 * Math.cos(drawCircleAngle),
            y1 + r1 * Math.sin(drawCircleAngle)
        );
        ctx.lineTo(
            x1 + r2 * Math.cos(drawCircleAngle),
            y1 + r2 * Math.sin(drawCircleAngle)
        );
        ctx.stroke();
        ctx.closePath();
    }

    ctx = canvas.getContext("2d"); //CIRCLE ARCS - 2
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.save();
    ctx.arc(
        canW / 2,
        canH / 2,
        r1,
        ((angle[31] - 90) * Math.PI) / 180,
        (-90 * Math.PI) / 180,
        true
    );
    ctx.arc(
        canW / 2,
        canH / 2,
        r2,
        (-90 * Math.PI) / 180,
        ((angle[31] - 90) * Math.PI) / 180,
        false
    );
    ctx.stroke();
    //ctx.moveTo(canW/2+r2,canH/2)
    ctx.restore();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(
        canW / 2,
        canH / 2,
        r2,
        (-90 * Math.PI) / 180,
        ((angle[31] - 90) * Math.PI) / 180,
        false
    );
    // ctx.moveTo(canW/2+r3,canH/2)
    // ctx.arc(canW/2, canH/2, r3, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    for (var i = 0; i < 32; i++) {
        //CLOCK NUMBERS
        if (angle[i] > 180) {
            rotateAngle = 3.14;
        } else {
            rotateAngle = 0;
        }
        drawCircleAngle = angle[i] - 90;
        if (drawCircleAngle + 90 == 0) drawCircleAngle += 3;
        // if (drawCircleAngle < 0){drawCircleAngle +=360;}
        drawCircleAngle += 360;
        drawCircleAngle *= Math.PI / 180;
        x1 = canW / 2;
        y1 = canH / 2;
        ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "source-over";
        ctx.save();
        fontSize = r3 * 0.1582;
        fontBold = 1;
        if (thetaDeg != "none" || points.length % 2 == 1) {
            if (
                Math.round(thetaDeg2 / (364 / 32)) == i &&
                selected == 0 &&
                hovered == 0 &&
                dot.type != "touchend"
            ) {
                fontBold = 900;
                fontSize = r3 * 0.3082;
            } else {
                fontSize = r3 * 0.1582;
            }
        }
        for (var c = 0; c < points.length; c++) {
            if (points[c] == i) {
                fontSize = r3 * 0.2382;
                fontBold = 900;
                if (points.length - 1 == c && points.length % 2 == 1 && selected == 0) {
                    fontBold = 900;
                    fontSize = r3 * 0.3082;
                }
            }
            if (points[points.length - 1] == i && selected != 0) {
                fontBold = 1;
                fontSize = r3 * 0.1582;
            }
        }
        if (selected[0] == i || selected[1] == i) fontSize = r3 * 0.2882;

        // fontBold = 500;
        ctx.beginPath();
        ctx.font = fontBold + " " + fontSize + "px arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.translate(
            x1 + r3 * Math.cos(drawCircleAngle),
            y1 + r3 * Math.sin(drawCircleAngle)
        );
        ctx.fillStyle = "black";
        ctx.rotate(drawCircleAngle - rotateAngle);
        //console.log();
        ctx.fillText(times[i], 0, 0, (r2 - r3) * 2);
        ctx.restore();
        ctx.closePath();
    }

    if (selected != 0) {
        if (selected[2] - Math.round(thetaDeg2 / (364 / 32)) != 0) {
            lastTouchPoint = points[points.length - 1];
            changeSelected = Math.round(thetaDeg2 / (364 / 32)) - selected[2];
            //console.log(selected[2]+" "+(Math.round((thetaDeg2) / (364 / 32))) );console.log(thetaDeg2);
            if (
                selected[1] + changeSelected > 31 ||
                selected[0] + changeSelected < 0
            ) {
                changeSelected = false;
                console.log(allPoints + "  " + selected[1]);
            } else {
                allPoints5Start();
                for (
                    var q = 0; q <
                    range(selected[0] + 1 + changeSelected, selected[1] + changeSelected)
                        .length; q++
                ) {
                    if (
                        getIndexOfK(
                            allPoints5,
                            range(
                                selected[0] + 1 + changeSelected,
                                selected[1] + changeSelected
                            )[q]
                        ) != undefined
                    ) {
                        changeSelected = false;
                        console.log("t||||");
                    } else { }
                }

                // if( getIndexOfK(allPoints5,selected[0] + changeSelected)!=undefined||getIndexOfK(allPoints5,selected[1] + changeSelected)!=undefined) changeSelected = false;
            }
        }
    }

    allPoints = [];
    allPointsStart();
}
    function allPointsStart() {
        for (var i = 0; i < points.length; i++) {
            if (i % 2 == 0) {
                var fillFirstAngle = points[i];
            }

            if (i % 2 == 1) {
                if (fillFirstAngle < points[i]) {
                    allPoints.push(range(fillFirstAngle + 1, points[i]));
                } else {
                    allPoints.push(range(points[i] + 1, fillFirstAngle));
                }
                //;console.log(allPoints);
            }
        }
    }
    // function allPoints2Start() {
    //     allPoints2 = [];
    //     for (var i = 0; i < points.length; i++) {
    //         if (i % 2 == 0) {
    //             var fillFirstAngle = points[i];
    //         }

    //         if (i % 2 == 1) {
    //             if (!(fillFirstAngle == selected[0] && points[i] == selected[1])) {

    //                 if (fillFirstAngle < points[i]) {
    //                     allPoints2.push(range(fillFirstAngle + 1, points[i]));
    //                 } else {
    //                     allPoints2.push(range((points[i]) + 1, fillFirstAngle));
    //                 }
    //             }
    //         }

    //     }
    // }

    function allPoints3Start() {
        allPoints3 = [];
        for (var i = 0; i < points.length; i++) {
            if (i % 2 == 0) {
                var fillFirstAngle = points[i];
            }

            if (i % 2 == 1) {
                allPoints3.push([
                    fillFirstAngle,
                    points[i],
                    range(fillFirstAngle + 1, points[i])
                ]);
            }
        }
    }

    function allPoints4Start() {
        allPoints4 = [];
        for (var i = 0; i < points.length - 2; i++) {
            if (i % 2 == 0) {
                var fillFirstAngle = points[i];
            }

            if (i % 2 == 1) {
                allPoints4.push([
                    fillFirstAngle,
                    points[i],
                    range(fillFirstAngle + 1, points[i])
                ]);
            }
        }
    }

    function allPoints5Start() {
        allPoints5 = [];
        for (var i = 0; i < points.length; i++) {
            if (i % 2 == 0) {
                var fillFirstAngle = points[i];
            }

            if (i % 2 == 1) {
                if (!(fillFirstAngle == selected[0] && points[i] == selected[1])) {
                    if (fillFirstAngle < points[i]) {
                        allPoints5.push(range(fillFirstAngle, points[i] + 1));
                    } else {
                        allPoints5.push(range(points[i], fillFirstAngle + 1));
                    }
                }
            }
        }
    }


/**/

const range = (a, b) =>
    Array.from(new Array(b > a ? b - a : a - b), (x, i) =>
        b > a ? i + a : a - i
    );

function getOffsetPosition(evt, parent) {
    var position = {
        x: evt.targetTouches ? evt.changedTouches[0].pageX : evt.pageX,
        y: evt.targetTouches ? evt.changedTouches[0].pageY : evt.pageY
    };

    while (parent.offsetParent) {
        position.x -= parent.offsetLeft - parent.scrollLeft;
        position.y -= parent.offsetTop - parent.scrollTop;

        parent = parent.offsetParent;
    }

    currX = position.x;
    currY = position.y;
    return currX, currY;
}

function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
        var index = arr[i].indexOf(k);
        if (index > -1) {
            return [i, index];
        }
    }
}

function daySelector(e) {

    e = parseInt(e) - 1;
    console.log(e);

    points = [];
    oldPoints = [];
    currentDay = e;
    points = classTimes[currentDay];
    oldPoints = adjTimes[currentDay];
    thetaDeg = "none";
    thetaDeg2 = -1;

    if (markState != 'unavilable') markAdjustable();
    else drawTime();
}



/*

[
"6.00 AM",
"6.30 AM",
"7.00 AM",
"7.30 AM",
"8.00 AM",
"8.30 AM",
"9.00 AM",
"9.30 AM",
"10.00 AM",
"10.30 AM",
"11.00 AM",
"11.30 AM",
"12.00 AM",
"12.30 AM",
"1.00 PM",
"1.30 PM",
"2.00 PM",
"2.30 PM",
"3.00 PM",
"3.30 PM",
"4.00 PM",
"4.30 PM",
"5.00 PM",
"5.30 PM",
"6.00 PM",
"6.30 PM",
"7.00 PM",
"7.30 PM",
"8.00 PM",
"8.30 PM",
"9.00 PM",
"9.30 PM"
]


*/