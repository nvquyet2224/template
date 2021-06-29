import { TRIANGULATION } from './triangulation.js';

const NUM_KEYPOINTS = 468;
const NUM_IRIS_KEYPOINTS = 5;
const GREEN = '#32EEDB';
const RED = '#FF2C35';
const BLUE = '#157AB3';
let stopRendering = false;

function isMobile() {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isAndroid || isiOS;
}

function distance(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function drawPath(ctx, points, closePath) {
    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        region.lineTo(point[0], point[1]);
    }

    if (closePath) {
        region.closePath();
    }
    ctx.stroke(region);
}

let model, ctx, videoWidth, videoHeight, video, canvas,
    scatterGLHasInitialized = false, scatterGL, rafID;

const VIDEO_SIZE = 300;
const mobile = isMobile();

// Don't render the point cloud on mobile in order to maximize performance and

// to avoid crowding limited screen space.
const renderPointcloud = mobile === false;

const state = {
    backend: 'webgl',
    maxFaces: 1,
    triangulateMesh: true,
    predictIrises: true
};

if (renderPointcloud) {
    state.renderPointcloud = true;
}

async function setupCamera() {
    video = document.getElementById('video');

    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            // Only setting the video to a specified size in order to accommodate a
            // point cloud, so on mobile devices accept the default size.
            //width: mobile ? undefined : VIDEO_SIZE,
            //height: mobile ? undefined : VIDEO_SIZE
            width: mobile ? 320 : VIDEO_SIZE,
            height: mobile ? 240 : VIDEO_SIZE
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}


// Emotions
const emotions = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"];
let emotionModel = null,
    currentEmotion = "neutral";

async function predictEmotion(points) {
    let result = tf.tidy(() => {
        const xs = tf.stack([tf.tensor1d(points)]);
        return emotionModel.predict(xs);
    });
    let prediction = await result.data();
    result.dispose();
    // Get the index of the maximum value
    let id = prediction.indexOf(Math.max(...prediction));
    return emotions[id];
}


var blinkCount = 0;
async function renderPrediction() {
    if (stopRendering) {
        return;
    }

    const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
        predictIrises: true
    });

    ctx.drawImage(
        video, 0, 0, videoWidth, videoHeight, 0, 0, canvas.width, canvas.height);

    if (predictions.length > 0) {

        const prediction = predictions[0];
        const keypoints = prediction.scaledMesh;

        // Get faceScale form eye
        const eyeDist = Math.sqrt(
            (prediction.annotations.leftEyeUpper1[3][0] - prediction.annotations.rightEyeUpper1[3][0]) ** 2 +
            (prediction.annotations.leftEyeUpper1[3][1] - prediction.annotations.rightEyeUpper1[3][1]) ** 2 +
            (prediction.annotations.leftEyeUpper1[3][2] - prediction.annotations.rightEyeUpper1[3][2]) ** 2
        );
        const faceScale = eyeDist / 90;

        // Get distance mounth
        const lipsDist = Math.sqrt(
            (prediction.annotations.lipsLowerInner[5][0] - prediction.annotations.lipsUpperInner[5][0]) ** 2 +
            (prediction.annotations.lipsLowerInner[5][1] - prediction.annotations.lipsUpperInner[5][1]) ** 2 +
            (prediction.annotations.lipsLowerInner[5][2] - prediction.annotations.lipsUpperInner[5][2]) ** 2
        );

        // Mounth open
        if (lipsDist / faceScale > 15) {
            document.getElementById('mouth__info').innerHTML = 'Open';
        } else {
            document.getElementById('mouth__info').innerHTML = 'Close';
        }


        // Check EyeBlink
        checkEyeBlink(keypoints);

        // Check Emotion
        checkEmotion(prediction);


        // TriangulateMesh drawing
        // if (state.triangulateMesh) {
        //     ctx.strokeStyle = GREEN;
        //     ctx.lineWidth = 0.5;

        //     for (let i = 0; i < TRIANGULATION.length / 3; i++) {
        //         const points = [
        //             TRIANGULATION[i * 3], TRIANGULATION[i * 3 + 1],
        //             TRIANGULATION[i * 3 + 2]
        //         ].map(index => keypoints[index]);

        //         drawPath(ctx, points, true);
        //     }

        // } else { // Drawing not TriangulateMesh

        //     ctx.fillStyle = GREEN;

        //     for (let i = 0; i < NUM_KEYPOINTS; i++) {
        //         const x = keypoints[i][0];
        //         const y = keypoints[i][1];

        //         ctx.beginPath();
        //         ctx.arc(x, y, 1, 0, 2 * Math.PI);
        //         ctx.fill();
        //     }
        // }

        // Iris drawing
        // if (keypoints.length > NUM_KEYPOINTS) {
        //     ctx.strokeStyle = RED;
        //     ctx.lineWidth = 1;

        //     const leftCenter = keypoints[NUM_KEYPOINTS];
        //     const leftDiameterY = distance(
        //         keypoints[NUM_KEYPOINTS + 4], keypoints[NUM_KEYPOINTS + 2]);
        //     const leftDiameterX = distance(
        //         keypoints[NUM_KEYPOINTS + 3], keypoints[NUM_KEYPOINTS + 1]);

        //     ctx.beginPath();
        //     ctx.ellipse(
        //         leftCenter[0], leftCenter[1], leftDiameterX / 2, leftDiameterY / 2,
        //         0, 0, 2 * Math.PI);
        //     ctx.stroke();

        //     if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
        //         const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];
        //         const rightDiameterY = distance(
        //             keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
        //             keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]);
        //         const rightDiameterX = distance(
        //             keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
        //             keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]);

        //         ctx.beginPath();
        //         ctx.ellipse(
        //             rightCenter[0], rightCenter[1], rightDiameterX / 2,
        //             rightDiameterY / 2, 0, 0, 2 * Math.PI);
        //         ctx.stroke();
        //     }
        // }

    }

    //stats.end();
    rafID = requestAnimationFrame(renderPrediction);
};

