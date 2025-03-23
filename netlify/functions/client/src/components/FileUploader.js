import React, { useState } from 'react';
import { uploadPDF, uploadDocx, summarizeText } from '../api';

const FileUploader = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file.type === 'application/pdf') {
      const { text } = await uploadPDF(file);
      const { summary } = await summarizeText(text, 'medium');
      setSummary(summary);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { text } = await uploadDocx(file);
      const { summary } = await summarizeText(text, 'medium');
      setSummary(summary);
    }
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {loading && <p>Processing...</p>}
      {summary && <p>Summary: {summary}</p>}
    </div>
  );
};

export default FileUploader;