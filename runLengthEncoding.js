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

            // only for testing
            var arr_2d_test = [];
            var height = canvas.height;
            var width = canvas.width;
            for (var i = 0; i < greyscale_arr.length; i += width) {
                let tmp = [];
                for (var j = i; j < i + width; j++) {
                    tmp.push(greyscale_arr[j]);
                }
                arr_2d_test.push(tmp);
            }
            console.log(arr_2d_test);
            //
            // (y,x)
            // var y = 3;
            // var x = 2;
            // var pos = x + y * width;
            // console.log(greyscale_arr[pos]);
            // greyscale_arr = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 15, 7, 13, 14, 16]; // 4x4
            // greyscale_arr = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 18, 7, 13, 17, 19, 14, 16, 20, 23, 15, 21, 22, 24]; // 4x6
            // greyscale_arr = [1, 3, 4, 10, 11, 18, 2, 5, 9, 12, 17, 19, 6, 8, 13, 16, 20, 23, 7, 14, 15, 21, 22, 24]; // 6x4
            // width = 4;
            // height = 6;
            var result = "";
            var arr_tmp = [];
            var row = 0;
            var col = 0;
            var min = height < width ? height : width;
            var max = height > width ? height : width;
            var i = 0;

            // first half
            while (i < min) {
                col = 0;
                let rowTemp = row;
                while (rowTemp >= 0) {
                    pos = col + rowTemp * width;
                    //console.log(greyscale_arr[pos]);
                    arr_tmp.push(greyscale_arr[pos]);
                    rowTemp--;
                    col++;
                }
                console.log(arr_tmp);
                arr_tmp = [];
                if (i % 2 == 0) {
                    // andersrum
                    rowTemp = 0;
                    let colTemp = col;
                    while (colTemp >= 0) {
                        pos = colTemp + rowTemp * width;
                        arr_tmp.push(greyscale_arr[pos]);
                        colTemp--;
                        rowTemp++;
                    }
                    console.log(arr_tmp);
                    arr_tmp = [];
                    row++;
                    i++;
                }
                row++;
                i++;
            }
            col = 1;
            i = 0;
            // second half
            col = height > width ? 0 : 1;
            var diff = height > width ? Math.abs(height - width) : 1;
            i = 0;
            while (i < max - 1) {
                let colTemp = col;
                row = height - diff;
                while (row >= 0 && colTemp != width) {
                    pos = colTemp + row * width;
                    //console.log(greyscale_arr[pos]);
                    arr_tmp.push(greyscale_arr[pos]);
                    row--;
                    colTemp++;
                }
                console.log(arr_tmp);
                arr_tmp = [];
                if (diff != 1) {
                    diff--;
                } else {
                    col++;
                }
                i++;
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}
