import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";

type userState = "non-active" | "active"

type InitialData = {
  email: string,
    fullname: string
}

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const THREE_DAYS_IN_MS = ONE_DAY_IN_MS * 3;
// const THIRTY_DAYS_IN_MS = ONE_DAY_IN_MS * 30;


const getUserState = async (email:string) : Promise<userState> => {
             const user = await db
             .select()
             .from(users)
             .where(eq(users.email, email))
             .limit(1)

             if(user.length === 0) return "non-active";

             const lastActivityDate = new Date(user[0].lastAcitivityDate as string);
             const now = new Date();
             const timeDiff = now.getTime() - lastActivityDate.getTime();

             if(timeDiff <= THREE_DAYS_IN_MS) return    "active";
             else return "non-active";
              
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullname } = context.requestPayload

  await context.run("new-signup", async () => {
    await sendEmail({
        email,
        subject: "Welcome to our BookTrack",
        message: `Hi ${fullname}, welcome to our BookTrack`
    })
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
            email,
            subject: "Are you still there?",
            message: `Hi ${fullname}, we miss you`
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
            email,
            subject: "Thank you for being active",
            message: `Hi ${fullname}, thank you for being active`
        })
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})




