function runLengthEncode() {
    const input = document.getElementById("fileInput");
    const reader = new FileReader();
    reader.onload = function() {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext("2d");
            context.drawImage(img, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            console.log(data.length);
            document.body.appendChild(canvas);
        }
        img.src = reader.result;
        //document.body.appendChild(img);
    }
    reader.readAsDataURL(input.files[0]);
}