# Encrypted Notes App!
Check out the dev blog - https://dev.to/17amir17/encrypted-note-editor-app-in-react-native-2m4b

![Screenshot 2024-03-04 at 17 31 06](https://github.com/10play/EncryptedNotesApp/assets/36531255/8bfc9e5a-03e8-45e1-88ef-100ac9bc6e6f)


### The Editor
The core of our app is the editor. We need an easy to use and robust rich text editor, that supports all of the features we want such as: headings, lists, placeholders, markdown, color, images, bold italic etc… For this we will use @10play/tentap-editor which is a rich text editor for react native based on Tiptap.

### Storing the notes
For storing the notes, we will use the amazing WatermelonDB package which is a popular sqlite wrapper for react-native. Instead of using the default package we will use a fork of this that uses sqlcipher instead of the regular sqlite, allowing us to encrypt the database by passing a secret key.

### Storing the secret key
Since our db requires a key, it is important to store that key somewhere secure, so we will use react-native-keychain which will store our key securely.

### Camera and Image Captioning
For taking pictures we will use react-native-vision-camera and for generating captions from the images, react-native-quick-tflite.
