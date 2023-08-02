import { Job } from "src/components/organisms/job-list/job-list.types";

export function getJobStructuresData(job:Job):string{
    const jobStructuredData=
      {
        "@context" : "https://schema.org/",
        "@type" : "JobPosting",
        "title" : job.job_category?.name,
        "description" : `<p>${job.description}</p>`,
        "identifier": {
          "@type": "PropertyValue",
          "name": job.identity_meta.name,
          "value": job.id
        },
        "datePosted" : job.updated_at,
        "validThrough" : job.expires_at,
        "employmentType" :job.project_type,
        "hiringOrganization" : {
          "@type" :'Organization',
          "name" : job.identity_meta.name,
          // "sameAs" : "https://www.google.com",
          "logo" : job.identity_meta.image
        },
        "jobLocation": {
        "@type": "Place",
          "address": {
          "@type": "PostalAddress",
          "streetAddress":job.identity_meta.address,
          "addressLocality": "",
          "addressRegion":job.identity_meta.city,
          "postalCode": "",
          "addressCountry": job.identity_meta.country
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": job.payment_currency,
          "value": {
            "@type": "QuantitativeValue",
            "value": job.payment_range_higher,
            "unitText": "YEAR"
          }
        }
      }
      return JSON.stringify(jobStructuredData);
    
    }
    