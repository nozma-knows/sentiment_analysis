const OpenAI = require("openai-api");
const openai = new OpenAI(
  "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"
);

export async function Responder(input) {
  const response = {};

  const gptResponse = await openai.complete({
    engine: "davinci",
    prompt: `This is a tweet sentiment classifier\n\n\nTweet: "I loved the new Batman movie!"\nSentiment: Positive\n###\nTweet: "I hate it when my phone battery dies."\nSentiment: Negative\n###\nTweet: "My day has been 👍"\nSentiment: Positive\n###\nTweet: "This is the link to the article"\nSentiment: Neutral\n###\nTweet: "${input}"\nSentiment:`,
    temperature: 0.3,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    stop: ["###"],
  });

  return gptResponse;
}
