import { Avatar } from "src/Nowruz/modules/general/components/avatar/avatar";

const Team = () => {
    return(
        <>
            <div>
                <div className="w-full py-8 items-center">
                    <h2 className="grow css.title text-lg font-semibold">Team management</h2>
                    <p className='text-sm font-normal text-Gray-light-mode-600 pt-1'>
                        Manage your teams
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <h6>On teams</h6>
                    <p> You’re currently on these teams. </p>
                </div>
                <div className="col-span-3">
                    <div className="flex justify-between">
                        <div className="flex justify-start items-center">
                            <Avatar size="40px" type={'users'} img='' />
                            <div className="flex flex-col ml-3">
                                <span className="leading-7 text-Gray-light-mode-900">
                                Ocean Protection
                                </span>
                                <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                                @OceanProtection
                                </span>
                            </div>
                        </div>
                        <div>
                            Leave
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Team;