import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // your server-side functionality

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
    headers: {
      'content-type': 'application/json',
    },
  };
};

export { handler };
