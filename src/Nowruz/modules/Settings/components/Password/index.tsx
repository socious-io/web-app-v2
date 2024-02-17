import { usePassword } from './usePassword';
import { Button } from "src/Nowruz/modules/general/components/Button/index"
import css from "./password.module.scss";
import { Input } from 'src/Nowruz/modules/general/components/input/input';

const Password = () =>{
    const { register, handleSubmit, errors, onSubmit, isFormValid,
        isPasswordLengthValid, isPasswordPatternValid, reset,isPasswordMatch } = usePassword();

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
            <form id='passwordForm' onSubmit={handleSubmit(onSubmit)}>
                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Password</label>
                        <div className='col-span-2'>
                            <Input
                                id='current_password'
                                autoComplete="current_password"
                                register={register}
                                name="current_password"
                                type="password"
                                placeholder="New password"
                            />
                        </div>
                    </div>
                </div>
                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Confirm Password</label>
                        <div className='col-span-2'>
                            <Input id="password" type="password" name="password" register={register} placeholder="password" />
                        </div>
                        
                    </div>
                </div>
                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Confirm New Password</label>
                        <div className='col-span-2'>
                            <Input
                                autoComplete="confirm"
                                register={register}
                                name="confirm"
                                type="password"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${css.validation} mt-4`}>
                        <img
                        className="mr-1"
                        src={isPasswordLengthValid ? '/icons/green-check.svg' : '/icons/grey-check.svg'}
                        alt="check"
                        />
                        Must be at least 8 characters
                    </div>
                    <div className={`${css.validation} mt-2`}>
                        <img
                        className="mr-1"
                        src={isPasswordPatternValid ? '/icons/green-check.svg' : '/icons/grey-check.svg'}
                        alt="check"
                        />
                        Must contain one special character
                    </div>
                    <div className={`${css.validation} mt-2 mb-4`}>
                        <img
                        className="mr-1"
                        src={isPasswordMatch ? '/icons/green-check.svg' : '/icons/grey-check.svg'}
                        alt="check"
                        />
                        Password match
                    </div>
                </div>
                {/* {!isPasswordMatch && 'popo'} */}
                <div className="grid grid-cols-1 gap-4 place-items-end pt-8">
                    <div className='flex gap-4'>
                        <Button color="primary" onClick={()=> reset()}>Cancel</Button>
                    
                        <Button disabled={!isFormValid} color="primary" block onClick={handleSubmit(onSubmit)}>Update Password</Button>
                    </div>
                </div>
            </form>
        </>

    )
}

export default Password;