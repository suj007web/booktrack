import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import BookCoverSvg from './BookCoversvg';

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles : Record<BookCoverVariant, string> = {
    extraSmall : 'book-cover-extra_small',
    small : 'book-cover_small',
    medium : 'book-cover_medium',
    regular : 'book-cover_regular',
    wide : 'book-cover_wide',
}

interface BookCoverProps {
    className?: string;
    variant?: BookCoverVariant;
    coverColor: string;
    coverImage: string;
}

const BookCover = (
    {
        className,
        variant = "regular",
        coverColor = "#012B48",
        coverImage = "https://placehold.co/400x600.png",
    } : BookCoverProps
) => {
  return (
    <div className={cn('relative transition-all duration-300 m-auto', variantStyles[variant], className)}>
        <BookCoverSvg coverColor={coverColor}/>
        <div className='absolute z-10' style={{left : '12%', width:'87.5%', height:'88%'}} >
            <Image src={coverImage} alt='bookcover' fill className='rounded-sm object-fill' />
        </div>
    </div>
  )
}

export default BookCover