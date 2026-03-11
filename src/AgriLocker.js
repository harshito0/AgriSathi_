import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AgriLocker.css";

const categories = ["All", "Crop Reports", "Govt Schemes", "Market", "Others"];

export default function AgriLocker({ onBack }) {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadCategory, setUploadCategory] = useState("Others");
  const [dragOver, setDragOver] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const fileInputRef = useRef();

  useEffect(() => {
    const storedFiles =
      JSON.parse(localStorage.getItem("agrilocker_files")) || [];
    setFiles(storedFiles.map((f) => ({ ...f, file: null })));
  }, []);

  useEffect(() => {
    const filesToStore = files.map(({ name, date, category, id }) => ({
      name,
      date,
      category,
      id,
    }));
    localStorage.setItem("agrilocker_files", JSON.stringify(filesToStore));
  }, [files]);

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files).map((file) => ({
      name: file.name,
      date: new Date().toLocaleDateString(),
      category: uploadCategory,
      file,
      id: Date.now() + Math.random(),
    }));
    setFiles((prev) => [...prev, ...uploaded]);
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      name: file.name,
      date: new Date().toLocaleDateString(),
      category: uploadCategory,
      file,
      id: Date.now() + Math.random(),
    }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDelete = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const filteredFiles =
    selectedCategory === "All"
      ? files
      : files.filter((f) => f.category === selectedCategory);

  const getFileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png"].includes(ext)) return "🖼️";
    if (["pdf"].includes(ext)) return "📄";
    if (["xls", "xlsx"].includes(ext)) return "📊";
    return "📁";
  };

  /* Preview controls */
  const openPreview = (index) => {
    setPreviewIndex(index);
    setZoom(1);
    setRotate(0);
  };

  const closePreview = () => setPreviewIndex(null);

  const nextPreview = () =>
    setPreviewIndex((prev) => (prev + 1) % filteredFiles.length);
  const prevPreview = () =>
    setPreviewIndex(
      (prev) => (prev - 1 + filteredFiles.length) % filteredFiles.length
    );

  const handleKeyDown = (e) => {
    if (previewIndex === null) return;
    if (e.key === "Escape") closePreview();
    if (e.key === "ArrowRight") nextPreview();
    if (e.key === "ArrowLeft") prevPreview();
    if (e.key === "+") setZoom((z) => z + 0.2);
    if (e.key === "-") setZoom((z) => Math.max(1, z - 0.2));
    if (e.key.toLowerCase() === "r") setRotate((r) => r + 90);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewIndex]);

  /* Swipe gesture for mobile */
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextPreview();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      prevPreview();
    }
  };

  return (
    <div className="p-4 min-h-screen bg-green-50">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500"
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl font-bold mb-4">📁 AgriLocker</h2>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap categories-wrapper">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn px-3 py-1 rounded ${
              selectedCategory === cat
                ? "bg-green-500 text-white"
                : "bg-white border border-green-400 text-green-700 hover:bg-green-100"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upload Section */}
      <div
        className={`mb-6 flex flex-col md:flex-row gap-2 items-center agri-upload ${
          dragOver ? "drag-over" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleUpload}
          className="border p-2 rounded bg-white w-full md:w-auto cursor-pointer"
        />
        <select
          value={uploadCategory}
          onChange={(e) => setUploadCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories
            .filter((c) => c !== "All")
            .map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
      </div>

      {/* Files List */}
      <div className="grid md:grid-cols-2 gap-4 grid-md-2">
        <AnimatePresence>
          {filteredFiles.map((f, index) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="file-card bg-white shadow-md p-3 rounded flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span>{getFileIcon(f.name)}</span>
                <div>
                  <p className="font-semibold">{f.name}</p>
                  <p className="text-xs text-gray-500">
                    {f.date} | {f.category}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {f.file && (
                  <button
                    onClick={() => openPreview(index)}
                    className="action-btn px-2 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
                  >
                    Preview
                  </button>
                )}
                {f.file && (
                  <a
                    href={URL.createObjectURL(f.file)}
                    download={f.name}
                    className="action-btn px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                  >
                    Download
                  </a>
                )}
                <button
                  onClick={() => handleDelete(f.id)}
                  className="action-btn px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredFiles.length === 0 && (
        <p className="mt-4 text-gray-500">No files in this category.</p>
      )}

      {/* Preview Modal */}
      {previewIndex !== null && (
        <div
          className="preview-modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bg-white rounded p-4 w-full max-w-3xl relative flex flex-col items-center">
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500"
            >
              Close
            </button>
            <h3 className="text-lg font-bold mb-2">
              {filteredFiles[previewIndex].name}
            </h3>

            {/* File Preview */}
            {filteredFiles[previewIndex].file &&
            filteredFiles[previewIndex].name.endsWith(".pdf") ? (
              <iframe
                src={URL.createObjectURL(filteredFiles[previewIndex].file)}
                title={filteredFiles[previewIndex].name}
                className="w-full h-96"
              ></iframe>
            ) : filteredFiles[previewIndex].file &&
              ["jpg", "jpeg", "png"].includes(
                filteredFiles[previewIndex].name.split(".").pop().toLowerCase()
              ) ? (
              <img
                src={URL.createObjectURL(filteredFiles[previewIndex].file)}
                alt={filteredFiles[previewIndex].name}
                className="max-h-96 object-contain"
                style={{ transform: `scale(${zoom}) rotate(${rotate}deg)` }}
              />
            ) : (
              <p>No preview available</p>
            )}

            {/* Controls */}
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              <button
                onClick={prevPreview}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                ⬅ Prev
              </button>
              <button
                onClick={nextPreview}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Next ➡
              </button>
              <button
                onClick={() => setZoom((z) => z + 0.2)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Zoom +
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Zoom -
              </button>
              <button
                onClick={() => setRotate((r) => r + 90)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Rotate ⟳
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ai-placeholder mt-8 text-center p-3 bg-green-100 rounded">
        💡 Tip: Drag & drop your crop reports or govt documents here! <br />
        Categorize them for quick access. Swipe or use arrows to preview files.
      </div>
    </div>
  );
}
