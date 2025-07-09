import { useEffect, useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  /* ---------- helpers ---------- */
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  const onDrop = useCallback((acceptedFiles) => {
  const file = acceptedFiles[0];
  if (file) {
    previewFile(file);
    setSelectedFile(file);
    setValue(name, file);  // ✅ Add this line here
  }
}, [setValue, name]);

  /* ---------- react-dropzone ---------- */
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  /* ---------- react-hook-form wiring ---------- */
  useEffect(() => {
    register(name, { required: true });   // ✅ fixed
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  /* ---------- render ---------- */
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-white">
        {label} {!viewData && <sup className="text-pink-500">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-gray-600" : "bg-gray-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center
           rounded-md border-2 border-dotted border-gray-400 relative`}
      >
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col p-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="w-full h-[250px] object-cover rounded-md"
              />
            ) : (
              <ReactPlayer
                url={previewSource}
                controls
                width="100%"
                height="250px"
                className="rounded-md"
              />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-gray-300 underline text-sm"
              >
                Remove file
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6 text-gray-300">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-gray-800">
              <FiUploadCloud className="text-2xl text-yellow-400" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm">
              Drag and drop a {video ? "video" : "image"}, or{" "}
              <span
                onClick={open}
                className="font-semibold text-yellow-400 cursor-pointer"
              >
                browse
              </span>
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-xs text-center">
              <li>Aspect ratio&nbsp;16 : 9</li>
              <li>Recommended size&nbsp;1024 × 576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-500">
          {label} is required
        </span>
      )}
    </div>
  );
}
