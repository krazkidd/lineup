import { Buffer } from 'node:buffer';
import { Module } from 'node:module';

import OpenAI from "openai";

// ESM not supported by sharp
const require = Module.createRequire(import.meta.url);
const sharp = require('sharp');

export async function main(event, context) {
  try {
    if (!event.teamName) {
      throw "ERROR: Missing param 'teamName'";
    } else if (!event.primaryColor) {
      throw "ERROR: Missing param 'primaryColor'";
    } else if (!event.secondaryColor) {
      throw "ERROR: Missing param 'secondaryColor'";
    } else if (!event.userId) {
      throw "ERROR: Missing param 'userId'";
    }
  } catch (error) {
    console.log(error);

    return {
      body: error,
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain'
      },
    };
  }

  console.log(event.teamName, event.primaryColor, event.secondaryColor, event.userId);

  const prompt = `
    Create a simple, stylized logo for a recreational softball team named
    "${event.teamName}". The logo should feature two main colors: a primary
    color specified by the hex code #${event.primaryColor} and a secondary color,
    specified by the hex code #${event.secondaryColor}. The design should be clean,
    using these colors in a balanced manner to create a visually appealing and
    memorable logo. The logo should embody the dynamism and spirit of softball.
    Incorporate abstract elements or stylized versions of relevant sports equipment,
    like balls, bats, or gloves, to hint at the sport without overcrowding the
    design. Ensure the logo is versatile, suitable for use on merchandise, team
    uniforms, and promotional materials.
  `;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG,
  });

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      //style: "natural", // or "vivid"
      prompt,
      size: "1024x1024",
      quality: "standard",
      //TODO find out why these are not being accepted by the API
      //timeout: 30 * 1000, // 30 seconds (default is 10 minutes)
      //maxRetries: 2,
      response_format: "b64_json", // or "url",
      user: event.userId
    });

    // response = {
    //   b64_json: ..., // or
    //   url: ...,
    //   revised_prompt: ...
    // }

    //console.log(response.data[0].url);

    const inputBuf = Buffer.from(response.data[0].b64_json, 'base64');
    const sharpObj = sharp(inputBuf)
      // make sure we fit under DigitalOcean's 1MB response size limit
      .resize(400, 400)
      .png();

    return {
      body: (await sharpObj.toBuffer()).toString('base64'),
      //body: response.data[0].url,
      //statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    };
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);

      // NOTE: It seems safe enough to return OpenAPI code/message.
      //       Source: https://platform.openai.com/docs/guides/error-codes/api-errors

      return {
        body: error.response.data,
        statusCode: error.response.status,
        headers: {
          'Content-Type': 'text/plain'
        },
      };
    } else {
        console.log(error.message);
    }
  }

  return {
    body: 'Unknown error',
    statusCode: 500,
    // headers: {
    //   'Content-Type': 'text/plain'
    // },
  };
}