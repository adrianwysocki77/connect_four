var board = $("#board");
var currentPlayer = "player1";
var slots = $(".slot");
var columns = $(".column");
var box = $(".box");
var body = $("body");
let keyboardAcitv = true;
let enterOnWonMessageActiv = false;
let onClick = true;
///////////////////////////////////////////////////////////////////////////////
//Info about player in Local Storage
const players = {
    player1: 0,
    player2: 0
};

if (!window.localStorage.getItem("players")) {
    window.localStorage.setItem("players", JSON.stringify(players));
}

window.localStorage.getItem("players");

$(".first").html(JSON.parse(window.localStorage.getItem("players")).player1);
$(".second").html(JSON.parse(window.localStorage.getItem("players")).player2);
////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS

// formain - main logic game function calling another functions like: look for row/column/diagonall - matches.
function formain(e, onClick, columnborder) {
    let i;
    let col;
    let columnborderInForMain = columnborder;
    let slotsInCol;
    let slotsInRow;

    if (!onClick) {
        col = columnborderInForMain;
    } else {
        col = $(e.currentTarget);
    }

    slotsInCol = col.children();

    for (i = slotsInCol.length - 1; i >= 0; i--) {
        if (
            !slotsInCol.eq(i).hasClass("player1") &&
            !slotsInCol.eq(i).hasClass("player2")
        ) {
            slotsInCol.eq(i).addClass(currentPlayer);
            break;
        }
    }

    // ignoring cick when column full
    if (i == -1) {
        return;
    }

    slotsInRow = $(".row" + i);
    //checking who win
    var victoryRow = checkForVictory(slotsInRow);
    var victoryCol = checkForVictory(slotsInCol);

    //matched in row
    if (victoryRow[0]) {
        var arrSlots = victoryRow[1];
        for (var z = 0; z < arrSlots.length; z++) {
            arrSlots[z].addClass("victory");
        }
        won();
        destroyWithAnimation();
        //matched in column
    } else if (victoryCol[0]) {
        var arrSlotsTwo = victoryCol[1];
        for (var x = 0; x < arrSlotsTwo.length; x++) {
            arrSlotsTwo[x].addClass("victory");
        }
        won();
        destroyWithAnimation();
    } else if (diagonally()) {
        //matched diagonally
        won();
        destroyWithAnimation();
    }
    //change player after every click
    switchPlayer();
}

//Checking matches in rows and in columns

function checkForVictory(slots) {
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
        if (slots.eq(i).hasClass(currentPlayer)) {
            count++;
            if (count == 4) {
                var arr = [
                    slots.eq(i),
                    slots.eq(i - 1),
                    slots.eq(i - 2),
                    slots.eq(i - 3)
                ];
                return [true, arr];
            }
        } else {
            count = 0;
        }
    }
    return false;
}

//Checking diagonally matches

