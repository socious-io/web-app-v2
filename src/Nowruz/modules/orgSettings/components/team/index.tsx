import { SearchDropdown } from "src/Nowruz/modules/general/components/SearchDropdown";
import css from "./team.module.scss";
import { useTeam } from "./useTeam";

const Team = () => {
    const {pipi} = useTeam();
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
        <div className="grid grid-cols-5 gap-4">
            <div>
                <h6>Invite team members</h6>
                <p>
                Invite member to post or manage your organization
                </p>
            </div>
            <div className="col-span-3">
                <SearchDropdown
                placeholder="Please select"
                icon="image-user"
                // options={memberList}
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
        <div>
            
        </div>
        </>
    );
};

export default Team;