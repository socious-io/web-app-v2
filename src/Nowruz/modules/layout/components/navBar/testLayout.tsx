import { TestSwitchDropDown } from 'src/Nowruz/modules/general/components/avatarDropDown/test';
import { NavBar } from '.';

const TestLayout = () => {
  return (
    <div className="w-full h-screen">
      {/* <NavBar /> */}
      <div className="w-80">
        <TestSwitchDropDown />
      </div>
    </div>
  );
};

export default TestLayout;
