import { SearchDropdown } from "src/Nowruz/modules/general/components/SearchDropdown";
import css from "./team.module.scss";
import { Button } from "src/Nowruz/modules/general/components/Button";
import { useTeam } from "./useTeam";
import { Avatar } from "src/Nowruz/modules/general/components/avatar/avatar";
import { Icon } from "src/Nowruz/general/Icon";

const Team = () => {
    const {members,onRemove} = useTeam();
    return(
        <>
            <div className={css.borderSection}>
                <div className="w-full py-8 items-center">
                    <h2 className="grow css.title text-lg font-semibold">Team management</h2>
                    <p className='text-sm font-normal text-Gray-light-mode-600 pt-1'>
                    Manage your team members and their account permissions here.  
                    </p>     
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 pt-6">
                <div>
                    <h6 className="text-sm font-semibold text-Gray-light-mode-700">Invite team members</h6>
                    <p className="text-sm font-normal text-Gray-light-mode-600">
                    Invite member to post or manage your organization
                    </p>
                </div>
                <div className="col-span-3">
                    <SearchDropdown
                    placeholder="Please select"
                    icon="image-user"
                    options={members?.items}
                    isSearchable
                    // onChange={(option) => onSelectExperienceLevel(option.value)}
                    />
                </div>
                <div>
                    <SearchDropdown
                        placeholder="Please select"
                        // options={EXPERIENCE_LEVEL_V2}
                        isSearchable
                        // onChange={(option) => onSelectExperienceLevel(option.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 align-bottom mt-4">
                <div>&nbsp;</div>
                <div className="col-span-3">
                    + Add another 
                </div>
                <div className="text-right">
                    <Button color="primary" size="medium" startIcon={<Icon name='mail-01'  fontSize={20} color={'#fff'}/>} className="">Send invites</Button>
                </div>
            </div>

            <div className={css.borderSection}></div>
            <div className="grid grid-cols-5 gap-4 pt-6">
                <div className="pt-6">
                    <h6 className="text-sm font-semibold text-Gray-light-mode-700">Invite team members</h6>
                    <p  className="text-sm font-normal text-Gray-light-mode-600">
                    Invite member to post or manage your organization
                    </p>
                </div>
                <div className="col-span-4">
                    <div className={css.tableCereditList}>
                        <table>
                            <thead className="border border-Gray-light-mode-200">
                                <tr className="text-xs font-medium text-Gray-light-mode-600">
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members?.items.map((i)=> (
                                    <tr className="text-sm font-normal text-left">
                                        <td className="w-3/5 flex justify-start items-center">
                                        <Avatar size="40px" type={'users'} img={i.avatar} />
                                            <div className="flex flex-col ml-3">
                                                <span className="leading-7 text-Gray-light-mode-900">
                                                {i.first_name} {i.last_name}
                                                </span>
                                                <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                                                @{i.username}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="w-1/5">{i.id}</td>
                                        <td  className="w-1/5 flex justify-start items-center gap-2">
                                            <div className="text-sm font-semibold text-Gray-light-mode-600" onClick={()=> onRemove(i.id) }>Delete</div>
                                            <div className="text-sm font-semibold text-Brand-700">Edit</div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Team;