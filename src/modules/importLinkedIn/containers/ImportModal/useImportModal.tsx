import { useState } from 'react';
import { getOrganization, importLinkedin, PostMediaUploadRes, search } from 'src/core/api';

import { useLinkedInContext } from '../../contexts/linkedin.context';

export const useImportModal = () => {
  const [files, setFiles] = useState<PostMediaUploadRes[]>([]);
  const [showFiles, setShowFiles] = useState<File[]>([]);
  const { dispatch } = useLinkedInContext();

  const handleUpload = (uploadedFile: PostMediaUploadRes[]) => {
    // clearErrors('evidences');
    setFiles(uploadedFile);
    const uploadedIds = uploadedFile.map(upload => upload.id);
    // setValue('evidences', uploadedIds);
  };

  const handleDeleteUpload = (deletedIndex: number) => {
    const filteredFiles = files.filter((_, index) => deletedIndex !== index);
    handleUpload(filteredFiles);
  };

  // async function uploadImage(url: string) {
  //     const blob = await fetch(url).then(resp => resp.blob());
  //     const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  //     if (blob.size > MAX_IMAGE_SIZE) {
  //       setUploadError(`Image should be less than 5MB`);
  //     } else {
  //       setUploadError(``);

  //       const formData = new FormData();
  //       formData.append('file', blob);
  //       return uploadMedia(blob as File);
  //     }
  //   }

  const importLinkedinProfile = async () => {
    try {
      const res = await importLinkedin(showFiles[0]);

      // org_id: string;
      // title: string;
      // description?: string;
      // skills?: string[];
      // start_at: string;
      // end_at?: string;
      // job_category_id?: string;
      // country?: string;
      // city?: string;
      // employment_type?: ProjectType;
      // weekly_hours?: number | null;
      // total_hours?: number | null;
      // const orgRes = await search({ type: 'organizations', q: res.body.experiences }
      //     q: string;
      // filter: any;)

      // dispatch({ type: 'IMPORT_LINKEDIN_PROFILE', payload: { experiences: res.body.experiences } })
    } catch (e) {
      console.log('error in import linkedin API: ', e);
    }
  };
  return {
    data: { files, showFiles },
    operations: {
      handleUpload,
      handleDeleteUpload,
      setShowFiles,
      importLinkedinProfile,
    },
  };
};
