import variables from 'src/components/_exports.module.scss';
import { skillsToCategory } from 'src/core/adaptors';
import { Icon } from 'src/Nowruz/general/Icon';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';

import css from './about.module.scss';

interface SkillsProps {
  skills?: string[] | null;
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const items = skills ? skillsToCategory(skills).map((skill) => skill.label) : [];
  return (
    <div className="w-full flex flex-col gap-5">
      <div className={css.title}>
        Skills
        <div className={css.editBtn}>
          <Icon name="pencil-01" color={variables.color_grey_600} fontSize={20} />
        </div>
      </div>
      <ChipList items={items} />
    </div>
  );
};
