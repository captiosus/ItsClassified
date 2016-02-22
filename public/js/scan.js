Dropzone.options.imagedropzone = {
  paramName:"image",
  maxFilesize: 2,
  uploadMultiple: false,
  autoProcessQueue:false,
  init:function(){
    // var submitButton = document.querySelector("#upload")
    var thisdropzone = this;
    // submitButton.addEventListener("click", function() {
    //   thisdropzone.processQueue();
    // });

    this.on('thumbnail', function(file, dataUrl){
      var thumbnails = document.getElementById('image-list').getElementsByTagName('img');
      for(var i = 0; i < thumbnails.length; i++){
        var thumbnail = thumbnails[i];
        if (thumbnail.getAttribute('alt') == file.name){
          console.log("match!");
          thumbnail.onclick =  function(){
            console.log("processingfile", file.filename);
            thisdropzone.processFile(file);
          };
        }
      }
    })
    this.on('success', function(file, res, err){
      console.log(res);
      drawBoxes(file, res);
      loading.style.display = "none";
      savebar.style.display = "block"
    })
  },
  accept:function(file, done){
    console.log("new file!", file);
    done();
  },
}

var drawBoxes = function(image, boxfile){
  var c = document.getElementById('censorme');
  c.style.display = 'block';
  var ctx = c.getContext("2d");
  var img = new Image();
  img.src = thumbnail.getAttribute('src')
  var aspect_ratio = image.height / image.width;
  var height = 600 * aspect_ratio;
  ctx.drawImage(img, 0, 0, 600, height);
  boxfile = boxfile.split('\n');
  var boxes = []
  for (var line in boxfile){
    line = boxfile[line].split(' ');//Char = index 0; xtopleft = index 1; ytopleft = index 2; xbottomright = index 3; ybottomright = index 4
    var box = [line[0]];
    console.log(line);
    for (var i = 1; i < line.length - 1; i++){
      box.push( parseInt(line[i]) * 2 / 10 );
    }
    console.log(box);
    ctx.beginPath();
    ctx.rect(box[1], c.height - box[2], Math.abs(box[3] - box[1]), -1 * Math.abs(box[4] - box[2]));
    ctx.stroke();
    boxes.push(box);
  }
};
