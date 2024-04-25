import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
import { CreateScreenQuestion } from 'src/Nowruz/modules/Jobs/jobCreate/components/createScreenQuestion';
import { JobCreateHeader } from 'src/Nowruz/modules/Jobs/jobCreate/components/Header';
import { JobPreviewModal } from 'src/Nowruz/modules/Jobs/jobCreate/components/JobPreviewModal';
import { ScreenQuestion } from 'src/Nowruz/modules/Jobs/jobCreate/components/screenQuestion';

import css from './job-create-form.module.scss';
import { useJobCreateForm } from './useJobCreateForm';
export const JobCreateForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    causesList,
    catagoriesList,
    onSelectCause,
    errors,
    searchCities,
    onSelectCity,
    openPreview,
    setOpenPreview,
    openSuccessModal,
    onPreview,
    skills,
    selectedSkills,
    onSelectSkills,
    onSelectPreference,
    onSelectType,
    onSelectPaymentType,
    onSelectPaymentScheme,
    onSelectCategory,
    onSelectLength,
    onSelectExperienceLevel,
    previewModalProps,
    isDirty,
    isValid,
    onChangePaymentMax,
    onChangePaymentMin,
    paymentMin,
    paymentMax,
    paymentTypeOptions,
    paymentType,
    paymentScheme,
    handleCloseSuccessModal,
    onChangeCommitHoursMin,
    onChangeCommitHoursMax,
    commitmentHoursHigher,
    commitmentHoursLower,
    questions,
    addQuestion,
    openCreateQuestion,
    setOpenCreateQuestion,
    deleteQuestion,
    openEditQuestionForm,
    handleEditQuestion,
    editedQuestion,
    isEdit,
    cause,
    category,
    preference,
    type,
    length,
    experienceLevel,
    location,
    onSelectJobLocation,
    jobLocation,
  } = useJobCreateForm();

  const renderInfo = (title: string, description?: string) => (
    <div className={css.info}>
      <div className={css.infoTitle}>{title}</div>
      {description && <div className={css.infoDescription}>{description}</div>}
    </div>
  );
  const renderAmountFields = () => {
    return (
      <div className="flex justfy-center align-center">
        <Input
          name="paymentMin"
          value={paymentMin}
          onChange={e => onChangePaymentMin(e.target.value)}
          placeholder="0"
          className={css.priceInputs}
          prefix={paymentScheme === 'FIXED' ? '$' : '$/hr'}
          errors={errors['paymentMin']?.message ? [errors['paymentMin']?.message.toString()] : undefined}
          noBorderPrefix
        />
        <div className="flex items-center mx-2">to</div>
        <Input
          name="paymentMax"
          value={paymentMax}
          onChange={e => onChangePaymentMax(e.target.value)}
          placeholder="0"
          className={css.priceInputs}
          prefix={paymentScheme === 'FIXED' ? '$' : '$/hr'}
          errors={errors['paymentMax']?.message ? [errors['paymentMax']?.message.toString()] : undefined}
          noBorderPrefix
        />
      </div>
    );
  };
  const renderHoursFields = () => {
    return (
      <div className="flex justfy-center align-center">
        <Input
          name="commitmentHoursLower"
          value={commitmentHoursLower}
          onChange={e => onChangeCommitHoursMin(e.target.value)}
          postfix={paymentScheme === 'FIXED' ? 'hrs' : 'hrs/week'}
          placeholder="0"
          className={css.priceInputs}
          errors={
            errors['commitmentHoursLower']?.message ? [errors['commitmentHoursLower']?.message.toString()] : undefined
          }
          noBorderPostfix
        />
        <div className="flex items-center mx-2">to</div>
        <Input
          name="commitmentHoursHigher"
          value={commitmentHoursHigher}
          onChange={e => onChangeCommitHoursMax(e.target.value)}
          placeholder="0"
          className={css.priceInputs}
          postfix={paymentScheme === 'FIXED' ? 'hrs' : 'hrs/week'}
          errors={
            errors['commitmentHoursHigher']?.message ? [errors['commitmentHoursHigher']?.message.toString()] : undefined
          }
          noBorderPostfix
        />
      </div>
    );
  };

  return (
    <div>
      <div className={css.back}>
        <BackLink title="Back" />
      </div>
      <form>
        <JobCreateHeader
          onPreview={onPreview}
          onPublish={handleSubmit(onSubmit)}
          isValid={isValid}
          isDirty={isDirty}
          isEdit={isEdit}
        />
        <div className={css.row}>
          {renderInfo('What is your job about?', 'Select a social cause')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              id="cause"
              value={cause}
              placeholder="Search a cause"
              icon="search-lg"
              options={causesList}
              isSearchable
              onChange={option => onSelectCause(option)}
              errors={errors['cause']?.message ? [errors['cause']?.message.toString()] : undefined}
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
              errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job category', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              name="category"
              value={category}
              placeholder="Select a category"
              options={catagoriesList}
              isSearchable
              onChange={option => onSelectCategory(option)}
              errors={errors['category']?.message ? [errors['category']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo(
            'Job description',
            'Write a few sentences about the job, what the requirements are, and your organization culture',
          )}
          <div className={css.componentsContainer}>
            <Input
              name="description"
              register={register}
              customHeight="128px"
              placeholder="Write a few sentences about the job"
              multiline
              errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Location')}
          <div className={css.componentsContainer}>
            {jobLocation && (
              <RadioGroup
                errors={errors.location?.choice?.message ? [errors.location?.choice?.message.toString()] : undefined}
                defaultValue={jobLocation}
                items={[
                  { label: 'Anywhere', value: 'Anywhere' },
                  {
                    label: 'Country / City',
                    value: 'Country / City',
                    children: (
                      <div className={css.componentsContainer}>
                        <SearchDropdown
                          id="city"
                          placeholder="Search for a city"
                          cacheOptions
                          value={location}
                          isAsync
                          loadOptions={searchCities}
                          defaultOptions
                          className="my-5"
                          icon="search-lg"
                          hasDropdownIcon={false}
                          label="Location*"
                          onChange={value => {
                            onSelectCity(value);
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                onChange={option => onSelectJobLocation(option.value.toString())}
              />
            )}
            {!jobLocation && (
              <RadioGroup
                errors={errors.location?.choice?.message ? [errors.location?.choice?.message.toString()] : undefined}
                items={[
                  { label: 'Anywhere', value: 'Anywhere' },
                  {
                    label: 'Country / City',
                    value: 'Country / City',
                    children: (
                      <div className={css.componentsContainer}>
                        <SearchDropdown
                          id="city"
                          value={location}
                          placeholder="Search for a city"
                          cacheOptions
                          isAsync
                          loadOptions={searchCities}
                          defaultOptions
                          className="my-5"
                          icon="search-lg"
                          hasDropdownIcon={false}
                          label="Location*"
                          onChange={value => {
                            onSelectCity(value);
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                onChange={option => onSelectJobLocation(option.value.toString())}
              />
            )}
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Remote preference', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Please select"
              value={preference}
              options={PROJECT_REMOTE_PREFERENCES_V2}
              isSearchable
              onChange={option => onSelectPreference(option)}
              errors={errors['preference']?.message ? [errors['preference']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job type', 'Is it a full time job?')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              value={type}
              placeholder="Please select"
              options={PROJECT_TYPE_V2}
              isSearchable
              onChange={option => onSelectType(option)}
              errors={errors['type']?.message ? [errors['type']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job length', 'How long is the job?')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Please select"
              value={length}
              options={PROJECT_LENGTH_V2}
              isSearchable
              onChange={option => onSelectLength(option)}
              errors={errors['length']?.message ? [errors['length']?.message.toString()] : undefined}
            />
          </div>
        </div>
        {paymentType && (
          <div className={css.row}>
            {renderInfo('Payment type', 'Is it a paid or volunteer job?')}
            <div className={css.componentsContainer}>
              <RadioGroup
                items={paymentTypeOptions}
                defaultValue={paymentType}
                errors={errors['paymentType']?.message ? [errors['paymentType']?.message.toString()] : undefined}
                onChange={option => onSelectPaymentType(option.value)}
              />
            </div>
          </div>
        )}
        {!paymentType && (
          <div className={css.row}>
            {renderInfo('Payment type', 'Is it a paid or volunteer job?')}
            <div className={css.componentsContainer}>
              <RadioGroup
                items={paymentTypeOptions}
                defaultValue={paymentType}
                errors={errors['paymentType']?.message ? [errors['paymentType']?.message.toString()] : undefined}
                onChange={option => onSelectPaymentType(option.value.toString())}
              />
            </div>
          </div>
        )}
        {paymentType === 'PAID' && (
          <div className={css.row}>
            {renderInfo('Payment terms / range', 'Specify the estimated payment range for this job.')}

            <div className={css.componentsContainer}>
              <RadioGroup
                name="paidOption"
                onChange={option => onSelectPaymentScheme(option.value.toString())}
                items={[
                  { label: 'Fixed', value: 'FIXED', children: renderAmountFields() },
                  { label: 'Hourly', value: 'HOURLY', children: renderAmountFields() },
                ]}
                defaultValue={paymentScheme}
                errors={errors['paymentScheme']?.message ? [errors['paymentScheme']?.message.toString()] : undefined}
              />
            </div>
          </div>
        )}
        {paymentType === 'VOLUNTEER' && (
          <div className={css.row}>
            {renderInfo('Commitment', 'How many hours are expected for this job?')}

            <div className={css.componentsContainer}>
              <RadioGroup
                name="volunteeredOption"
                onChange={option => onSelectPaymentScheme(option.value)}
                items={[
                  { label: 'Fixed', value: 'FIXED', children: renderHoursFields() },
                  { label: 'Hourly', value: 'HOURLY', children: renderHoursFields() },
                ]}
                defaultValue={paymentScheme}
                errors={errors['paymentScheme']?.message ? [errors['paymentScheme']?.message.toString()] : undefined}
              />
            </div>
          </div>
        )}
        <div className={css.row}>
          {renderInfo('Experience level', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              value={experienceLevel}
              placeholder="Please select"
              options={EXPERIENCE_LEVEL_V2}
              isSearchable
              onChange={option => onSelectExperienceLevel(option)}
              errors={errors['experienceLevel']?.message ? [errors['experienceLevel']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Skills', 'Please select at least 1 to 5 skills that are relevant to the job')}
          <div className={css.componentsContainer}>
            <MultiSelect
              id={'skills'}
              max={5}
              items={skills}
              placeholder={'Search a skill'}
              componentValue={selectedSkills}
              setComponentValue={onSelectSkills}
              customHeight="134px"
              chipFontColor={variables.color_grey_blue_700}
              chipBorderColor={variables.color_grey_200}
              chipBgColor={variables.color_grey_blue_50}
              chipIconColor={variables.color_grey_blue_500}
              displayDefaultBadges={false}
              errors={errors['skills']?.message ? [errors['skills']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Screener questions', 'Add up to 5 screener questions')}
          <div className={css.componentsContainer}>
            {!openCreateQuestion && (
              <Button variant="text" color="secondary" onClick={() => setOpenCreateQuestion(true)}>
                <Icon name="plus" fontSize={20} color={variables.color_grey_600} />
                Add question
              </Button>
            )}
            {openCreateQuestion && (
              <CreateScreenQuestion
                editedQuestion={editedQuestion}
                addQuestion={addQuestion}
                cancel={() => setOpenCreateQuestion(false)}
                editQuestion={handleEditQuestion}
              />
            )}
            {questions.map((q, index) => (
              <ScreenQuestion
                key={index}
                index={index}
                question={q}
                handleDelete={deleteQuestion}
                handleEdit={openEditQuestionForm}
              />
            ))}
          </div>
        </div>
        <div className={css.footer}>
          <div className="flex space-x-3 ">
            {/* <Button color="secondary" variant="outlined" onClick={onPreview} disabled={!isValid || !isDirty}>
              Preview
            </Button> */}
            <Button type="submit" color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
              Publish
            </Button>
          </div>
        </div>
      </form>
      <JobPreviewModal
        company={previewModalProps?.company}
        job={previewModalProps?.job}
        open={openPreview}
        onClose={() => setOpenPreview(false)}
      />
      <AlertModal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        onSubmit={handleCloseSuccessModal}
        message="This job has been published. Organization members will be able to edit this job and republish changes."
        title="Job published"
      />
    </div>
  );
};
