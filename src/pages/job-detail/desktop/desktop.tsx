import css from './desktop.module.scss'
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor'
import { BackLink } from 'src/components/molecules/back-link'
import { useJobDetailShared } from '../job-detail.shared'
import { JobDetailCard } from '../components/job-detail-card/job-detail-card'
import { useEffect } from 'react'
import { getJobStructuresData } from '../job-details.jobStructuredData'
import { Helmet } from 'react-helmet'

export const Desktop = (): JSX.Element => {
  const { identity, job, location, screeningQuestions } = useJobDetailShared()

  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.textContent = getJobStructuresData(job)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])
  return (
    <>
      <Helmet>
        <title>{`${job.title} at ${job.identity_meta?.name} | Socious`}</title>
        <meta
          name="description"
          content={`${job.identity_meta?.name} is hiring a ${job.title} in ${location}. Apply now on Socious.`}
        />
      </Helmet>

      <TwoColumnCursor visibleSidebar={!!identity}>
        <div className={css.sidebar}>
          <BackLink title="Jobs" />
        </div>
        <JobDetailCard
          job={job}
          screeningQuestions={screeningQuestions}
          location={location}
          userType={identity?.type || 'users'}
        />
      </TwoColumnCursor>
    </>
  )
}
