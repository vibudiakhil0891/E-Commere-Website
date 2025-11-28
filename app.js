// Paste your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Upload Image
const uploadBtn = document.getElementById('uploadBtn');
if (uploadBtn) {
  uploadBtn.addEventListener('click', () => {
    const file = document.getElementById('imageUpload').files[0];
    const title = document.getElementById('imageTitle').value;
    const uploadMsg = document.getElementById('uploadMsg');

    if (!file || !title) {
      uploadMsg.innerText = "Please select a file and enter a title.";
      return;
    }

    const storageRef = storage.ref(`images/${title}_${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', null,
      error => uploadMsg.innerText = "Upload failed: " + error,
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          localStorage.setItem(title, url);
          uploadMsg.innerText = "Image uploaded successfully!";
        });
      }
    );
  });
}

// Display Images
const gallery = document.getElementById('gallery');
if (gallery) {
  Object.keys(localStorage).forEach(title => {
    const url = localStorage.getItem(title);
    const img = document.createElement('img');
    img.src = url;
    img.alt = title;
    gallery.appendChild(img);
  });
}
