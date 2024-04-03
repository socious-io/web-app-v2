import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import pdf from 'public/icons/nowruz/file-pdf.svg';
import jpg from 'public/icons/nowruz/file-jpg.svg';
import png from 'public/icons/nowruz/file-png.svg';

export const useFileUploader = (
  fileTypes: string[],
  maxFileNumbers: number,
  maxSize: number,
  files: File[],
  setFiles: (newVal: File[]) => void,
) => {
  const [error, setError] = useState('');
  const [totalSize, setTotalSize] = useState(0);
  useEffect(() => {
    console.log('test log totalSize', totalSize);
  }, [totalSize]);

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
  const onDrop = (acceptedFiles: File[]) => {
    const newUploadedSize = acceptedFiles.map(f => f.size).reduce((a, b) => a + b, 0);
    console.log('test log newUploadedSize', newUploadedSize);
    console.log('test log maxSize', maxSize * 1000000);
    const newTotal = totalSize + newUploadedSize;
    if (newTotal > maxSize * 1000000) {
      setError(`Max file size is ${maxSize}mb`);
      return;
    }

    setTotalSize(newTotal);
    setFiles([...files, ...acceptedFiles]);
  };

  const deleteFile = (deletedIndex: number) => {
    const filtered = files.filter((_, index) => index !== deletedIndex);
    console.log('test log filtered', filtered);
    setFiles(filtered);
    const size = filtered.map(f => f.size).reduce((a, b) => a + b, 0);
    setTotalSize(size);
    if (totalSize > maxSize * 1000000) setError(`Max file size is ${maxSize}mb`);
    else setError('');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxFiles: maxFileNumbers,
  });
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return { getRootProps, getInputProps, getSubtitle, error, readableFileSize, getFileIcon, totalSize, deleteFile };
};
