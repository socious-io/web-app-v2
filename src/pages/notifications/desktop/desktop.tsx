import { useNavigate } from '@tanstack/react-location';
import { Card } from '../../../components/atoms/card/card';
import { TwoColumnCursor } from '../../../components/templates/two-column-cursor/two-column-cursor';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <TwoColumnCursor>
      <Card className={css.settings}>
        Notifications
        <img src="/icons/settings-black.svg" onClick={() => navigate({ to: 'settings' })} />
      </Card>
      <Card>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet possimus magnam libero porro, aliquid doloremque
        velit sapiente aperiam maiores autem maxime. Rem, corporis veritatis. Id nobis at qui provident veniam.
      </Card>
    </TwoColumnCursor>
  );
};