function diagonally() {
    var columns = $(".column"); //
    for (var col = 0; col < columns.length - 3; col++) {
        for (var row = 0; row < columns.eq(col).children().length - 3; row++) {
            if (
                columns
                    .eq(col)
                    .children()
                    .eq(row)
                    .hasClass(currentPlayer) &&
                columns
                    .eq(col)
                    .children()
                    .eq(row)
                    .hasClass(currentPlayer) ==
                    columns
                        .eq(col + 1)
                        .children()
                        .eq(row + 1)
                        .hasClass(currentPlayer) &&
                columns
                    .eq(col)
                    .children()
                    .eq(row)
                    .hasClass(currentPlayer) ==
                    columns
                        .eq(col + 2)
                        .children()
                        .eq(row + 2)
                        .hasClass(currentPlayer) &&
                columns
                    .eq(col)
                    .children()
                    .eq(row)
                    .hasClass(currentPlayer) ==
                    columns
                        .eq(col + 3)
                        .children()
                        .eq(row + 3)
                        .hasClass(currentPlayer)
            ) {
                columns
                    .eq(col)
                    .children()
                    .eq(row)
                    .addClass("victory");
                columns
                    .eq(col + 1)
                    .children()
                    .eq(row + 1)
                    .addClass("victory");
                columns
                    .eq(col + 2)
                    .children()
                    .eq(row + 2)
                    .addClass("victory");
                columns
                    .eq(col + 3)
                    .children()
                    .eq(row + 3)
                    .addClass("victory");

                return true;
            }
        }
    }

    for (var colu = columns.length; colu > 2; colu--) {
        for (
            var rows = 0;
            rows < columns.eq(colu).children().length - 3;
            rows++
        ) {
            if (
                columns
                    .eq(colu)
                    .children()
                    .eq(rows)
                    .hasClass(currentPlayer) &&
                columns
                    .eq(colu)
                    .children()
                    .eq(rows)
                    .hasClass(currentPlayer) ==
                    columns
                        .eq(colu - 1)
                        .children()
                        .eq(rows + 1)
                        .hasClass(currentPlayer) &&
                columns
                    .eq(colu)
                    .children()
                    .eq(rows)
                    .hasClass(currentPlayer) ==
                    columns
                        .eq(colu - 2)
                        .children()
                        .eq(rows + 2)
                        .hasClass(currentPlayer) &&
                columns
                    .eq(colu)
                    .children()
                    .eq(rows)
                    .hasClass(currentPlayer) ==
                    columns
                        .eq(colu - 3)
                        .children()
                        .eq(rows + 3)
                        .hasClass(currentPlayer)
            ) {
                columns
                    .eq(colu)
                    .children()
                    .eq(rows)
                    .addClass("victory");
                columns
                    .eq(colu - 1)
                    .children()
                    .eq(rows + 1)
                    .addClass("victory");
                columns
                    .eq(colu - 2)
                    .children()
                    .eq(rows + 2)
                    .addClass("victory");
                columns
                    .eq(colu - 3)
                    .children()
                    .eq(rows + 3)
                    .addClass("victory");
                return true;
            }
        }
    }
}
// End animation for destroying main board
function destroyWithAnimation() {
    setTimeout(function() {
        for (var u = 0; u < slots.length; u++) {
            setTimeout(
                function(t) {
                    slots.eq(t).addClass("movedown");
                    slots.eq(t + 1).addClass("movedown");
                    slots.eq(t + 2).addClass("movedown");
                },
                u * 100,
                u
            );
        }

        setTimeout(function() {
            for (var s = 0; s < columns.length; s++) {
                setTimeout(
                    function(p) {
                        columns.eq(p).addClass("movedown");
                        columns.eq(p + 1).addClass("movedown");
                        columns.eq(p + 3).addClass("movedown");
                    },
                    s * 900,
                    s
                );
            }
        }, 4000);
    }, 2000);
}
// displaying win message and putting results to the local storage
function won() {
    keyboardAcitv = false;
    enterOnWonMessageActiv = true;
    $(".overlay").removeClass("hidden");
    $(".overlay").addClass("visible");
    setTimeout(function() {
        box.removeClass("box");
        $(".won").removeClass("hidden");
        $(".won").addClass("visible");
        var whowin = "";
        whowin =
            "<div class='wontext'>" +
            (currentPlayer == "player2"
                ? "<div class='secondresultone'></div>"
                : "<div class='secondresulttwo'></div>") +
            "won!";
        ("</div>");
        $(".text").html(whowin);
    }, 2000);

    if (currentPlayer == "player1") {
        let updateResult = JSON.parse(window.localStorage.getItem("players"));
        updateResult.player1 += 1;
        window.localStorage.setItem("players", JSON.stringify(updateResult));
        $(".first").html(
            JSON.parse(window.localStorage.getItem("players")).player1
        );
        $(".second").html(
            JSON.parse(window.localStorage.getItem("players")).player2
        );
    } else {
        let updateResult = JSON.parse(window.localStorage.getItem("players"));
        updateResult.player2 += 1;
        window.localStorage.setItem("players", JSON.stringify(updateResult));
        $(".first").html(
            JSON.parse(window.localStorage.getItem("players")).player1
        );
        $(".second").html(
            JSON.parse(window.localStorage.getItem("players")).player2
        );
    }
}

