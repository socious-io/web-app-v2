import { Avatar } from '../../../../atoms/avatar/avatar';
import { Header } from '../../../../atoms/header/header';
import { HeaderStaticMobile } from '../../../../templates/header-static-mobile/header-static-mobile';

export const Mobile = (): JSX.Element => {
  return (
    <HeaderStaticMobile>
      <Header height="auto" title="title" right={<Avatar size="2rem" type="user" />} />
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati facere asperiores
        accusamus! Provident eos, placeat ipsum harum sint veniam esse suscipit architecto
        reiciendis molestiae, repellat commodi fuga. Tenetur, quisquam at! Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Obcaecati facere asperiores Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Obcaecati facere asperiores Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Obcaecati facere asperiores accusamus! Provident eos, placeat
        ipsum harum sint veniam esse suscipit architecto reiciendis molestiae, repellat commodi
        fuga. Tenetur, quisquam at! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Obcaecati facere asperiores Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Obcaecati facere asperiores Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Obcaecati facere asperiores accusamus! Provident eos, placeat ipsum harum sint veniam esse
        suscipit architecto reiciendis molestiae, repellat commodi fuga. Tenetur, quisquam at!
        accusamus! Provident eos, placeat ipsum harum sint veniam esse suscipit architecto
        reiciendis molestiae, repellat commodi fuga. Tenetur, quisquam at! accusamus! Provident eos,
        placeat ipsum harum sint veniam esse suscipit architecto reiciendis molestiae, repellat
        commodi fuga. Tenetur, quisquam at! accusamus! Provident eos, placeat ipsum harum sint
        veniam esse suscipit architecto reiciendis molestiae, repellat commodi fuga. Tenetur,
        quisquam at! accusamus! Provident eos, placeat ipsum harum sint veniam esse suscipit
        architecto reiciendis molestiae, repellat commodi fuga. Tenetur, quisquam at! Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Obcaecati facere asperiores accusamus!
        Provident eos, placeat ipsum harum sint veniam esse suscipit architecto reiciendis
        molestiae, repellat commodi fuga. Tenetur, quisquam at!
      </div>
    </HeaderStaticMobile>
  );
};
