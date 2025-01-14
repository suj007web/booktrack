import {Client as WorkflowClient} from '@upstash/workflow'
import config from './config'
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkflowClient({
    baseUrl : config.env.upstash.qstashUrl,
    token : config.env.upstash.qstashToken as string,
})

const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken as string });

export const sendEmail = async (
    {
        email,
        subject,
        message
    } : {
        email : string,
        subject : string,
        message : string
    }
) => {
    
await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken as string }),
    },
    body: {
      from: "Sujal Chauhan <chauhansujal1107@gmail.com>",
      to: [email],
      subject,
      html: message,
    },
  });
}

