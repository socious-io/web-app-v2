import { createAsyncThunk } from '@reduxjs/toolkit';
import { UpdateProfileReq, User, updateProfile } from 'src/core/api';

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

  // if(user.certificates) reqParam.certificates=user.certificates
  // if(user.goals) reqParam.goals=user.goals
  // if(user.educations) reqParam.educations=user.educations

  const profile = await updateProfile(reqParam);
  return profile;
});
