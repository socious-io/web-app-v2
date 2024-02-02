import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadMedia } from 'src/core/api';

export const useFileUploader = (
  fileTypes: string[],
  maxFileNumbers: number,
  maxSize: number,
  setAttachments: (newVal: string[]) => void,
) => {
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
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
    const lowercaseFileTypes = fileTypes.map((t) => {
      return t.toLowerCase();
    });

    const acceptedTypes = {};
    types.forEach((item) => {
      if (lowercaseFileTypes.includes(item.key)) acceptedTypes[item.doc] = item.extention;
    });
    return acceptedTypes;
  };

  const getSubtitle = () => {
    let text = fileTypes.slice(0, fileTypes.length - 1).join();
    text = `${text} or ${fileTypes[fileTypes.length - 1]} (max. ${maxSize}mb)`;
    return text;
  };
  const onDrop = useCallback((acceptedFiles) => {
    let attachmentIds: string[] = [];
    acceptedFiles.forEach(async (file: File) => {
      if (file.size / 1000000 > maxSize) {
        setError(`Max file size is ${maxSize}mb`);
        return;
      }
      const res = await uploadMedia(file);
      setFileName(res.filename);
      attachmentIds = attachmentIds.concat(res.id);
      setAttachments(attachmentIds);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    maxFiles: maxFileNumbers,
  });
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return { getRootProps, getInputProps, getSubtitle, error, fileName };
};
