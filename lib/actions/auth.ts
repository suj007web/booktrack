"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async(params : Pick<AuthCredentials, 'email' | 'password'>)=> {
    const {email, password} = params;

    const ip = (await headers()).get('x-forwarded-ip') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip)
    if(!success) {
        return redirect('/too-fast');
    }

    try{
        const result = await signIn('credentials', {
            email,
            password,
            redirect : false,
        })

        if(result.error) {
            return {success : false, error : result.error};
        }

        return {success : true};
    }catch(e){
        console.error(e);
        return {success : false, error : 'Failed to sign in'};
    }
}


export const signUp = async(params : AuthCredentials)=>{
    const {fullname, email, password, universityId, universityCard} = params;

    const ip = (await headers()).get('x-forwarded-ip') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip)
    if(!success) {
        return redirect('/too-fast');
    }
    const existingUser  = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

    if(existingUser.length > 0) {
       return {success : false, error : 'User already exists'};
    }

    const hashedPassword = await hash(password, 12);
    try{
        await db.insert(users).values({
            fullname,
            email,
            password : hashedPassword,
            universityId,
            universityCard
        })

        await signInWithCredentials({email, password});
        return {success : true};
    }catch(e){
        console.error(e);
        return {success : false, error : 'Failed to create user'};
    }
}