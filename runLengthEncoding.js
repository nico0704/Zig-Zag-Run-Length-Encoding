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
      // greyscale_arr = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 15, 7, 13, 14, 16]; // 4x4
      // greyscale_arr = [1, 3, 4, 10, 2, 5, 9, 11, 6, 8, 12, 18, 7, 13, 17, 19, 14, 16, 20, 23, 15, 21, 22, 24]; // 4x6
      // greyscale_arr = [1, 3, 4, 10, 11, 18, 2, 5, 9, 12, 17, 19, 6, 8, 13, 16, 20, 23, 7, 14, 15, 21, 22, 24]; // 6x4
      //width = 4;
      //height = 4;
      var result = "";
      var arr_tmp = [];
      var row = 0;
      var col = 0;
      var min = height < width ? height : width;
      var max = height > width ? height : width;
      var i = 0;
      var prev_element = greyscale_arr[0];
      var counter = 1;

      // first half
      while (i < min) {
        col = 0;
        let rowTemp = row;
        while (rowTemp >= 0) {
          pos = col + rowTemp * width;
          prev_element = encode(prev_element, counter, pos);
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
            prev_element = encode(prev_element, counter, pos);
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
          prev_element = encode(prev_element, counter, pos);
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
            prev_element = prev_element = encode(prev_element, counter, pos);
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
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
}

function encode(prev_element, counter, pos) {}
