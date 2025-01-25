'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {

  useForm,

} from 'react-hook-form';
import { z } from 'zod';
import FileUpload from '@/components/FileUpload';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { bookSchema } from '@/lib/validations';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ColorPicker from '../ColorPicker';
import { createBook } from '@/lib/admin/actions/book';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';

interface BookFormProps extends Partial<Book> {
  type?: 'create' | 'update';
}

const BookForm = ({ type, ...book }: BookFormProps) => {
  const router = useRouter();

   const inputStyle = 'w-full min-h-14 border-2 border-gray-200 text-base font-bold placeholder:font-normal text-black  focus-visible:ring-0 focus-visible:shadow-none' 
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 0,
      totalCopies: 0,
      coverUrl: '',
      coverColor: '',
      videoUrl: '',
      summary: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values);

    if(result.success){
      toast({
        title : 'Success',
        description : 'Book added successfully',
      });

      router.push(`/admin/books/${result.data.id}`);
    }else {
      toast({
        title : 'Error',
        description : 'Failed to add book',
        variant
      })
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book Title"
                  {...field}
                  className={inputStyle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'author'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book Author"
                  {...field}
                  className={inputStyle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'genre'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book Genre"
                  {...field}
                  className={inputStyle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'rating'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                type='number'
                min={1}
                max={5}
                  required
                  placeholder="Book Rating"
                  {...field}
                  className={inputStyle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'totalCopies'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                type='number'
                min={1}
                max={1000}
                  required
                  placeholder="Total Copies"
                  {...field}
                  className={inputStyle}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'coverUrl'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Book Image
              </FormLabel>
               <FileUpload
                onFileChange = {field.onChange}
                type = 'image'
                accept = 'image/*'
                placeholder = 'Upload Book Image'
                folder = 'books/covers'
                variant='light'
                value = {field.value}
               />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'coverColor'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Primary Color
              </FormLabel>

                <FormControl>
                  <ColorPicker
                    onPickerChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                    <Textarea
                        placeholder='Book Description'
                        className='book-form_input'
                        rows={10}
                        {...field}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'videoUrl'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Book Video
              </FormLabel>
                <FileUpload
                onFileChange = {field.onChange}
                type = 'video'
                accept = 'video/*'
                placeholder = 'Upload Book Video'
                folder = 'books/videos'
                variant='light'

                />
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name={'summary'}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal capitalize text-dark-500">
                Book Summary
              </FormLabel>
              <FormControl>
                    <Textarea
                        placeholder='Book Summary'
                        className='book-form_input'
                        rows={5}
                        {...field}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='book-form_btn text-white'>
            Add Book to Library
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
