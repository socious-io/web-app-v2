import { AdditionalRes, AdditionalTypes } from 'src/core/api/additional/additional.types';

export const UseUpdatelinks = (links: AdditionalRes[] | null, setLinks: (newVal: AdditionalRes[]) => void) => {
  const addNewLink = () => {
    let linksObj = links?.length ? [...links] : [];
    const newLink = {
      id: links?.length.toString() || '0',
      identity_id: '',
      create_at: new Date(),
      update_at: new Date(),
      type: 'PORTFOLIO' as AdditionalTypes,
      title: '',
      url: '',
      enabled: null,
    };
    linksObj = linksObj.concat(newLink);
    setLinks(linksObj);
  };

  const editLink = (id: string, title: AdditionalTypes, url: string) => {
    const linksObj = links?.length ? [...links] : [];
    const idx = linksObj.findIndex(l => l.id === id);
    if (idx > -1) {
      linksObj[idx].title = title;
      linksObj[idx].url = url;
    }
    setLinks(linksObj);
  };

  const deleteLink = (id: string) => {
    const linksObj = links?.filter(l => l.id !== id) || [];
    setLinks(linksObj);
  };
  return { addNewLink, editLink, deleteLink };
};
