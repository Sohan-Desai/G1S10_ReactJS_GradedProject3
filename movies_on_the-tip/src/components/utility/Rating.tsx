import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as starEmpty } from '@fortawesome/free-regular-svg-icons';

type Props = {
    ratings: number[],
    className?: string
};

const Rating = ({ ratings, className }: Props) => {

    const [value, setValue] = useState<number>(0);
    let tempValue : number;

    const numFullStars = Math.floor(value);
    const numHalfStars = Math.round(value) - Math.floor(value);
    const numEmptyStars = 5 - (numFullStars + numHalfStars);

    useEffect(() => {
        tempValue = ((ratings.reduce((result, v) => (result + v), 0)) / ratings.length)/2;
        setValue(parseFloat(tempValue.toFixed(2)));
    }, [])


    return (
        <span className={className}>
            <span className='me-2' style={{ color: 'goldenrod' }}>
                {
                    Array.from({ length: numFullStars }).map(
                        (item, idx) => (
                            <FontAwesomeIcon icon={faStar} key={idx} />
                        )
                    )
                }
                {
                    Array.from({ length: numHalfStars }).map(
                        (item, idx) => (
                            <FontAwesomeIcon icon={faStarHalfAlt} key={idx} />
                        )
                    )
                }
                {
                    Array.from({ length: numEmptyStars }).map(
                        (item, idx) => (
                            <FontAwesomeIcon icon={starEmpty} key={idx} />
                        )
                    )
                }
            </span>
            <span>
                <strong>{value}</strong> ({ratings.length} ratings)
            </span>
        </span>
    )
}

Rating.defaultProps = {
    ratings: [5],
};

export default Rating
