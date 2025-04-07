import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageUrl,
  setImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const [localImageFile, setLocalImageFile] = useState(null);
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLocalImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setLocalImageFile(droppedFile);
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    try {
      const data = new FormData();
      data.append("my_file", localImageFile);
      
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setImageUrl(response.data.result.url); // Update parent state
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageLoadingState(false);
      setLocalImageFile(null);
    }
  }

  function handleRemoveImage() {
    setImageUrl(""); // Clear the image URL in parent state
    setLocalImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    if (localImageFile) {
      uploadImageToCloudinary();
    }
  }, [localImageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Product Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          accept="image/*"
        />
        
        {!imageUrl && !localImageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex items-center justify-center h-32">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2 ml-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileIcon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">
                  {localImageFile?.name || "Uploaded Image"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
            
            {imageUrl && (
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt="Uploaded product"
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Error";
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;