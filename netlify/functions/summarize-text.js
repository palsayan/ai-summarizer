const { pipeline } = require('@huggingface/transformers');

exports.handler = async (event) => {
  try {
    const { text, length = 'medium' } = JSON.parse(event.body);

    const lengthRatio = {
      short: 0.1,
      medium: 0.3,
      long: 0.5,
    };

    const summarizer = await pipeline('summarization', 'sshleifer/distilbart-cnn-12-6');
    const summary = await summarizer(text, {
      max_length: Math.floor(text.length * lengthRatio[length]),
      min_length: Math.floor(text.length * lengthRatio[length] * 0.5),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ summary: summary[0].summary_text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};