import { createAsyncThunk } from '@reduxjs/toolkit';
import { Organization, OrganizationReq, UpdateProfileReq, User, updateOrganization, updateProfile } from 'src/core/api';

export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (user: User) => {
  const reqParam: UpdateProfileReq = {
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
  };
  if (user.bio) reqParam.bio = user.bio;
  if (user.mission) reqParam.mission = user.mission;
  if (user.country) reqParam.country = user.country;
  if (user.city) reqParam.city = user.city;
  if (user.geoname_id) reqParam.geoname_id = Number(user.geoname_id);
  if (user.address) reqParam.address = user.address;
  if (user.phone) reqParam.phone = user.phone;
  if (user.wallet_address) reqParam.wallet_address = user.wallet_address;
  if (user.avatar) reqParam.avatar = user.avatar.id;
  if (user.cover_image) reqParam.cover_image = user.cover_image.id;
  if (user.social_causes) reqParam.social_causes = user.social_causes;
  if (user.skills) reqParam.skills = user.skills;
  if (user.mobile_country_code) reqParam.mobile_country_code = user.mobile_country_code;

  const profile = await updateProfile(reqParam);
  return profile;
});

export const updateOrgProfile = createAsyncThunk('profile/updateOrgProfile', async (org: Organization) => {
  const reqParam: OrganizationReq = {
    name: org.name || '',
    shortname: org.shortname || '',
    email: org.email,
  };
  if (org.bio) reqParam.bio = org.bio;
  if (org.description) reqParam.description = org.description;
  if (org.phone) reqParam.phone = org.phone;
  if (org.type) reqParam.type = org.type;
  if (org.country) reqParam.country = org.country;
  if (org.city) reqParam.city = org.city;
  if (org.geoname_id) reqParam.geoname_id = Number(org.geoname_id);
  if (org.address) reqParam.address = org.address;
  if (org.social_causes) reqParam.social_causes = org.social_causes;
  if (org.website) reqParam.website = org.website;
  if (org.mobile_country_code) reqParam.mobile_country_code = org.mobile_country_code;
  if (org.image) reqParam.image = org.image.id;
  if (org.cover_image) reqParam.cover_image = org.cover_image.id;
  if (org.mission) reqParam.mission = org.mission;
  if (org.culture) reqParam.culture = org.culture;
  if (org.size) reqParam.size = org.size;
  if (org.industry) reqParam.industry = org.industry;

  const profile = await updateOrganization(org.id, reqParam);
  return profile;
});
