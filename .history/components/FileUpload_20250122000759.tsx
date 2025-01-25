'use client';
import React, { useRef, useState } from 'react';
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

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
  const onSucces = (res: any) => {
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
    }
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSucces}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
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
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filepath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filepath}
          path={file.filepath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
