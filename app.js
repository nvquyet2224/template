var config = {
    apiKey: "AIzaSyAhx6aA1P1cliR2DxLSlB_rc1f0c8MfqO8",
    authDomain: "real-word-153106.firebaseapp.com",
    databaseURL: "https://real-word-153106.firebaseio.com",
    //projectId: "real-word-153106",
    storageBucket: "real-word-153106.appspot.com",
    messagingSenderId: "1062413907913"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function () {
        console.log('have permission');
        return messaging.getToken();
    })
    .then(function (token) {
        console.log(token);
    })
    .catch(function (err) {
        console.log('Error Occured' );
    })