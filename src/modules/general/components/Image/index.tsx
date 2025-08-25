import { config } from 'src/config';

const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src = '', ...props }) => {
  const isExternalUrl = /^https?:\/\//.test(src) || src.startsWith('//');
  const isBundledAsset = src.startsWith('data:');
  const finalSrc = isExternalUrl || isBundledAsset ? src : config.basePath + src;

  return <img src={finalSrc} {...props} />;
};

export default Image;
