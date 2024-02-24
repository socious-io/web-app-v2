
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import css from './reviewModal.module.scss';
import { useReviewModal } from './useReviewModal';

export const ReviewModal = ({ open, handleClose }) => {

    const { register, errors, onSubmit, handleSubmit, selectedValue, setSelectedValue, cardOptionList } = useReviewModal();

    return (
        <Modal
            open={open}
            title='Give Review'
            handleClose={handleClose}
            mobileFullHeight={false}
            customStyle={css.modalWidth}
        >
            <div className='p-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-5'>
                        <h2 className='text-Gray-light-mode-700 font-semibold text-sm'>Review</h2>
                        <p className='text-sm font-normal text-Gray-light-mode-600 mb-1'>Share your experience working with [NAME] for this job.</p>
                        <Input
                            required
                            multiline
                            customHeight="92px"
                            register={register}
                            id="content"
                            name="content"
                            placeholder='Enter your Review ...'
                            errors={errors['content']?.message ? [errors['content']?.message.toString()] : undefined}
                        />
                    </div>
                    <div>
                        <h2 className='text-Gray-light-mode-700 font-semibold text-sm'>Your satisfaction</h2>
                        <p className='text-sm font-normal text-Gray-light-mode-600 mb-2'> How would rate the experience?</p>
                        <CardRadioButton
                            items={cardOptionList}
                            selectedValue={selectedValue} setSelectedValue={setSelectedValue}
                        />
                    </div>
                    <hr></hr>
                    <div className='flex justify-between pt-6 gap-3'>
                        <Button color='primary' className='w-full'>cancel</Button>
                        <Button color='primary' className='w-full' onClick={handleSubmit(onSubmit)}>submit</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
