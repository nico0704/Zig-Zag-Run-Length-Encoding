// i komplett durchlaufen lassen
// "ungerade" bilder z.B 11x11, 4x6
var result = "";
var greyscale_arr = [];
var counter = 1;
var height;
var width;
var counter_2 = 0;

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
            console.log("Data-Length: " + data.length);
            for (var i = 0; i < data.length; i += 4) {
                let avg = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
                greyscale_arr.push(avg);
            }
            document.body.appendChild(canvas);

            // only for testing
            var arr_2d_test = [];
            height = canvas.height;
            width = canvas.width;
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
            // greyscale_arr = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 15, 7, 13, 14, 16]; // 4x4
            // greyscale_arr = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 18, 7, 13, 17, 19, 14, 16, 20, 23, 15, 21, 22, 24]; // 4x6
            // greyscale_arr = [1, 3, 4, 10, 11, 18, 2, 5, 9, 12, 17, 19, 6, 8, 13, 16, 20, 23, 7, 14, 15, 21, 22, 24]; // 6x4
            //greyscale_arr = [1, 5, 4, 2, 3, 5, 4, 3, 3, 2, 2, 3, 3, 1, 3, 3, 5, 1, 2, 2, 5, 4, 2, 1, 5,]; //5x5
            //greyscale_arr = [1, 2, 4, 3, 5, 8, 6, 7, 9] // 3x3
            greyscale_arr = [0.0, 0.1, 0.2, 0.3, 1.0, 1.1, 1.2, 1.3,2.0, 2.1, 2.2, 2.3, 3.0, 3.1, 3.2, 3.3, 4.0, 4.1, 4.2, 4.3, 5.0, 5.1, 5.2, 5.3,]
            width = 4;
            height = 6;
            var y = 0;
            var x = 0;
            var pos;
            /*
            var arr_tmp = [];
            var row = 0;
            var col = 0;
            var min = Math.min(height, width);
            var max = Math.max(height, width);
            var i = 0;
            var prev_element = greyscale_arr[0];
            */
            while (x < width  || y < height ) {
                console.log(y + "," + x);
                if (x == width - 1 && y == height - 1) {
                    break;
                }
                if (x < width - 1) {
                    // nach rechts
                    x++;
                } else {
                    // nach unten
                    y++;
                }
                while (x > 0 && y < height - 1) {
                    console.log(y + "," + x);
                    x--;
                    y++;
                }
                console.log(y + "," + x);
                if (y < height - 1) {
                    // nach unten
                    y++;
                } else {
                    // nach rechts
                    x++;
                }
                while (y > 0 && x < width - 1) {
                    console.log(y + "," + x);
                    y--;
                    x++;
                }
            }
            

            



            /*
            while (i < min) {
                col = 0;
                let rowTemp = row;
                while (rowTemp >= 0) {
                    pos = col + rowTemp * width;
                    prev_element = encode(prev_element, pos);
                    //console.log(greyscale_arr[pos]);
                    //arr_tmp.push(greyscale_arr[pos]);
                    rowTemp--;
                    col++;
                }
                //console.log(arr_tmp);
                //arr_tmp = [];
                if (i % 2 == 0 && i != height - 1) {
                    // andersrum
                    rowTemp = 0;
                    let colTemp = col;
                    while (colTemp >= 0) {
                        pos = colTemp + rowTemp * width;
                        prev_element = encode(prev_element, pos);
                        //arr_tmp.push(greyscale_arr[pos]);
                        colTemp--;
                        rowTemp++;
                    }
                    //console.log(arr_tmp);
                    //arr_tmp = [];
                    row++;
                    i++;
                }
                row++;
                i++;
            }
            console.log("print second half");
            //console.log((width * height) % 2);
            var startNormal = false;
            if ((width * height) % 2 == 0) {
                // start normal
                startNormal = true;
                col = 1;
                i = 0;
            } else {
                // dont start normal
                startNormal = false;
                col = 1;
                i = 0;
            }
            // second half
            while (i < width - 1) {
                console.log("i: " + i);
                console.log("col " + col);
                let colTemp = col;
                row = height - 1;
                if (startNormal == true) {
                    //console.log("start normal");
                    while (colTemp <= width - 1) {
                        //console.log(colTemp +  " + " + row + " * " + width);
                        pos = colTemp + row * width;
                        console.log(greyscale_arr[pos]);
                        prev_element = encode(prev_element, pos);
                        //arr_tmp.push(greyscale_arr[pos]);
                        row--;
                        colTemp++;
                    }  
                }
                //console.log(arr_tmp);
                //arr_tmp = [];
                console.log("dont start normal");
                if (i % 2 == 0 && i != height - 2) {
                    colTemp = width - 1;
                    let rowTemp;
                    if (startNormal == false) {
                        rowTemp = 1;
                    } else {
                        rowTemp = 2 + i;
                    }
                    
                    console.log("rowTemp: " + rowTemp);
                    while (rowTemp < height) {
                        //console.log(colTemp +  " + " + rowTemp + " * " + width);
                        pos = colTemp + rowTemp * width;
                        console.log("1: " + greyscale_arr[pos]);
                        prev_element = encode(prev_element, pos);
                        //arr_tmp.push(greyscale_arr[pos]);
                        rowTemp++;
                        colTemp--;
                    }
                    //console.log(arr_tmp);
                    //arr_tmp = [];
                    if (startNormal == false) {
                        col = 0;
                        i++;
                    } else {
                        col++;
                        i++;
                    }
                    
                    startNormal = true;
                }
                i++;
                col++;
            }
            */
            console.log(result);
            console.log("Counter: " + counter_2);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function trav_second_half_from_top() {

}

function encode(prev_element, pos) {
    //console.log(pos);
    counter_2++;
    if (pos == 0) {
        // first element
        return greyscale_arr[pos];
    }
    if (pos == greyscale_arr.length - 1) {
        // last element
        if (greyscale_arr[pos] == prev_element) {
            counter++;
            result += counter + "*" + prev_element + ", ";
        } else {
            result += counter + "*" + prev_element + ", ";
            result += 1 + "*" + greyscale_arr[pos] + ", ";
        }
        return greyscale_arr[pos];
    }
    // last element
    if (greyscale_arr[pos] == prev_element) {
        counter++;
        return greyscale_arr[pos];
    }
    result += counter + "*" + prev_element + ", ";
    counter = 1;
    return greyscale_arr[pos];
}
