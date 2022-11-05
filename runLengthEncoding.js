var result;
var greyscale_arr;
var element_counter;
var call_counter;
var height;
var width;

function runLengthEncode() {
    init();
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
            //document.body.appendChild(canvas);
            height = canvas.height;
            width = canvas.width;

            // only for testing
            var arr_2d_test = make2dimArray(width, greyscale_arr);
            console.log(arr_2d_test);
            //

            // loop through the greyscale and run-length-encode
            var y = 0;
            var x = 0;
            var prev_element = greyscale_arr[0];
            while (x < width && y < height) {
                prev_element = encode(prev_element, x, y); // encode function will calc the index of current element (x + y * width)
                if (x >= width - 1 && y >= height - 1) {
                    break; // end
                }
                if (x < width - 1) x++; // go right
                else y++; // go down
                while (x > 0 && y < height - 1) {
                    prev_element = encode(prev_element, x, y);
                    x--;
                    y++;
                }
                prev_element = encode(prev_element, x, y);
                if (y < height - 1) y++; // go down
                else x++; // go right
                while (y > 0 && x < width - 1) {
                    prev_element = encode(prev_element, x, y);
                    y--;
                    x++;
                }
            }
            console.log(result);
            console.log("Call Counter: " + call_counter);
            document.getElementById("result").innerHTML = result;
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function encode(prev_element, x, y) {
    var pos = x + y * width;
    var cur_element = greyscale_arr[pos];
    call_counter++;
    if (pos == 0) {
        // first element
        return cur_element;
    }
    if (pos == greyscale_arr.length - 1) {
        // last element
        if (cur_element == prev_element) {
            element_counter++;
            result += element_counter + "-" + prev_element;
        } else {
            result += element_counter + "-" + prev_element + ";";
            result += 1 + "-" + cur_element;
        }
        return cur_element;
    }
    // not last element
    if (cur_element == prev_element) {
        element_counter++;
        return cur_element;
    }
    result += element_counter + "-" + prev_element + ";";
    element_counter = 1;
    return cur_element;
}

function init() {
    result = "";
    greyscale_arr = [];
    element_counter = 1;
    call_counter = 0;
    height = 0;
    width = 0;
}

function make2dimArray(width, greyscale_arr) {
    var resultArray = [];
    for (var i = 0; i < greyscale_arr.length; i += width) {
        let tmp = [];
        for (var j = i; j < i + width; j++) {
            tmp.push(greyscale_arr[j]);
        }
        resultArray.push(tmp);
    }
    return resultArray;
}
