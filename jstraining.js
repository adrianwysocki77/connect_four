var list = [1, 2, 3, 4];

for (var x = 0; x < list.length; x++) {
    console.log("x:", x);
    setTimeout(
        function(y) {
            console.log("%d => %d", y, (list[y] += 10));
            console.log("x:", x);
        },
        x * 500,
        x
    ); // we're passing x
}
