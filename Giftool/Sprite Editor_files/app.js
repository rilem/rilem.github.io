window.onload = function () {
    var canvas = document.getElementById('canvas'),
        anchor = document.getElementById('download'),
        nameElement = document.getElementById('name'),
        paddingElement = document.getElementById('padding'),
        jsonText = document.getElementById('jsonText'),
        addEventHandler = function (obj, evt, handler) {
            if (obj.addEventListener) {
                // W3C method
                obj.addEventListener(evt, handler, false);
            } else if (obj.attachEvent) {
                // IE method.
                obj.attachEvent('on' + evt, handler);
            } else {
                // Old school method.
                obj['on' + evt] = handler;
            }
        },
        cancel = function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        },
        gif = null,
        globalWidth = 0,
        globalHeight = 0,
        loadImage = function (array, gifImage, filename, onReady) {
            var sup1 = new SuperGif({
                gif: gifImage,
                auto_play: false
            });
            sup1.load_raw(array, function () {
                gif = sup1;
                addGif(sup1, filename, onReady);
                // splitGif();
                // document.body.appendChild(sup1.get_canvas())
            });
        },
        addGif = function (superGif, filename, onReady) {
            var i,
                img = superGif.get_canvas(),
                width = img.width,
                height = img.height,
                len = superGif.get_length(),
                n = len,
                m = 1,
                padding = parseInt(paddingElement.value),
                animation = {},
                start = gifs.length,
                canvas,
                context;

            // set
            if (!globalWidth) {
                globalWidth = width;
                globalHeight = height;
            } else {
                if (globalWidth !== width || globalHeight !== height) {
                    alert('Wrong image size: ' + filename);
                    return;
                }
            }

            animation.frames = [];

            for (i = 0; i < n * m; ++i) {
                superGif.move_to(i);
                img = superGif.get_canvas();
                canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                context = canvas.getContext('2d');
                context.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );
                //console.log(superGif.getDelay())

                animation.speed = parseFloat((1 / (superGif.getDelay() / 100 * 60)).toFixed(2));

                gifs.images.push(canvas);
                gifs.length += 1;
                animation.frames.push(start + i);
            }
            gifs.animations[filename] = animation;

            onReady();
        },
        gifs = {
            images: [],
            length: 0,
            animations: {}
        },
        json = {},
        splitGif = function () {
            var i,
                img = gifs.images[0],
                len = gifs.length,
                width = img.width,
                height = img.height,
                n = len,
                m = 1,
                context,
                padding = parseInt(paddingElement.value);


            // try to make a square
            n = Math.ceil(Math.sqrt(len));
            m = Math.ceil(len / n);

            canvas.width = (width + padding) * n - padding;
            canvas.height = (height + padding) * m - padding;

            context = canvas.getContext('2d');
            for (i = 0; i < len; ++i) {
                context.drawImage(
                    gifs.images[i],
                    0,
                    0,
                    width,
                    height, (i % n) * (width + padding),
                    Math.floor(i / n) * (height + padding),
                    width,
                    height
                );
            }
            json = {};
            json.imageName = nameElement.value || '';
            json.frameCountX = n;
            json.frameCountY = m;
            json.padding = padding;
            json.animations = gifs.animations;

            setText();
        },
        setText = function () {
            var jsonString;
            jsonString = JSON.stringify(json, null, 4);
            jsonText.innerHTML = jsonString;
            var blob = new Blob([jsonString], {
                type: "application/json"
            });
            var url = URL.createObjectURL(blob);

            anchor.download = (nameElement.value || 'animation') + ".json";
            anchor.href = url;
            anchor.textContent = "Download";

        };

    addEventHandler(nameElement, 'change', function () {
        json.imageName = nameElement.value;
        setText();
    });
    addEventHandler(paddingElement, 'change', splitGif);
    addEventHandler(document.body, 'dragover', cancel);
    addEventHandler(document.body, 'dragenter', cancel);
    addEventHandler(document.body, 'drop', function (e) {
        var dt, files, i, reader,
            loaded = 0;
        e = e || window.event; // get window.event if e argument missing (in IE)   
        if (e.preventDefault) {
            e.preventDefault();
        } // stops the browser from redirecting off to the image.

        dt = e.dataTransfer;
        files = dt.files;
        for (i = 0; i < files.length; i++) {
            (function (j) {
                var file = files[j],
                    filename;
                reader = new FileReader();
                filename = file.name.replace('.gif', '');
                //attach event handlers here...
                addEventHandler(reader, 'loadend', function () {
                    var reader2 = new FileReader(),
                        array = new Uint8Array(this.result);

                    //attach event handlers here...
                    addEventHandler(reader2, 'loadend', function () {
                        loadImage(array, this.result, filename, function () {
                            loaded += 1;
                            if (loaded === files.length) {
                                splitGif();
                            }
                        });
                    });
                    reader2.readAsDataURL(file);
                });
                reader.readAsArrayBuffer(file);
            })(i);
        }
        return false;
    });
};