//switching player every successful click
function switchPlayer() {
    if (currentPlayer == "player1") {
        currentPlayer = "player2";
        box.removeClass("player1");
        box.addClass("player2");
    } else {
        currentPlayer = "player1";
        box.removeClass("player2");
        box.addClass("player1");
    }
}

//After match close win message and continue game
function backToGame(tr, fl) {
    keyboardAcitv = tr;
    location.reload();
    enterOnWonMessageActiv = fl;
    $(".slot").removeClass("player1");
    $(".slot").removeClass("player2");
    $(".slot").removeClass("victory");
    $(".overlay").removeClass("visible");
    $(".overlay").addClass("hidden");
    $(".won").removeClass("visible");
    $(".won").addClass("hidden");
    box.addClass("box");

    $(".slot").addClass("notransition");
    $(".column").addClass("notransition");
}

////////////////////////////////////////////////////////////////////////////////
//Event listeners

body.on("keydown", function(e) {
    var columnborder = $(".columnborder");
    var index = columnborder.index();

    if (e.keyCode === 39 && index == -1 && keyboardAcitv) {
        $(".column")
            .eq(0)
            .addClass("columnborder");
        index = 0;
    }

    if (e.keyCode === 37 && index == 0 && keyboardAcitv) {
        console.log(index);
        $(".column")
            .eq(columns.length - 1)
            .addClass("columnborder");
        columnborder.removeClass("columnborder");
    }

    if (e.keyCode === 39 && index < columns.length && keyboardAcitv) {
        columnborder.next().addClass("columnborder");
        columnborder.removeClass("columnborder");
        index++;
    }

    if (e.keyCode === 39 && index == columns.length && keyboardAcitv) {
        $(".column")
            .eq(0)
            .addClass("columnborder");
        columnborder.removeClass("columnborder");
    }

    if (e.keyCode === 37 && index == -1 && keyboardAcitv) {
        $(".column")
            .eq(columns.length - 1)
            .addClass("columnborder");
        index = columns.length - 1;
    }

    if (e.keyCode === 37 && index > 0 && keyboardAcitv) {
        columnborder.prev().addClass("columnborder");
        columnborder.removeClass("columnborder");
    }

    if (e.keyCode === 13 && enterOnWonMessageActiv) {
        console.log("enter on win message");
        backToGame(true, false);
    }

    if (e.keyCode === 13 && index >= 0 && keyboardAcitv) {
        onClick = false;
        console.log("enter clicked, in body on keydown");
        formain(e, onClick, columnborder);
    }
});

$(".column").on("click", function(e) {
    //loop przez cala kolume z znajdz pusty slot
    formain(e, onClick);
});

$(".resetcontainer").on("mouseenter", function() {
    box.addClass("hidden");
});

$(".resetcontainer").on("mouseleave", function() {
    box.removeClass("hidden");
});

$("button").on("click", function() {
    backToGame(true, false);
});

$(".reset").on("click", function() {
    var r = confirm("do you want to reset the game?");
    if (r == true) {
        window.localStorage.setItem("players", JSON.stringify(players));
        location.reload();
    }
});

for (var i = 0; i < columns.length; i++) {
    columns.eq(i).on("mouseenter", function(e) {
        if (columns.hasClass("columnborder")) {
            columns.removeClass("columnborder");
        }
        $(e.currentTarget).addClass("columnborder");
    });

    columns.eq(i).on("mouseleave", function(e) {
        $(e.currentTarget).removeClass("columnborder");
    });
}
////////////////////////////////////////////////////////////////////////////////
//Mouse cursor
// box
body.mousemove(function(e) {
    e.stopPropagation();
    box.css({
        left: e.clientX,
        top: e.clientY
    });
});