async function checkEyeBlink(keypoints) {

    let leftEye_l = 263;
    let leftEye_r = 362;
    let leftEye_t = 386;
    let leftEye_b = 374;

    let rightEye_l = 133;
    let rightEye_r = 33;
    let rightEye_t = 159;
    let rightEye_b = 145;

    let aL = euclidean_dist(keypoints[leftEye_t][0], keypoints[leftEye_t][1], keypoints[leftEye_b][0], keypoints[leftEye_b][1]);
    let bL = euclidean_dist(keypoints[leftEye_l][0], keypoints[leftEye_l][1], keypoints[leftEye_r][0], keypoints[leftEye_r][1]);
    let earLeft = aL / (2 * bL);

    let aR = euclidean_dist(keypoints[rightEye_t][0], keypoints[rightEye_t][1], keypoints[rightEye_b][0], keypoints[rightEye_b][1]);
    let bR = euclidean_dist(keypoints[rightEye_l][0], keypoints[rightEye_l][1], keypoints[rightEye_r][0], keypoints[rightEye_r][1]);
    let earRight = aR / (2 * bR);

    if ((earLeft < 0.1) || (earRight < 0.1)) {
        blinkCount++;
        document.getElementById('blink__info').innerHTML = blinkCount;
    }

}

async function checkEmotion(prediction) {
    // Emotions
    const x1 = prediction.boundingBox.topLeft[0];
    const y1 = prediction.boundingBox.topLeft[1];
    const x2 = prediction.boundingBox.bottomRight[0];
    const y2 = prediction.boundingBox.bottomRight[1];
    const bWidth = x2 - x1;
    const bHeight = y2 - y1;

    const features = [
        "noseTip",
        "leftCheek",
        "rightCheek",
        "leftEyeLower1",
        "leftEyeUpper1",
        "rightEyeLower1",
        "rightEyeUpper1",
        "leftEyebrowLower", //"leftEyebrowUpper",
        "rightEyebrowLower", //"rightEyebrowUpper",
        "lipsLowerInner", //"lipsLowerOuter",
        "lipsUpperInner", //"lipsUpperOuter",
    ];

    let points = [];
    features.forEach(feature => {
        prediction.annotations[feature].forEach(x => {
            points.push((x[0] - x1) / bWidth);
            points.push((x[1] - y1) / bHeight);
        });
    });

    let upX = prediction.annotations.midwayBetweenEyes[0][0] - prediction.annotations.noseBottom[0][0];
    let upY = prediction.annotations.midwayBetweenEyes[0][1] - prediction.annotations.noseBottom[0][1];
    const length = Math.sqrt(upX ** 2 + upY ** 2);
    upX /= length;
    upY /= length;

    if (points) {
        let emotion = await predictEmotion(points);
        document.getElementById('emotion__info').innerHTML = emotion;
    }
}

function euclidean_dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
};


async function main() {

    await setupCamera();
    video.play();

    videoWidth = video.videoWidth;
    videoHeight = video.videoHeight;
    video.width = videoWidth;
    video.height = videoHeight;

    canvas = document.getElementById('output');
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    const canvasContainer = document.querySelector('.canvas-wrapper');
    canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

    ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.fillStyle = GREEN;
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 0.5;

    model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: state.maxFaces });

    emotionModel = await tf.loadLayersModel('model/facemo.json');

    renderPrediction();

};


main();
