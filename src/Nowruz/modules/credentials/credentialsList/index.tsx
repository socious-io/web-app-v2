import { Button } from 'src/components/atoms/button/button';
import { CredentialExperienceRes } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from "./credentialsList.module.scss";
import { CreditStatus } from '../creditStatus';

// import { useCredentialsList } from './useCredentialsList';

export const CredentialList = () => {
    //   const { credentials } = useCredentialsList();

    const credentials: CredentialExperienceRes[][] = [
        {
          id: '1',
          status: 'PENDING',
          experience: "Experience",
          user: {first_name:'Umaya',last_name:'Ninja',username:"unijina123"},
          org: "Organization",
          avatar: "Media",
          created_at: "Date",
          updated_at: "Date"
        },
        {
          id: '2',
          status: 'PENDING',
          experience: "Experience",
          user: {first_name:'Umaya',last_name:'Ninja',username:"unijina123"},
          org: "Organization",
          avatar: "Media",
          created_at: "Date",
          updated_at: "Date"
        },
        {
          id: '3',
          status: 'PENDING',
          experience: "Experience",
          user: {first_name:'Umaya',last_name:'Ninja',username:"unijina123"},
          org: "Organization",
          avatar: "Media",
          created_at: "Date",
          updated_at: "Date"
        }
      ];
    return (
        <>
            <div className='flex justify-end gap-3'>
                <Button color='white' size="m" className="w-20">Revoke</Button>
                <Button color='white' size="m" className="w-20">Delete</Button>
            </div>

            <div className={css.tableCereditList}>
                <table>
                    <thead className='border border-Gray-light-mode-200'>
                        <tr className='text-xs font-medium text-Gray-light-mode-600'>
                            <th className='flex gap-1 items-center'>
                                <Checkbox type='checkBox' size='small' id='credentialID'/>
                                <span>Credential ID</span>
                            </th>
                            <th>Recipent</th>
                            <th>Credential Type</th>
                            <th className='flex items-center'>
                                Status
                                <Icon name='arrow-down'/>
                            </th>
                            <th>Created DATE</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {credentials.map((item) => ( 
                        <tr className='text-sm font-normal text-left'>
                            <td className=''>
                                <div className='flex gap-1 items-center'>
                                    <Checkbox type='checkBox' size='small' id='credentialID'/>
                                    <span>
                                        {item.id}
                                    </span>
                                </div>
                            </td>
                            <td className='flex justify-start items-center'>
                                <Avatar size="40px" type={'users'} img={item.avatar?.url} />
                                <div className="flex flex-col ml-3">
                                    <span className="leading-7 text-Gray-light-mode-900">
                                        {item.user.first_name} {item.user.last_name}
                                    </span>
                                    <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">@{item.user.username}</span>
                                </div>
                            </td>
                            <td>
                                {item.org}
                            </td>
                            <td>
                                <CreditStatus icon="clock" label='Pending'/>
                            </td>
                            <td>
                                {item.created_at}
                            </td>
                            <td>
                                <Icon name="copy-02" fontSize={20} className="text-Gray-light-mode-600"  onClick={() =>  navigator.clipboard.writeText('test text')}/>
                            </td>
                            <td>
                                <Icon name="trash-01" fontSize={20} className="text-Gray-light-mode-600" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={css.paginationBox}> 
                <Pagination count={15} onChange={(e, p) => setPage(p)} />
            </div>
        </>
    );
};