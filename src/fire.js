import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGiEHSkQ',
	authDomain: 'shepherd-26d0c.firebaseapp.com',
	projectId: 'shepherd-26d0c',
	storageBucket: 'shepherd-26d0c.appspot.com',
	messagingSenderId: '245134197325',
	appId: '1:245134197325:web:4d9e53b830a50e3a80d204',
	measurementId: 'G-NTN13LMNP5',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
