import css from './index.module.scss';

const TechSummit = () => {
  return (
    <div className={css['bg']}>
      <div className={css['bg__shadow']}>
        <span className="text-7xl leading-[90px] font-medium">Tech for Impact Summit 2024</span>
        <span className="text-3xl leading-10">Meet the global leaders in Tech for Good</span>
      </div>
    </div>
  );
};

export default TechSummit;
