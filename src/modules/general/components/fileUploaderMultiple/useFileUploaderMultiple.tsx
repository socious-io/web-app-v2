import jpg from 'public/icons/nowruz/file-jpg.svg';
import pdf from 'public/icons/nowruz/file-pdf.svg';
import png from 'public/icons/nowruz/file-png.svg';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PostMediaUploadRes, uploadMediaWithProgress } from 'src/core/api';

export const useFileUploader = (
  fileTypes: string[],
  maxFileNumbers: number,
  maxSize: number,
  uploaded: PostMediaUploadRes[],
  setUploaded: (newVal: PostMediaUploadRes[]) => void,
  setShowFiles?: (files: File[]) => void,
  showFiles?: File[],
) => {
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>(showFiles || []);

  const getAcceptedFileTypes = () => {
    const types = [
      { key: 'doc', doc: 'application/msword', extention: ['.doc'] },
      {
        key: 'docx',
        doc: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        extention: ['.docx'],
      },
      { key: 'pdf', doc: 'application/pdf', extention: ['.pdf'] },
      { key: 'svg', doc: 'image/svg+xml', extention: ['.svg'] },
      { key: 'png', doc: 'image/png', extention: ['.png'] },
      { key: 'jpg', doc: 'image/jpeg', extention: ['.jpg'] },
      { key: 'gif', doc: 'image/gif', extention: ['.gif'] },
    ];
    const lowercaseFileTypes = fileTypes.map(t => {
      return t.toLowerCase();
    });

    const acceptedTypes = {};
    types.forEach(item => {
      if (lowercaseFileTypes.includes(item.key)) acceptedTypes[item.doc] = item.extention;
    });
    return acceptedTypes;
  };

  const getSubtitle = () => {
    let text = fileTypes.slice(0, fileTypes.length - 1).join();
    text = `${text} or ${fileTypes[fileTypes.length - 1]} (max. ${maxSize}mb)`;
    return text;
  };

  const readableFileSize = (filesize: number) => {
    const sizeInKb = filesize / 1024;

    if (sizeInKb > 1024) {
      return `${(sizeInKb / 1024).toFixed(2)} MB`;
    } else {
      return `${sizeInKb.toFixed(2)} KB`;
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'image/png') return png;
    if (fileType === 'application/pdf') return pdf;
    if (fileType === 'image/jpeg') return jpg;
  };
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      if (uploaded.length + acceptedFiles.length > maxFileNumbers) {
        setError('You are allowed to upload maximum ' + maxFileNumbers + ' files');
        return;
      }
      setProgress(0);
      setError('');
      const requests: Promise<PostMediaUploadRes>[] = [];
      acceptedFiles.forEach(f => {
        if (f.size > maxSize * 1024 * 1024) {
          setError(`Max file size is ${maxSize}mb`);
          return;
        } else {
          requests.push(uploadMediaWithProgress(f, setProgress));
        }
      });

      setUploading(true);
      const res = await Promise.all(requests);

      setUploaded([...uploaded, ...res]);
      setShowFiles?.([...files, ...acceptedFiles]);
      setFiles([...files, ...acceptedFiles]);
    } catch (e) {
      setError('Internal error in uploading files');
      console.log('error in uploading files', e);
    }
    setUploading(false);
  };

  const deleteFile = (deletedIndex: number) => {
    const filtered = files.filter((_, index) => index !== deletedIndex);
    setFiles(filtered);
    setShowFiles?.(filtered);
    setUploaded(uploaded.filter(item => files.map(f => f.name).includes(item.filename)));
    setError('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxFiles: maxFileNumbers,
  });

  return {
    getRootProps,
    getInputProps,
    getSubtitle,
    error,
    readableFileSize,
    getFileIcon,
    deleteFile,
    uploading,
    progress,
    files,
  };
};
