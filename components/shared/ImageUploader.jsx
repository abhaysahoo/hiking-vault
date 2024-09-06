"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const ImageUploader = ({ setFormData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedKey, setUploadedKey] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if(rejectedFiles.length !== 0) {
      setError('Only .jpeg or .png image with size less than 100kb will be accepted');
    }

    if (acceptedFiles.length === 0) return; // No files accepted

    const file = acceptedFiles[0];
    setSelectedFile(file);
    setError(null);
    setUploadedKey(null); // Reset if replacing the image

    // Generate a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": ['.jpeg', '.png'] },
    maxFiles: 1,
    maxSize: 1024*100, //100kb
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Step 1: Get signed URL from the API
      const response = await fetch("/api/equipment/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        }),
      });

      if (response.ok) {
        console.log('Signed url generated successfully');
      } else {
        const { message } = await response.json();
        console.error(message);
        throw new Error("Something is wrong on the server-side, please try again later");
      }

      const { signedUrl, fileKey } = await response.json();

      // Step 2: Upload the file to S3 using the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (uploadResponse.ok) {
        console.log('Image uploaded successfully');
        setUploadedKey(fileKey);
        setFormData(prevFormData => ({
          ...prevFormData,
          image: fileKey,
        }));
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = () => {
    setSelectedFile(null);
    setPreviewSrc(null);
    setUploadedKey(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? "border-blue-400" : "border-neutral-300"
          }`}
      >
        <input {...getInputProps()} />
        {previewSrc ? (
          <div className="relative w-48 h-48 mx-auto">
            <Image
              src={previewSrc}
              alt="Selected Image"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ) : isDragActive ? (
          <p className="text-blue-400">Drop the image here...</p>
        ) : (
          <>
            <p className="text-sm">Drag &amp; drop an image here, or click to select one</p>
            <p className="text-xs text-neutral-500">max size: 100kb; supported formats: .jpeg, .png</p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {selectedFile && !uploadedKey && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleReplace}
            disabled={uploading}
            className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${uploading && "cursor-not-allowed opacity-50"}`}
          >
            Remove
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-4 py-2 bg-green-600 text-white rounded-md ${uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
              }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          
        </div>
      )}

      {uploadedKey && (
          <p className="mt-2 text-green-500 text-sm">Image uploaded successfully!</p>
      )}
    </div>
  );
};

export default ImageUploader;
