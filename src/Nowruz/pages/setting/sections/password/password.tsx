import { useChangePasswordShared } from 'src/pages/change-password/change-password.shared';
import { Button } from 'src/components/atoms/button/button';
import css from "./password.module.scss";
import { Input } from 'src/components/atoms/input/input';
import { printWhen } from 'src/core/utils';
import { dialog } from 'src/core/dialog/dialog';

const Password = () =>{
    const { form, notMatchingPasswords, formIsValid, onSubmitDesktop } = useChangePasswordShared();
    function onChangePasswordSubmit() {
        const cb = () =>
        dialog.alert({ title: 'Successful', message: 'Password has been successfully changed' });
        onSubmitDesktop(cb);
    }
    return (
        <>
            <div className={css.borderSection}>
                <div className="w-full pt-8 items-center">
                    <h2 className="grow css.title">Password</h2>
                    <p className='text-sm font-normal text-Gray-light-mode-600 pt-1'>
                    If you have signed up via Google, please log out and use “forgot password” to reset your password. 
                    </p>
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-5 gap-4'>
                    <label>Password</label>
                    <div className='col-span-2'>
                        <Input
                            autoComplete="password"
                            register={form}
                            name="current_password"
                            type="password"
                            placeholder="Current password"
                        />
                    </div>
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-5 gap-4'>
                    <label>Confirm Password</label>
                    <div className='col-span-2'>
                        <Input
                            autoComplete="new-password"
                            register={form}
                            name="password"
                            type="password"
                            placeholder="New password"
                        />
                    </div>
                    
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-5 gap-4'>
                    <label>Confirm New Password</label>
                    <div className='col-span-2'>
                        <Input
                            autoComplete="new-password"
                            register={form}
                            name="confirm_new_password"
                            type="password"
                            placeholder="Confirm new password"
                        />
                    </div>
                </div>
            </div>
            {printWhen(<p className={css.passNotMatch}>- Passwords do not match</p>, notMatchingPasswords)}
            <div className="grid grid-cols-1 gap-4 place-items-end pt-8">
                <div className='flex gap-4'>
                    <Button color="white" className={css.cancelBtn}>Cancel</Button>
                
                    <Button className={css.saveBtn} disabled={!formIsValid} onClick={onChangePasswordSubmit}>Save</Button>
                </div>
            </div>
        </>

    )
}

export default Password;