window.onload = function(){
    var minGallery = document.getElementById('minGallery');
    var xhr = new XMLHttpRequest();
    var renderImg = function(min, max, alt){
        var imgMIN = document.createElement('img');
        imgMIN.setAttribute('src', min);
        imgMIN.setAttribute('alt', alt);

        imgMIN.addEventListener('click', function(){
            var background = document.createElement('div');
            background.setAttribute('id', 'previewBackground');
            var imgMAX = document.createElement('img');
            imgMAX.setAttribute('src', max);
            imgMAX.setAttribute('alt', alt);
            imgMAX.setAttribute('id', 'imgMAX');

            var cancel = document.createElement('img');
            cancel.setAttribute('src', 'img/cancel.png');
            cancel.setAttribute('alt', 'cancel');
            cancel.setAttribute('id', 'cancel');
            cancel.addEventListener('click', function(){
                background.parentNode.removeChild(background);
            });

            background.appendChild(cancel);
            background.appendChild(imgMAX);
            minGallery.parentNode.appendChild(background);

        });
        return imgMIN;
    };
    xhr.open('GET', 'images.json', true);

    xhr.onreadystatechange = function(){
        if (xhr.readyState !== 4){
            return;
        }
        if (xhr.status !== 200){
            alert('Error!\n' + xhr.status + ': ' + xhr.statusText);
            return;
        }

        var images = JSON.parse(xhr.responseText);
        for(var i =0; i<images.length; i++) minGallery.appendChild(renderImg(images[i].min, images[i].max, images[i].alt))
    };
    xhr.send();

};