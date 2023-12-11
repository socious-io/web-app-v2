import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { RadioGrop } from 'src/Nowruz/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './job-create-form.module.scss';
import { useJobCreateForm } from './useJobCreateForm';
import { JobCreateHeader } from '../../components/Header';
export const JobCreateForm = () => {
  const { register, handleSubmit, onSubmit, causesList, catagoriesList } = useJobCreateForm();
  const renderInfo = (title: string, description: string) => (
    <div className={css.info}>
      <div className={css.infoTitle}>{title}</div>
      <div className={css.infoDescription}>{description}</div>
    </div>
  );
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <JobCreateHeader
          onPreview={() => {
            console.log();
          }}
          onPublish={handleSubmit(onSubmit)}
        />
        <div className={css.row}>
          {renderInfo('What is your job about?', 'Select a social cause')}{' '}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Search a cause"
              icon="search-lg"
              options={causesList}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job title', 'Job titles must describe one position')}
          <div className={css.componentsContainer}>
            <Input
              id="title"
              autoComplete="title"
              name="title"
              register={register}
              placeholder="e.g. Product Manager"
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job category', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a category"
              options={catagoriesList}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo(
            'Job description',
            'Write a few sentences about the job, what the requirements are, and your organization culture',
          )}
          <div className={css.componentsContainer}>
            <Input id="description" customHeight="128px" placeholder="Write a few sentences about the job" multiline />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Location', 'Job titles must describe one position')}
          <div className={css.componentsContainer}>
            <RadioGrop
              items={[
                { label: 'Anywhere', value: 'Anywhere' },
                { label: 'Country / City', value: 'Country / City' },
                { label: 'In my timezone', value: 'In my timezone' },
              ]}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Remote preference', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a preference"
              options={catagoriesList}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job type', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a Type"
              options={catagoriesList}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job length', 'How long is the job?')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a Type"
              options={catagoriesList}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Payment type', 'Is it a paid or volunteer job?')}
          <div className={css.componentsContainer}>
            <RadioGrop
              items={[
                { label: 'Paid', value: 'Paid' },
                { label: 'Volunteer', value: 'Volunteer' },
              ]}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Payment terms / range', 'Specify the estimated payment range for this job.')}
          <div className={css.componentsContainer}>
            <RadioGrop
              items={[
                { label: 'Paid', value: 'Paid' },
                { label: 'Volunteer', value: 'Volunteer' },
              ]}
            />
          </div>
        </div>
        <div className={css.footer}>
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};
