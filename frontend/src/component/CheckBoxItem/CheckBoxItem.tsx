import React, {JSX} from 'react';
import './CheckBoxItem.css';

interface CheckBoxItemProps {
    isAdmin: boolean;
    isShown: boolean;
    handleVacationFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
    headLine: string;
}

function CheckBoxItem({isAdmin, isShown, handleVacationFunction, headLine}: CheckBoxItemProps): JSX.Element {

    return (
        <div className="checkbox-item-container">
            <label
                className={isAdmin ? "checkbox-display-none" : "checkbox-label"}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={isShown}
                    onChange={handleVacationFunction}
                />
                <h4>{headLine}</h4>
            </label>
        </div>
    );
}

export default CheckBoxItem;