import { useEffect, useState } from 'react';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { Location, searchLocation } from 'src/core/api';

type FilterReq = {
  causes_tags?: Array<string>;
  skills?: Array<string>;
  country?: Array<string>;
  city?: Array<string>;
  label?: { value: string; label: string; countryCode: string };
};

export const useFilterSlider = (onApply: (filter: FilterReq) => void, filter: FilterReq, type: string) => {
  const [skillItems, setSkillItems] = useState<{ value: string; label: string }[]>([]);
  const [causesItems, setCausesItems] = useState<{ value: string; label: string }[]>([]);
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);
  const [causes, setCauses] = useState<{ value: string; label: string }[]>([]);
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [cityLabel, setCityLabel] = useState({});

  const getOptionsFromValues = (values: string[], options: { value: string; label: string }[]) =>
    options.filter((option) => values.includes(option.value));

  const cityToOption = (cities: Location[]) => {
    if (!cities.length) return;
    return cities.map((city) => ({
      value: city.id,
      label: `${city.name}, ${city.region_name}`,
      countryCode: city.country_code,
    }));
  };

  const searchCities = async (searchText: string) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cityToOption(response.items);
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const onSelectCity = (location: { value: string; label: string; countryCode: string }) => {
    setCountry(location.countryCode);
    setCityLabel(location);
    setCity(location.label.split(',')[0]);
  };

  const handleApply = () => {
    const filter = {
      ...(skills.length > 0 && { skills: skills.map((skill) => skill.value) }),
      ...(causes.length > 0 && { causes_tags: causes.map((cause) => cause.value) }),
      ...(country && { country: [country] }),
      ...(city && { city: [city] }),
    };
    onApply(filter);
  };

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => setSkillItems(data));
    setCausesItems(socialCausesToCategoryAdaptor());
  }, []);

  useEffect(() => {
    if (type !== 'organization') {
      setSkills(getOptionsFromValues(filter.skills ?? [], skillItems));
    }
    if (filter.causes_tags?.length) {
      setCauses(getOptionsFromValues(filter.causes_tags || [], causesItems));
    }
    if (filter.label?.countryCode) {
      setCityLabel(filter.label);
    }
  }, [causesItems, filter.causes_tags, filter.label, filter.skills, skillItems, type]);

  return {
    data: { skillItems, skills, causesItems, causes, cityLabel },
    operations: { setSkills, setCauses, searchCities, onSelectCity, handleApply },
  };
};
