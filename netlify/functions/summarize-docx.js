const mammoth = require("mammoth");

exports.handler = async (event) => {
  try {
    const { file } = JSON.parse(event.body);
    const buffer = Buffer.from(file, 'base64');

    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    const text = result.value;

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