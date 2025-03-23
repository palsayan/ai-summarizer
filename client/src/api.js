import axios from 'axios';

export const summarizeText = async (text, length) => {
  const response = await axios.post('/.netlify/functions/summarize-text', { text, length });
  return response.data;
};

export const uploadPDF = async (file) => {
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  const response = await axios.post('/.netlify/functions/summarize-pdf', { file: base64 });
  return response.data;
};

export const uploadDocx = async (file) => {
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  const response = await axios.post('/.netlify/functions/summarize-docx', { file: base64 });
  return response.data;
};