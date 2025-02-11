import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLinkedinProfileAdaptor } from 'src/core/adaptors';
import { PostMediaUploadRes } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { setLinkedIn } from 'src/store/reducers/linkedin.reducer';

export const useImportLinkedInModal = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const [files, setFiles] = useState<PostMediaUploadRes[]>([]);
  const [showFiles, setShowFiles] = useState<File[]>([]);

  const handleUpload = (uploadedFile: PostMediaUploadRes[]) => setFiles(uploadedFile);

  const handleDeleteUpload = (deletedIndex: number) => {
    const filteredFiles = files.filter((_, index) => deletedIndex !== index);
    handleUpload(filteredFiles);
  };

  const importLinkedinProfile = async () => {
    try {
      const { error, data } = await getLinkedinProfileAdaptor(showFiles[0]);
      if (error) return;
      if (data) {
        dispatch(setLinkedIn(data));
        updateSelectedStep(2);
      }
    } catch (e) {
      console.log('error in import linkedin API: ', e);
    }
  };

  return {
    data: { files, showFiles },
    operations: {
      updateSelectedStep,
      setShowFiles,
      handleUpload,
      handleDeleteUpload,
      importLinkedinProfile,
    },
  };
};
