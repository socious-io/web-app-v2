import variables from 'src/components/_exports.module.scss';
import { formatDate } from 'src/core/time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './credentialsList.module.scss';
import { useCredentialsList } from './useCredentialsList';
import { CredentialDetails } from '../credentialDetails';
import { CreditStatus } from '../creditStatus';

export const CredentialList = () => {
  const {
    credentialsList,
    totalPage,
    setPage,
    onApprove,
    onReject,
    onView,
    setOpenModal,
    openModal,
    experience,
    onUpdateExperience,
    avatarInfo,
    selectedCredential,
    onSelectCredential,
  } = useCredentialsList();

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 justify-end">
        <Button
          color="inherit"
          variant="outlined"
          disabled={!selectedCredential}
          onClick={() => onApprove(selectedCredential)}
        >
          Approve
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          disabled={!selectedCredential}
          onClick={() => onReject(selectedCredential)}
        >
          Decline
        </Button>
      </div>
      <div className={css.tableCereditList}>
        <div className={css.header}>
          <div className="flex flex-[2_2_0%] gap-3">
            {/* <Checkbox id="select-all" /> */}
            Name
          </div>
          <div className="flex-1">Credential Type</div>
          <div className={css.col}>Status</div>
          <div className={css.col}>Requested Date</div>
          <div className={css.col} />
        </div>
        <div className="flex flex-col">
          {credentialsList.map(item => (
            <div key={item.id} className="flex items-center text-sm font-normal text-left px-6 py-4">
              <div className="flex flex-[2_2_0%] justify-start items-center gap-3">
                <Checkbox
                  id={item.id}
                  checked={selectedCredential === item.id}
                  onChange={() => onSelectCredential(item.id)}
                  disabled={item.status !== 'PENDING'}
                />
                <Avatar size="40px" type={'users'} img={item.avatar?.url} />
                <div className="flex flex-col">
                  <span className="leading-7 text-Gray-light-mode-900">
                    {item.user.first_name} {item.user.last_name}
                  </span>
                  <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">@{item.user.username}</span>
                </div>
              </div>
              <div className="flex-1">Work Certificate</div>
              <div className={css.col}>
                <div className="flex">
                  {item.status === 'PENDING' && (
                    <CreditStatus icon="clock" label="Pending" color={variables.color_grey_500} />
                  )}
                  {item.status === 'APPROVED' && (
                    <CreditStatus icon="check" label="Approved" color={variables.color_primary_500} />
                  )}
                  {item.status === 'SENT' && (
                    <CreditStatus icon="check" label="Sent" color={variables.color_success_500} />
                  )}
                  {item.status === 'REJECTED' && (
                    <CreditStatus icon="x-close" label="Rejected" color={variables.color_error_500} />
                  )}
                  {item.status === 'CLAIMED' && (
                    <CreditStatus icon="check" label="Claimed" color={variables.color_success_500} />
                  )}
                </div>
              </div>
              <div className={css.col}>{formatDate(item.created_at)}</div>
              <div className={css.col}>
                <Button color="primary" variant="text" onClick={() => onView(item)}>
                  View
                </Button>
                {item.status === 'PENDING' && (
                  <Button color="secondary" variant="text" onClick={() => onReject(item.id)}>
                    Decline
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={css.paginationBox}>
        <Pagination count={totalPage} onChange={(e, p) => setPage(p)} />
      </div>
      <CredentialDetails
        open={openModal}
        handleClose={() => setOpenModal(false)}
        experience={experience}
        onUpdateExperience={onUpdateExperience}
        avatarInfo={avatarInfo}
        readonly={experience?.credential?.status === 'APPROVED'}
      />
    </div>
  );
};
