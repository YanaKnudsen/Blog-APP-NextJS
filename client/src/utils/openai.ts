import { OpenAI } from 'openai';
import * as process from "process";

//const openai = new OpenAI(process.env.OPENAI_API_KEY);
/*const openai = new OpenAI({
    apiKey: process.env[process.env.OPENAI_API_KEY], // This is the default and can be omitted
});*/
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Access the environment variable directly
});
export default openai
