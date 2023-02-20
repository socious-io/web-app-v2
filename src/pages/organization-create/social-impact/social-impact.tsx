import { isTouchDevice } from '../../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const SocialImpact = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};

//https://dev.socious.io/api/v2/orgs 

// {
//     "type": "PUBLIC",
//     "social_causes": [
//         "ANIMAL_RIGHTS"
//     ],
//     "name": "qwer",
//     "bio": "qwer",
//     "email": "qwer@asdf.co",
//     "country": "IR",
//     "city": "Isfahan, Isfahan Province",
//     "geoname_id": 418863,
//     "mission": "org mission",
//     "description": "org impact",
//     "culture": "org culture"
// }
