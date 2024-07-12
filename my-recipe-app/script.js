const URL = "./my_model/";

let model, webcam, labelContainer, maxPredictions;
let webcamStarted = false;

async function toggleWebcam() {
    if (webcamStarted) {
        stopWebcam();
    } else {
        await startWebcam();
    }
}

async function startWebcam() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    document.getElementById('webcam-button').textContent = 'Stop Webcam';
    webcamStarted = true;
}

function stopWebcam() {
    webcam.stop();
    document.getElementById("webcam-container").innerHTML = '';
    document.getElementById("label-container").innerHTML = '';
    document.getElementById('link-container').innerHTML = ''; // 오른쪽 패널 내용 삭제
    document.getElementById('webcam-button').textContent = 'Start Webcam';
    webcamStarted = false;
}

async function loop() {
    webcam.update();
    await predict(webcam.canvas);
    if (webcamStarted) {
        window.requestAnimationFrame(loop);
    }
}

async function predict(image) {
    const prediction = await model.predict(image);
    let highestProbability = 0;
    let bestClass = -1;

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = `${prediction[i].className}: ${prediction[i].probability.toFixed(2)}`;
        labelContainer.childNodes[i].innerHTML = classPrediction;

        if (prediction[i].probability > highestProbability) {
            highestProbability = prediction[i].probability;
            bestClass = i;
        }
    }

    updateLinks(bestClass);
}

function updateLinks(classIndex) {
    const linkContainer = document.getElementById('link-container');
    linkContainer.innerHTML = '';

    let links = [];
    if (classIndex === 0) {
        links = [
            { text: '페트병 리폼 간단하게 간접 조명 만들기', url: 'https://m.blog.naver.com/rkal2010/221058047531' },
            { text: '페트병으로 화분만들기', url: 'https://m.blog.naver.com/gomusin76/220337235993' },
            { text: '페트병으로 양말 서랍장 만들기', url: 'https://pgs1071.tistory.com/2730' }
        ];
    } else if (classIndex === 1) {
        links = [
            { text: 'Gmail', url: 'https://www.gmail.com' },
            { text: 'Naver Blog', url: 'https://blog.naver.com' },
            { text: 'Naver Map', url: 'https://map.naver.com' }
        ];
    }

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = '_blank';
        linkContainer.appendChild(a);
    });
}
