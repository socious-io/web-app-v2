import Rating from '@mui/material/Rating';
import { SearchInput } from 'src/Nowruz/modules/Search/components/SearchInput';
import css from './reviews.module.scss';


export const Reviews = () => { 
    const fetchSearchResult = () => {
        console.log('serach');
    };
    return (
        <>
            <h2 className='text-lg font-semibold mb-5'>Reviews</h2>
            <div className='flex gap-1'>
                <div>
                    <Rating value={5} readOnly icon={<img src="/icons/star.svg" />} />
                </div>
                <div>4.9</div>
                <div>16 Reviews</div>
            </div>
            <div>
                <div>
                    <SearchInput
                    value={''}
                    onChange={fetchSearchResult}
                    placeholder="Search jobs, people, organizations"
                    />
                </div>
                <div className={css.sort}>
                    sort
                </div>
                <div className={css.resultContent}>
                    <div>
                        <div><img alt="" /></div>
                        <div><img alt="" /></div>
                    </div>
                    <div>
                        <div>
                            Ocean Protection 2days ago
                        </div>
                        <div>
                            Harry Peterson, Co-Founder and CEO
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};