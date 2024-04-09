import { Icon } from 'src/Nowruz/general/Icon';
import variables from 'src/components/_exports.module.scss';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './credentialsList.module.scss';
import { CreditStatus } from '../creditStatus';
import { useCredentialsList } from './useCredentialsList';
import { CreateUpdateExperience } from 'src/Nowruz/modules/userProfile/containers/createUpdateExperience';
import { useState } from 'react';
import { CredentialExperienceRes, Experience } from 'src/core/api';

export const CredentialList = () => {
  const { credentialsList, total, setPage, onApprove, onReject, onDetails, setOpenModal, openModal, experience } =
    useCredentialsList();

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
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {credentialsList.map((item) => (
              <tr className="text-sm font-normal text-left">
                <td className="flex justify-start items-center">
                  <Avatar size="40px" type={'users'} img={item.avatar?.url} />
                  <div className="flex flex-col ml-3">
                    <span className="leading-7 text-Gray-light-mode-900">
                      {item.user.first_name} {item.user.last_name}
                    </span>
                    <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                      @{item.user.username}
                    </span>
                  </div>
                </td>
                <td>Experience</td>
                <td>
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
                </td>
                <td>{item.created_at.toString()}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={css.paginationBox}>
        <Pagination count={total} onChange={(e, p) => setPage(p)} />
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
