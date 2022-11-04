// i komplett durchlaufen lassen
// "ungerade" bilder z.B 11x11, 4x6
var result = "";
var greyscale_arr = [];
var counter = 1;
var height;
var width;

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
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
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
      //width = 4;
      //height = 4;
      var arr_tmp = [];
      var row = 0;
      var col = 0;
      var min = height < width ? height : width;
      var max = height > width ? height : width;
      var i = 0;
      var prev_element = greyscale_arr[0];

      // first half
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
        if (i % 2 == 0) {
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
      col = 1;
      i = 0;
      // second half
      while (i < width - 1) {
        let colTemp = col;
        row = height - 1;
        while (colTemp <= width - 1) {
          //console.log(colTemp +  " + " + row + " * " + width);
          pos = colTemp + row * width;
          prev_element = encode(prev_element, pos);
          //arr_tmp.push(greyscale_arr[pos]);
          row--;
          colTemp++;
        }
        //console.log(arr_tmp);
        //arr_tmp = [];
        if (i % 2 == 0 && i != height - 2) {
          colTemp = width - 1;
          let rowTemp = 2 + i;
          while (rowTemp < height) {
            //console.log(colTemp +  " + " + rowTemp + " * " + width);
            pos = colTemp + rowTemp * width;
            prev_element = encode(prev_element, pos);
            //arr_tmp.push(greyscale_arr[pos]);
            rowTemp++;
            colTemp--;
          }
          //console.log(arr_tmp);
          //arr_tmp = [];
          i++;
          col++;
        }
        i++;
        col++;
      }
      console.log(result);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
}

function encode(prev_element, pos) {
    console.log(pos);
    if (pos == 0) {
        // first element
        return greyscale_arr[pos];
    }
    if (pos == greyscale_arr.length - 1) {
        // last element
        if (greyscale_arr[pos] == prev_element) {
            counter++;
            result += counter + "-" + prev_element + " ";
        } else {
            result += counter + "-" + prev_element + " ";
            result += 1 + "-" + greyscale_arr[pos] + " ";
        }
        return greyscale_arr[pos];
    }
    // last element
    if (greyscale_arr[pos] == prev_element) {
        counter++;        
        return greyscale_arr[pos];
    }
    result += counter + "-" + prev_element + " ";
    counter = 1;
    return greyscale_arr[pos];

}
