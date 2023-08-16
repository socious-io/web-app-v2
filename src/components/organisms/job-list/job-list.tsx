import css from './job-list.module.scss'
import { Card } from '../../atoms/card/card'
import { JobListProps } from './job-list.types'
import { Categories } from '../../atoms/categories/categories'
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable'
import { getCategories } from './job-list.services'
import { Avatar } from '../../atoms/avatar/avatar'
import { toRelativeTime } from 'src/core/relative-time'
import { socialCausesToCategory } from 'src/core/adaptors'
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES'
import { ExpandableText } from 'src/components/atoms/expandable-text'
import { printWhen } from 'src/core/utils'
import { useEffect } from 'react'
import { getJobStructuresData } from 'src/pages/job-detail/job-details.jobStructuredData'

export const JobList = (props: JobListProps): JSX.Element => {
  const { data, showMorePage, onMorePageClick, ...rest } = props

  useEffect(() => {
    const scripts = data.map((job) => {
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.textContent = getJobStructuresData(job)
      document.head.appendChild(script)
      return script
    })
    return () => {
      scripts.forEach((script) => document.head.removeChild(script))
    }
  }, [data])

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname]
    } else {
      return shortname
    }
  }

  const location = (job: JobListProps['data'][0]) =>
    `${job.city}, ${getCountryName(
      job.country as keyof typeof COUNTRIES_DICT | undefined
    )}`

  const seeMoreJSX = (
    <div className={css.seeMore} onClick={() => onMorePageClick()}>
      See more
    </div>
  )
  return (
    <div style={rest} className={css.container}>
      {data.map((job) => {
        return (
          <Card
            key={job.id}
            cursor="pointer"
            onClick={() => props.onClick(job.id)}>
            <div className={css.header}>
              <Avatar
                marginRight="0.5rem"
                type="organizations"
                img={job.identity_meta.image}
              />
              <div className={css.orgNameAndLocation}>
                <div>{job.identity_meta?.name}</div>
                <div className={css.orgLocation}>{location(job)}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.jobTitle}>{job.title}</div>
              <Categories marginBottom="1rem" list={getCategories(job)} />
              <div className={css.description}>
                <ExpandableText text={job.description} isMarkdown />
              </div>
              <CategoriesClickable
                marginBottom="1rem"
                list={socialCausesToCategory(job.causes_tags)}
              />
            </div>
            <div className={css.footer}>{toRelativeTime(job.updated_at)}</div>
          </Card>
        )
      })}

      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  )
}
