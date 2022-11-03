function runLengthEncode() {
    const input = document.getElementById("fileInput");
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            const imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const data = imageData.data;
            var greyscale_arr = [];
            console.log("Data-Length: " + data.length);
            for (var i = 0; i < data.length; i += 4) {
                let avg = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
                greyscale_arr.push(avg);
            }
            document.body.appendChild(canvas);
            to_two_dim(greyscale_arr, canvas.width, canvas.height);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function to_two_dim() {
    // 1d -> 2d Array
    //const arr_1d = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 15, 7, 13, 14, 16]; // 4x4
    //const arr_1d = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 18, 7, 13, 17, 19, 14, 16, 20, 23, 15, 21, 22, 24]; // 4x6
    //const arr_1d = [1, 3, 4, 10, 11, 18, 2, 5, 9, 12, 17, 19, 6, 8, 13, 16, 20, 23, 7, 14, 15, 21, 22, 24]; // 6x4
    const arr_1d = [1, 5, 4, 2, 5, 4, 3, 3, 2, 3, 3, 1, 3, 5, 1, 2];
    var arr_2d_test = [];
    var height = 4;
    var width = 4;
    for (var i = 0; i < arr_1d.length; i += width) {
        let tmp = [];
        for (var j = i; j < i + width; j++) {
            tmp.push(arr_1d[j]);
        }
        arr_2d_test.push(tmp);
    }
    console.log(arr_2d_test);

    // zig zag traversing
    var res_arr = [];
    var queue = [];
    var row = 0;
    var col;
    var min = height < width ? height : width;
    var max = height > width ? height : width;
    var i = 0;
    // first half
    while (row < min) {
        col = 0;
        let rowTemp = row;
        while (rowTemp >= 0) {
            queue.push(arr_2d_test[rowTemp][col]);
            rowTemp--;
            col++;
        }
        row++;
        i++;
    }
    console.log("Print other half");
    // second half
    col = height > width ? 0 : 1;
    var diff = height > width ? Math.abs(height - width) : 1
    var i = 0;
    while (i < max - 1) {
        let colTemp = col;
        row = height - diff;
        while (row >= 0 && colTemp != width) {
            queue.push(arr_2d_test[row][colTemp]);
            row--;
            colTemp++;
        }
        if (diff != 1) {
            diff--;
        } else {
            col++;
        }
        i++;
        console.log(queue);
        queue = [];
    }
}
