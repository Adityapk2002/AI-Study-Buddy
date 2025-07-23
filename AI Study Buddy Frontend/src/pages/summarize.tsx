import { FileText } from 'lucide-react';
import React, { useState } from 'react';

import api from '../api/api';

export default function Summarize() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setSummary('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSummary(res.data.summary);
    } catch (error) {
      setSummary('Failed to summarize file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-1">
        <FileText className="text-gray-600 w-6 h-6" aria-hidden="true" />
        <h1 className="text-2xl font-semibold mb-4">Upload a File to Summarize</h1>
      </div>

      <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition duration-200">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <span className="text-gray-600">Click to upload or drag and drop</span>
        <span className="text-sm text-gray-400 mt-1">Only PDF for now</span>
      </label>

      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Selected file:</strong> {file.name}
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50"
        disabled={!file || loading}
      >
        {loading ? 'Summarizing...' : 'Summarize File'}
      </button>

      {summary && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <p className="whitespace-pre-wrap text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
}
