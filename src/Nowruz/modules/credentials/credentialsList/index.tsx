import { Icon } from 'src/Nowruz/general/Icon';
import variables from 'src/components/_exports.module.scss';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './credentialsList.module.scss';
import { CreditStatus } from '../creditStatus';
import { useCredentialsList } from './useCredentialsList';
import { CreateUpdateExperience } from 'src/Nowruz/modules/userProfile/containers/createUpdateExperience';
import { toRelativeTime } from 'src/core/relative-time';
import { Chip } from '../../general/components/Chip';
import { PaginationMobile } from '../../general/components/paginationMobile';

export const CredentialList = () => {
  const {
    credentialsList,
    total,
    page,
    setPage,
    onApprove,
    onReject,
    onDetails,
    setOpenModal,
    openModal,
    experience,
    verified,
    userProfile,
    PER_PAGE,
  } = useCredentialsList();

  console.log('test log credentialsList', credentialsList);

  return (
    <>
      <div className={css.tableCereditList}>
        <table>
          <thead className="border border-Gray-light-mode-200">
            <tr className="text-xs font-medium text-Gray-light-mode-600">
              <th>Name</th>
              <th>Credential Type</th>
              <th className="flex items-center">
                Status
                <Icon name="arrow-down" />
              </th>
              <th>Created DATE</th>
              {!!verified && (
                <>
                  <th></th>
                  <th></th>
                  {!userProfile && <th></th>}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {credentialsList.map(item => (
              <tr className="text-sm font-normal text-left">
                <td className="flex justify-start items-center">
                  {userProfile ? (
                    <Avatar size="40px" type={'organizations'} />
                  ) : (
                    <Avatar size="40px" type={'users'} img={item.avatar?.url} />
                  )}

                  <div className="flex flex-col ml-3">
                    <span className="leading-7 text-Gray-light-mode-900">
                      {userProfile ? item.org.name : `${item.user.first_name} ${item.user.last_name}`}
                    </span>
                    <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                      {userProfile ? `@${item.org.shortname}` : `@${item.user.username}`}
                    </span>
                  </div>
                </td>
                <td>Experience</td>
                <td>
                  {item.status === 'PENDING' && <CreditStatus icon="clock" label="Pending" theme="secondary" />}
                  {item.status === 'APPROVED' && <CreditStatus icon="check" label="Approved" theme="primary" />}
                  {item.status === 'SENT' && (
                    <CreditStatus
                      icon={userProfile ? 'arrow-down' : 'arrow-up'}
                      label={userProfile ? 'Received' : 'Sent'}
                      theme="success"
                    />
                  )}
                  {item.status === 'REJECTED' && <CreditStatus icon="x-close" label="Rejected" theme="error" />}
                  {item.status === 'CLAIMED' && <CreditStatus icon="check" label="Claimed" theme="success" />}
                </td>
                <td>{toRelativeTime(item.created_at.toString())}</td>
                {verified &&
                  (userProfile ? (
                    <></>
                  ) : (
                    <>
                      <td>
                        <Icon
                          name="eye"
                          fontSize={20}
                          className="text-Gray-light-mode-600"
                          onClick={() => onDetails(item)}
                          cursor="pointer"
                        />
                      </td>
                      <td>
                        {item.status === 'PENDING' && (
                          <Icon
                            name="check"
                            fontSize={20}
                            className="text-Gray-light-mode-600"
                            onClick={() => onApprove(item.id)}
                            cursor="pointer"
                          />
                        )}
                      </td>
                      <td>
                        {item.status === 'PENDING' && (
                          <Icon
                            name="x-close"
                            fontSize={20}
                            className="text-Gray-light-mode-600"
                            onClick={() => onReject(item.id)}
                            cursor="pointer"
                          />
                        )}
                      </td>
                    </>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={css.paginationBox}>
        {total && (
          <div className="hidden md:block">
            <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
          </div>
        )}
        {total && (
          <div className="block md:hidden">
            <PaginationMobile page={page} count={Math.ceil(total / PER_PAGE)} handleChange={setPage} />
          </div>
        )}
      </div>

      <CreateUpdateExperience
        open={openModal}
        handleClose={() => setOpenModal(false)}
        experience={experience}
        readonly={true}
      />
    </>
  );
};
