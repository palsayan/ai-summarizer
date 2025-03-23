const pdfjs = require('pdfjs-dist');

exports.handler = async (event) => {
  try {
    const { file } = JSON.parse(event.body);
    const pdfData = Buffer.from(file, 'base64');
    const pdf = await pdfjs.getDocument(pdfData).promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};