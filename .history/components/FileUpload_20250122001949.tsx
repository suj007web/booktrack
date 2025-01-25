'use client';
import React, { useRef, useState } from 'react';
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed with status ${response.status} : ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return {
      token,
      expire,
      signature,
    };
  } catch (e: any) {
    console.log(e);
    throw new Error('Failed to authenticate : ', e);
  }
};
interface Props {
  onFileChange: (filepath: string) => void;
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'light' | 'dark';
}
const ImageUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filepath: string } | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border border-gray-100',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-500',
  };

  const onError = (error: any) => {
    console.log('error', error);
    toast({
      title: 'Upload Error',
      description: 'Failed to upload file',
      variant: 'destructive',
    });
  };
  const onSuccess = (res: any) => {
    setFile({ filepath: res.filePath });
    onFileChange(res.filePath);
    toast({
      title: 'Upload Success',
      description: `${res.filePath} File uploaded successfully`,
    });
  };

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File Size Error',
          description: 'Image size should be less than 20MB',
          variant: 'destructive',
        });
        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File Size Error',
          description: 'Video size should be less than 50MB',
          variant: 'destructive',
        });
        return false;
      }
    } 
    return true;
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({loaded, total}) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
        }}
        folder={folder}
        accept={accept}

      />

      <button
        className={cn('upload-btn', styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          className="object-contain"
          width={20}
          height={20}
          alt="upload icon"
        />
        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>
      
        {file && <p className={cn('upload-filename', styles.text)}>{file.filepath}</p>}
      </button>
        {progress > 0 && (
            <div className='w-full rounded-full bg-green-200 '>
                <div className='progress' style={{width: `${progress}%`}}>
                    ${progress}%
                </div>
            </div>
         )}
      {file && (
        (type === 'image'  ? 

            (
                <IKImage
                alt={file.filepath}
                path={file.filepath}
                width={500}
                height={300}
              />
            ) : type === 'video' ? (
        )
       
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
