"use client"
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload} from "imagekitio-next";
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';


const {
    env : {
        imagekit:{
            publicKey,
            urlEndpoint
        }
    }
} = config;

const authenticator = async()=>{
    try{
        const response = await fetch(`${config.env.apiEndpoint}/auth/imagekit`);

        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Failed with status ${response.status} : ${errorText}`);
        }

        const data = await response.json();
        const {signature, expire, token} = data;

        return {
            token,
            expire,
            signature
        }
    }catch(e:any){
        console.log(e)
        throw new Error("Failed to authenticate : ", e)
    }
}
interface Props {
    onFileChange : (filepath : string)=>void;
    
}
const ImageUpload = ({onFileChange} : {onFileChange : (filepath : string)=>void}) => {
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{filepath : string} | null>(null);

    const onError = (error:any)=>{
        console.log('error', error);
        toast({
            title : 'Upload Error',
            description : 'Failed to upload file',
            variant : 'destructive'
        })
    };
    const onSucces =(res : any)=>{
        setFile({ filepath: res.filePath });
        onFileChange(res.filePath);
        toast({
          title : 'Upload Success',
          description : `${res.filePath}File uploaded successfully`,
        })
      }
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator} >
        <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSucces}
        fileName='test-upload.png'
        />

        <button className='upload-btn' onClick={(e)=>{
            e.preventDefault();
            if(ikUploadRef.current){
                //@ts-ignore
                ikUploadRef.current?.click();
            }
        }}> 
            <Image src='/icons/upload.svg' 
            className='object-contain'
            width={20} height={20} alt='upload icon'/>
            <p className='text-base text-light-100'>Upload a file</p>
            {file && <p className='upload-filename'>{file.filepath}</p>}
        </button>
        {
            file && (
                <IKImage
                    alt={file.filepath}
                    path={file.filepath}
                    width={500}
                    height={300}

                />
            )
        }
    </ImageKitProvider>
  )
}

export default ImageUpload