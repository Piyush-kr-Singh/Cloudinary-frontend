import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setLoading(true); // Set loading to true when starting the upload

      const formData = new FormData();
      formData.append('image', image);

      // const response = await axios.post('http://localhost:5000/upload', formData, {

      const response = await axios.post('https://cloudinary-backend-kappa.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data.url);

      // Display a success alert
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error.message);

      // Display an error alert
      alert('Error uploading image. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false when the upload is complete
    }
  };

  return (
    <div>
      <h1>MERN Cloudinary App</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}

export default App;
