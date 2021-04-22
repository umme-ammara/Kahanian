import firebase from "firebase/app"
import "firebase/auth"

// ahmeds
//const app = firebase.initializeApp({
  //  apiKey:"AIzaSyCW0EaJOTVe_nwob0glrZLKZpU071rxdyQ",
  //  authDomain: "kahanian-webapp-6d247.firebaseapp.com",
  //  databaseURL: "https://kahanian-webapp-6d247-default-rtdb.firebaseio.com/",
  //  projectId: "kahanian-webapp-6d247",
  //  storageBucket: "kahanian-webapp-6d247.appspot.com",
  //  messagingSenderID: "52238537759",
 //   appId: "1:52238537759:web:45fa499eaa7acfe075f12a",
//});

//Github one 
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyA0HqZJ9SkBxTfij0JAZ_WOJDhFOa5-KGQ",
//     authDomain: "kahanian-8a964.firebaseapp.com",
//     databaseURL: "https://kahanian-8a964-default-rtdb.firebaseio.com",
//     projectId: "kahanian-8a964",
//     storageBucket: "kahanian-8a964.appspot.com",
//     messagingSenderId: "517649492810",
//     appId: "1:517649492810:web:0d3cdb51952cedeeb3efb3",
//     measurementId: "G-ES2PVNM24G"
// })


// const app = firebase.initializeApp({
//     apiKey: "AIzaSyA0HqZJ9SkBxTfij0JAZ_WOJDhFOa5-KGQ",
//     authDomain: "kahanian-8a964.firebaseapp.com",
//     databaseURL: "https://kahanian-8a964-default-rtdb.firebaseio.com",
//     projectId: "kahanian-8a964",
//     storageBucket: "kahanian-8a964.appspot.com",
//     messagingSenderId: "517649492810",
//     appId: "1:517649492810:web:0d3cdb51952cedeeb3efb3",
//     measurementId: "G-ES2PVNM24G"
// })

//Umme's Firebase 
const app = firebase.initializeApp({
apiKey: "AIzaSyA0HqZJ9SkBxTfij0JAZ_WOJDhFOa5-KGQ",
    authDomain: "kahanian-8a964.firebaseapp.com",
    databaseURL: "https://kahanian-8a964-default-rtdb.firebaseio.com",
    projectId: "kahanian-8a964",
    storageBucket: "kahanian-8a964.appspot.com",
    messagingSenderId: "517649492810",
    appId: "1:517649492810:web:0d3cdb51952cedeeb3efb3",
    measurementId: "G-ES2PVNM24G"
})


export const auth = app.auth();
export {app};