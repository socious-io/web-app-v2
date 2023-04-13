import css from './privacy-policy.module.scss';

export const PrivacyPolicy = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <div onClick={() => history.back()}>
          <img src="/icons/chevron-left.svg" />
        </div>
      </div>
      <span>
        Socious Global Inc. (hereinafter referred to as "the Company") provides the following privacy policy (hereinafter
        referred to as the "Policy") for the application called "Socious" and the services on the website (hereinafter
        referred to as the "Services") operated by the Company under the domain name "socious.io". The following privacy
        policy (the "Policy") is provided for the service on the application and website called "Socious" operated under the
        name "socious.io/" (the "Service") The following privacy policy (the "Policy") is provided for the application called
        "Socious" and the services on the website (the "Services"). (hereinafter referred to as the "Company") will handle
        user information, including personal information of registered users, in accordance with the following privacy policy
        (hereinafter referred to as the "Policy").
      </span>
      <strong>Article 1. User information to be collected and collection method</strong>
      <span>
        1. In this policy, "personal information" is defined in accordance with the Personal Information Protection Law.
        <br />
        2. In this policy, "user information" means information related to the identification of the registered user,
        behavioral history on communication services, and other information generated or accumulated by the registered user
        or the registered user's terminal on the registered user's smartphone, PC, or other terminal, and collected by the
        Company in accordance with this policy.
        <br />
        3. The terms used in this Policy shall be in accordance with those defined in the Terms of Service.
        <br />
        4. The User Information collected by the Company in the Service is as follows, depending on the method of collection.
      </span>
      <strong>(1) Information to be provided at the time of registration</strong>
      <span className={css.circle}>
        <ul>
          <li>Name</li>
          <li>E-mail address</li>
          <li>Date of birth</li>
          <li>Credit card information</li>
          <li>Photo</li>
          <li> Other information entered by the registered user in the input form provided by the Company</li>
        </ul>
      </span>
      <strong>
        (2) Information provided by other services by allowing registered users to link with other services in the use of
        this service.
      </strong>
      <span className={css.circle}>
        <ul>
          <li>ID used by the registered user in the relevant external service</li>
          <li>
            Other information that the registered user is allowed to disclose to the linked party according to the privacy
            settings of the external service in question
          </li>
        </ul>
      </span>
      <strong>(3) Information collected by the Company when a registered user uses the Service.</strong>
      <span>
        In addition to (1) and (2), the Company may collect information regarding the access status and usage of the Service.
        This includes the following information.
      </span>
      <span className={css.circle}>
        <ul>
          <li>Terminal information</li>
          <li>Log information</li>
          <li>Cookies and anonymous IDs</li>
          <li>Location information</li>
        </ul>
      </span>
      <br />
      <strong>Article 2. Purpose of Use</strong>
      <span>
        1. The specific purposes of use of user information related to the provision of this service are as follows.
        <br />
        provide information about the Service and to respond to inquiries.
        <br />
        (2) To respond to violations of the Company's rules, policies, etc. (hereinafter referred to as "Rules, etc.")
        related to the Service. (2) To respond to violations of the Company's rules, policies, etc. (hereinafter referred to
        as "Rules, etc.") regarding the Service
        <br />
        (3) To notify you of changes to the Terms of Service, etc.
        <br />
        (4) To use for purposes incidental to the above.
        <br />
        2. In addition to the provisions of the preceding paragraph, user information may also be used for the following
        purposes
      </span>
      <table>
        <tr>
          <th>Purpose of use</th>
          <th>Corresponding user information items</th>
        </tr>
        <tr>
          <td>
            (1) To create statistical data processed into a format that does not identify individuals in relation to our
            services.
          </td>
          <td>
            ○ Terminal information
            <br />○ Log information
          </td>
        </tr>
        <tr>
          <td>(2) To distribute or display advertisements of the Company or third parties</td>
          <td>
            ○ Terminal information
            <br />○ Terminal information
          </td>
        </tr>
        <tr>
          <td>(3) To be used for other marketing purposes</td>
          <td>
            ○ Name
            <br />
            ○ Email address
            <br />
            ○ Date of birth
            <br />
            ○ Other information entered by the registered user in the input form provided by the Company
            <br />
            ○ Submission data
            <br />○ Social actions
          </td>
        </tr>
      </table>
      <strong>Article 3. Provision to Third Parties</strong>
      <span>
        The Company shall not provide personal information among user information to any third party without the prior
        consent of the registered user, except in cases where disclosure is permitted under the Personal Information
        Protection Law or other laws and regulations. However, this does not apply to the following cases.
        <br />
        (1) When the Company entrusts all or part of the handling of personal information within the scope necessary to
        achieve the purpose of use.
        <br />
        (2) When personal information is provided in connection with the succession of a business due to a merger or other
        reasons
        <br />
        (3) When personal information is provided to an information collection module provider in accordance with the
        provisions of Section 4.
        <br />
        (4) When it is necessary to cooperate with a national agency, a local government, or a person or organization
        entrusted by either of the foregoing in executing affairs prescribed by law, and obtaining the consent of the
        registered user may impede the execution of such affairs
        <br />
        (5) In other cases permitted by the Personal Information Protection Law or other laws and regulations.
      </span>
      <strong>Article 4. External Transmission, Provision to Third Parties, and Information Collection Modules</strong>
      <span>
        In order to deliver targeted advertisements using user information, the following information collection modules are
        incorporated in the Service. In accordance with this, the user information will be provided to the information
        collection module provider as follows.
      </span>
      <table>
        <tr>
          <td>(1) Name of the information collection module</td>
        </tr>
        <tr>
          <td>(2) Providers of information collection modules</td>
        </tr>
        <tr>
          <td>(3) Items of user information to be provided</td>
        </tr>
        <tr>
          <td>(4) Means and methods of provision</td>
        </tr>
        <tr>
          <td>(5) Purpose of use by the above providers</td>
        </tr>
        <tr>
          <td>(6) Whether or not the above-mentioned provider provides the information to a third party</td>
        </tr>
        <tr>
          <td>(7) URL of the privacy policy of the above provider</td>
        </tr>
      </table>
      <strong>Article 5. Joint Use</strong>
      <span>The Company will jointly use the personal information of registered users as follows.</span>
      <table>
        <tr>
          <td>(1) Items of personal information to be used jointly</td>
        </tr>
        <tr>
          <td>(2) Items of personal information to be used jointly</td>
        </tr>
        <tr>
          <td>(3) Purposes of use by parties jointly using the information</td>
        </tr>
        <tr>
          <td>(4) Name or title of the person responsible for the management of user information</td>
        </tr>
      </table>
      <strong>Article 6. Disclosure of Personal Information</strong>
      <span>
        {' '}
        When the Company is requested by a registered user to disclose his/her personal information in accordance with the
        provisions of the Act on the Protection of Personal Information, the Company shall disclose such information to the
        registered user without delay after confirming that the request is made by the registered user himself/herself (if
        the said personal information does not exist, the Company shall notify the registered user to that effect). (If the
        personal information in question does not exist, the Company will notify the registered user to that effect. (If such
        personal information does not exist, the Company shall notify the registered user to that effect.) However, this
        shall not apply in cases where the Company is not obligated to disclose such information under the Personal
        Information Protection Law or other laws and regulations.
      </span>
      <strong>
        Article 7. Method of notification, publication, or obtaining consent, and method of requesting discontinuation of use
      </strong>
      <span>
        1. The Company shall obtain the consent of the registered user before collecting the following user information.
        <br />
        (1) Device information
        <br />
        (2) Location information
        <br />
        2. Registered users may request that the use of all or part of the user information be stopped by setting the
        prescribed settings for the Service, and in such case, the Company shall promptly stop the use of such information in
        accordance with the Company's regulations. Please note that for some items of User Information, the collection or use
        of such information is a prerequisite for the Service, and the cessation of the collection or use of such information
        will result in the cessation of use of the Service.
      </span>
      <strong>Article 8. Correction and Suspension of Use of Personal Information</strong>
      <span>
        1. In the event that a registered user requests us to (1) correct the content of his/her personal information in
        accordance with the provisions of the Personal Information Protection Law on the grounds that the information is not
        true, or (2) suspend the use of his/her personal information in accordance with the provisions of the Personal
        Information Protection Law on the grounds that the information is being handled beyond the scope of the purpose of
        use announced in advance, or that the information was collected through deception or other wrongful means, we will
        conduct the necessary investigation without delay after confirming that the request is made by the registered user.
        If a request is made to stop the use of personal information in accordance with the provisions of the Personal
        Information Protection Law on the grounds that (1) the information has been handled in a manner that exceeds the
        scope of the purpose of use announced in advance, or (2) the information has been collected through deception or
        other wrongful means, we will conduct the necessary investigation without delay after confirming that the request is
        made by the registered user, and based on the results of the investigation, we will correct the content of the
        personal information or stop its use, and notify the registered user to that effect. If the Company decides not to
        correct or suspend the use of the personal information based on reasonable grounds, the Company will notify the
        registered user to that effect.
        <br />
        2. If a registered user requests the deletion of the registered user's personal information, and the Company deems it
        necessary to comply with the request, the Company will delete the personal information after confirming that the
        request is made by the registered user himself/herself, and notify the registered user to that effect.
        <br />
        3. The provisions of the preceding two paragraphs shall not apply in cases where the Company is not obligated to
        correct, etc. or suspend use, etc. under the Personal Information Protection Law or other laws and regulations.
      </span>
      <strong>Article 9. Contact for Inquiries</strong>
      <span>
        If you have any questions regarding the handling of user information, please contact the following office.
        <br />
        Address: Intershore Chambers, Road Town, Tortola, British Virgin Islands, VG1110
        <br />
        Company name: Socious Global Inc.
        <br />
        Department: Customer Support
        <br />
        Email: support@socious.io{' '}
      </span>
      <strong>Article 10. Procedures for Changing the Privacy Policy</strong>
      <span>
        The Company will review the operation of the handling of user information from time to time, strive for continuous
        improvement, and may change this policy as necessary. In the event of any changes, the Company shall notify
        registered users of the effective date and content of the revised policy by posting a notice on the Company's website
        or by other appropriate means. However, in the case of a change to the content that requires the consent of the
        registered user under the law, the consent of the registered user shall be obtained in a manner prescribed by the
        Company.
      </span>
      <strong>Article 11. Language</strong>
      <span>
        The original version of this Policy is written in English
        <br />
        <br />
        Enacted on August 19, 2021
        <br />
        Updated on January 1, 2023
      </span>
    </div>
  );
};
