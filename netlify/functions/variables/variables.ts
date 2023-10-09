import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // your server-side functionality
  const myVariable = process.env.MY_VARIABLE;

  console.log(myVariable);

  if(!myVariable) { 
    throw 'MY_VARIABLE is not defined';
    }

  return {
    statusCode: 200,
    body: JSON.stringify(myVariable),
    headers: {
      'content-type': 'application/json',
    },
  };
};

export { handler };
