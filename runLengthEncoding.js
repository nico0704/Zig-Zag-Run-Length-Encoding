var result;
var greyscale_arr;
var element_counter;
var call_counter;
var height;
var width;

function runLengthEncode() {
    // init variables
    init();
    // get file and project image on canvas to get image data
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
            console.log(data);
            // store greyscale value for each pixel in array
            for (var i = 0; i < data.length; i += 4) {
                let avg = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
                greyscale_arr.push(avg);
            }
            height = canvas.height;
            width = canvas.width;

            // only for testing
            var arr_2d_test = make2dimArray(width, greyscale_arr);
            console.log(arr_2d_test);
            //

            // loop through the greyscale array and run-length-encode
            // algorithm works for all image sizes 
            var y = 0;
            var x = 0;
            // init prev_element with pixel in top left corner
            var prev_element = greyscale_arr[0];
            while (x < width && y < height) {
                // encode function needs (x,y) to calc the index of current element in the 1 dim greyscale array (x + y * width) 
                prev_element = encode(prev_element, x, y); 
                if (x >= width - 1 && y >= height - 1) {
                    break; // end
                }
                // check if algorithm has to go down or right in the next step
                if (x < width - 1) x++; // go right
                else y++; // go down
                // run through diagonal until x is 0 or y reaches height of the image
                while (x > 0 && y < height - 1) {
                    prev_element = encode(prev_element, x, y);
                    x--;
                    y++;
                }
                prev_element = encode(prev_element, x, y);
                // check if algorithm has to go down or right in the next step
                if (y < height - 1) y++; // go down
                else x++; // go right
                // run through diagonal until y is 0 or x reaches width of the image
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
    // (x + y * width) calculates the index of the element in the greyscale array
    var pos = x + y * width;
    var cur_element = greyscale_arr[pos];
    call_counter++; // counts the number of times the encode function gets called
    if (pos == 0) {
        // first element
        element_counter++;
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
    element_counter = 0;
    call_counter = 0;
    height = 0;
    width = 0;
}

// only for testing
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
