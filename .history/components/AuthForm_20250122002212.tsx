'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import FileUpload from './FileUpload';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const isSignIn = type === 'SIGN_IN';

  const router = useRouter();

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if(result.success) {
      toast(
        {
          title : 'Success',
          description : isSignIn ? 'Signed in successfully' : 'Signed up successfully', 
        }
      )
      router.push("/")
    }else{
      toast({
        title : `Error ${isSignIn ? 'Signing in' : 'Signing up'}`,
        description : result.error || 'Failed to sign in',
        variant : "destructive"
      })
    }

  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome Back!' : 'Create an Account'}
      </h1>
      <p>
        {isSignIn
          ? 'Access the vast collection of books'
          : 'Join the community of book lovers'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                      <FileUpload
                      onFileChange = {field.onChange}
                      type = 'image'
                      accept = 'image/*'
                      placeholder = 'Upload University Card'
                      folder = 'university-cards'
                      var
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
            
                        {...field}
                        className='form-input'
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
        ))}
        <Button type="submit" className="form-btn">{isSignIn? "Sign In" : "Sign Up"}</Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium ">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-primary"
        >
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
