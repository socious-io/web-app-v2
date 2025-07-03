import { useRef, useState } from 'react';
import { config } from 'src/config';
import useDetectOutside from 'src/core/hooks/detectOutside';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

const NavPortal = () => {
  const [openNav, setOpenNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useDetectOutside(navRef, () => setOpenNav(false));

  const products = [
    {
      name: 'Work',
      logo: '/images/logo/logo.svg',
      link: config.appBaseURL,
    },
    {
      name: 'Verify',
      logo: '/images/logo/verify-logo.svg',
      link: config.verifyURL,
    },
    {
      name: 'Fund',
      logo: '/images/logo/fund-logo.svg',
      link: config.fundURL,
    },
  ];

  return (
    <div ref={navRef} className="relative">
      <Icon
        name="dots-grid"
        fontSize={28}
        color={variables.color_primary_600}
        cursor="pointer"
        containerClass={`w-12 h-12 p-1.5 cursor-pointer border-4 border-Brand-100 rounded-full ${openNav && 'bg-Gray-light-mode-100 border-solid'} hover:bg-Gray-light-mode-100 hover:border-solid`}
        onClick={e => {
          e?.preventDefault();
          setOpenNav(!openNav);
        }}
      />
      <div
        className={`w-[15rem] max-h-[15rem] ${openNav ? 'flex' : 'hidden'} items-center gap-7 flex-wrap py-4 px-8 mt-1 absolute top-full right-0 z-[1000] bg-Base-White border border-solid border-Gray-light-mode-200 rounded-default shadow-lg overflow-auto select-none`}
      >
        {products.map(product => (
          <div
            key={product.name}
            className="max-w-fit flex-1 flex flex-col items-center gap-0.5 text-xs leading-5 text-Gray-light-mode-600 cursor-pointer"
            onClick={() => (window.location.href = product.link)}
          >
            <div className="flex items-center justify-center p-2 bg-Gray-light-mode-100 rounded-full">
              <img src={product.logo} alt={`Socious ${product.name}`} width={24} height={24} />
            </div>
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavPortal;
