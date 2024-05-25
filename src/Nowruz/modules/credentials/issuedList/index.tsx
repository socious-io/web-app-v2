import { formatDate } from 'src/core/time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './issuedList.module.scss';
import { useIssuedList } from './useIssuedList';
import { CreditStatus } from '../creditStatus';

export const IssuedList = () => {
  const {
    issuedList,
    totalPage,
    setPage,
    selectedCredential,
    onSelectCredential,
    userProfile,
    verified,
    onClaim,
    onArchive,
  } = useIssuedList();

  return (
    <div className="flex flex-col">
      {userProfile && (
        <div className="flex justify-end">
          <Button
            color="inherit"
            variant="outlined"
            disabled={!selectedCredential.id}
            onClick={() => onArchive(selectedCredential.id, selectedCredential.name === 'experience')}
          >
            Archive
          </Button>
        </div>
      )}
      <div className={css.tableIssuedList}>
        <div className={css.header}>
          <div className="flex flex-[2_2_0%] gap-3">
            {/* <Checkbox id="select-all" /> */}
            Name
          </div>
          <div className="flex-1">Credential Type</div>
          <div className={css.col}>Status</div>
          <div className={css.col}>Issued Date</div>
          {verified && <div className={css.col} />}
        </div>
        <div className="flex flex-col">
          {issuedList.map(item => (
            <div key={item.id} className="flex items-center text-sm font-normal text-left px-6 py-4">
              <div className="flex flex-[2_2_0%] justify-start items-center gap-3">
                <Checkbox
                  id={item.id}
                  checked={selectedCredential.id === item.id}
                  onChange={() => onSelectCredential(item.id, 'experience' in item)}
                  disabled={!verified}
                />
                {userProfile ? (
                  <Avatar size="40px" type={'organizations'} img={item.org_image?.url} />
                ) : (
                  <Avatar size="40px" type={'users'} img={item.avatar?.url} />
                )}

                <div className="flex flex-col">
                  <span className="leading-7 text-Gray-light-mode-900">
                    {userProfile ? item.org.name : `${item.user.first_name} ${item.user.last_name}`}
                  </span>
                  <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                    {userProfile ? `@${item.org.shortname}` : `@${item.user.username}`}
                  </span>
                </div>
              </div>
              <div className="flex-1">{'experience' in item ? 'Work Certificate' : 'Educational Certificate'}</div>
              <div className={css.col}>
                <div className="flex">
                  {item.status === 'PENDING' && <CreditStatus icon="clock" label="Pending" theme="secondary" />}
                  {item.status === 'APPROVED' && <CreditStatus icon="check-circle" label="Accepted" theme="success" />}
                  {item.status === 'SENT' && (
                    <CreditStatus icon={userProfile ? 'arrow-down' : 'arrow-up'} label="Issued" theme="secondary" />
                  )}
                  {item.status === 'REJECTED' && <CreditStatus icon="alert-circle" label="Declined" theme="error" />}
                  {item.status === 'CLAIMED' && <CreditStatus icon="check-circle" label="Claimed" theme="success" />}
                </div>
              </div>
              <div className={css.col}>{formatDate(item.created_at)}</div>
              {verified &&
                (userProfile ? (
                  <div className={css.col}>
                    {item.status === 'APPROVED' && (
                      <Button
                        color="primary"
                        variant="text"
                        onClick={() => onClaim(item.id, 'experience' in item)}
                        customStyle="!text-sm !font-semibold"
                      >
                        Claim
                      </Button>
                    )}

                    <Button
                      color="secondary"
                      variant="text"
                      onClick={() => onArchive(item.id, 'experience' in item)}
                      customStyle="!text-sm !font-semibold"
                    >
                      Archive
                    </Button>
                  </div>
                ) : (
                  //FIXME: org create issue later
                  <div className={css.col} />
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className={css.paginationBox}>
        <Pagination count={totalPage} onChange={(e, p) => setPage(p)} />
      </div>
    </div>
  );
};
