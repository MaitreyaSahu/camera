console.log('connected');
const video = document.querySelector('video');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.scale(-1, 1);

const lastImage = document.querySelector('#img-last');

console.log(screen);
const screenHeight = screen.height;
const screenWidth = screen.width;



let videoWidth = screen.width;
let videoHeight = screen.height;


function playVideo() {
    navigator.mediaDevices.getUserMedia({
            video: {
                width: {
                    ideal: screenWidth
                },
                height: {
                    ideal: screenHeight
                },
            },
            audio: false
        })
        .then(mediaStream => {
            console.log(mediaStream);
            video.srcObject = mediaStream;
            video.play();

            video.height = videoHeight = mediaStream.getVideoTracks()[0].getSettings().height;
            video.width = videoWidth = mediaStream.getVideoTracks()[0].getSettings().width;
            
            video.style.width = `${0.3 * videoWidth}px`;
            video.style.height = `${0.3 * videoHeight}px`;

            paintToCanvas();
            // let stream = mediaStream;
            // console.log(stream.getVideoTracks()[0].getSettings().deviceId,
            // stream.getVideoTracks()[0].getSettings().frameRate,
            // stream.getVideoTracks()[0].getSettings().height,
            // stream.getVideoTracks()[0].getSettings().width,
            // stream.getVideoTracks()[0].getSettings().frameRate);
        }).catch(err => alert('Please allow camera access...'));

}

function paintToCanvas() {
    const height = video.height;
    const width = video.width;

    canvas.height = videoHeight;
    canvas.width = videoWidth;

    setInterval(() => {
        //ctx.save();
        ctx.scale(-1,1);
        ctx.drawImage(video, -1 * width, 0, width, height);
        //ctx.restore();
    }, 20);
}

function clickImage(){
    let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/");
    let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);

    const imageData = canvas.toDataURL('image/jpeg');
    const list = document.createElement('li');
    const link = document.createElement('a');
    link.href = imageData;

    link.setAttribute('download', `img_${year + month + date}_${hour + minute + second}`);
    link.innerHTML = `<img src="${imageData}" alt="clicked images"></img>`;

    list.appendChild(link);
    //galleryList.appendChild(list);

    lastImage.setAttribute('src', imageData);
    lastImage.style.display = 'block';
}

playVideo();

const shutter = document.querySelector('#shutter-button');
shutter.addEventListener('click', clickImage);

const previewImage = document.querySelector('.gallery');
lastImage.style.display = "none";
previewImage.addEventListener('click', showGallery);

function showGallery(){

}