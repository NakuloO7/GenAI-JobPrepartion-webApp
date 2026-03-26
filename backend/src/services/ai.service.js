const {GoogleGenAI} = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGeminAi(){
    const response = await ai.models.generateContent({
        model :"gemini-2.5-flash",
        contents : "Hello Gemini! How are you!"
    })
    console.log(response.text);
}

module.exports = invokeGeminAi;