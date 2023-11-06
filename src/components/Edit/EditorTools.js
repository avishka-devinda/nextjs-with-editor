import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Image from '@editorjs/image';

export const EDITOR_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },

  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file) {

          // Implement your image upload logic here
          // This function should return a promise with the uploaded image's data
          // For example, you can use fetch or Axios to send the image to your server for processing.
          // The server should then handle the upload to Cloudinary using the upload preset.
          // Finally, return the Cloudinary URL of the uploaded image.

          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              return { success: 1, file: { url: data.secure_url } };
            } else {
              throw new Error('Image upload failed');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
          }
        },
      },
    },
  },
};

// config: {
//   uploader: {
//       async uploadByFile(file) {
//           var storageRef = storage.ref();
//           var imagesRef = storageRef.child('EditorJS').child('images/'+ file.name);
//           var metadata = {
//               contentType: 'image/jpeg'
//           };
//           var uploadTask = await imagesRef.put(file, metadata);
//           console.log("Uploaded successfully!", uploadTask);
//           const downloadURL = await uploadTask.ref.getDownloadURL();
//           console.log(downloadURL);
//           return {
//               success: 1,
//               file: {
//                   url: downloadURL
//               }
//           }
//       }
//   }
// }