import React, { useState } from "react";
// import { Upload, X, User } from "lucide-react";

interface UploadInterfaceProps {
  type: "resume" | "profile";
}

const UploadInterface: React.FC<UploadInterfaceProps> = ({ type }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (type === "profile" && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      // Your upload logic
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6">
      {/* File Upload Input */}
      <div className="flex gap-2 mb-8">
        <label className="flex-1">
          <input
            type="file"
            accept={type === "resume" ? ".pdf,.doc,.docx" : "image/*"}
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="w-full px-4 py-3 bg-purple-600 text-white text-center rounded-lg font-medium cursor-pointer hover:bg-purple-700 transition-colors">
            {type === "resume" ? "Upload Resume" : "Upload Picture"}
          </div>
        </label>
      </div>

      {/* Profile Image Preview */}
      {type === "profile" && (
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-purple-600 overflow-hidden bg-gray-100 flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format"
                alt="Default profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          {type === "resume" ? "SAVE RESUME" : "SAVE PROFILE IMAGE"}
        </button>
        <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          {type === "resume" ? "DELETE RESUME" : "DELETE IMAGE FILE"}
        </button>
        <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          {type === "resume"
            ? "CHOOSE RESUME UPLOAD"
            : "CHOOSE PROFILE IMAGE UPLOAD"}
        </button>
      </div>

      {/* Bottom Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleCancel}
          className="w-full py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:border-gray-400 transition-colors"
        >
          CANCEL
        </button>
        <button
          onClick={handleUpload}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          UPLOAD
        </button>
      </div>
    </div>
  );
};

const UploadDocument: React.FC = () => {
  const [currentView, setCurrentView] = useState<"resume" | "profile">(
    "resume"
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        {/* View Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          {["resume", "profile"].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view as "resume" | "profile")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === view
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {view === "resume" ? "Resume Upload" : "Profile Upload"}
            </button>
          ))}
        </div>

        {/* Upload Interface */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {currentView === "resume"
              ? "Resume Upload Interface"
              : "Profile Image Upload Interface"}
          </h2>
          <UploadInterface type={currentView} />
        </div>

        {/* Features List */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            {[
              "File type validation",
              "Image preview functionality",
              "Responsive design",
              "Clean, modern interface",
              "Hover effects and transitions",
              "Consistent purple theme",
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
