import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';


const notify = async (message: string): Promise<boolean> => {
    
    const body = {content: message}

    const resp = await fetch(process.env.DISCORD_WEBHOOK_URL ?? '', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if(!resp.ok){
        console.log('Error sending message to Discord');
        return false;
    }

    return true;
};

const onStar = (payload: any): string => {

    const {action , sender , repository} = payload;

    return `User ${sender.login} ${action} just starred ${repository.full_name}!`;
};

const onIssue = (payload: any): string => {
    
        const {action , issue} = payload;
    
        if( action  === 'opened') return `New issue opened by ${issue.user.login}!`;
        if( action  === 'closed') return `Issue closed by ${issue.user.login}!`;
        if( action  === 'reopened') return `Issue reopened by ${issue.user.login}!`;
};

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // your server-side functionality

  //link with the github webhook
  const githubEvent = event.headers['x-github-event'] ?? 'unknown';
  const payload = JSON.parse(event.body ?? '{}');
  let message: string;

  switch(githubEvent){
        case 'star':
            message = onStar(payload);
            break;
        case 'issues':
            message = onIssue(payload);
            break;
        default:
            message = `Unhandled Github event ${githubEvent}`;
    }

  await notify(message);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Done' }),
    headers: {
      'content-type': 'application/json',
    },
  };
};

export { handler };
