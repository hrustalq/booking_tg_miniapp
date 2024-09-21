import React from 'react';
import { UserGroupDto } from '../api/usergroups/types';

interface UserGroupItemProps {
  userGroup: UserGroupDto;
}

export const UserGroupItem: React.FC<UserGroupItemProps> = ({ userGroup }) => {
  return (
    <div className="user-group-item">
      <h3>{userGroup.name}</h3>
      <div className="default-rate">
        <h4>Default Rate</h4>
        <p>Start Fee: {userGroup.defaultRate.startFee}</p>
        <p>Minimum Fee: {userGroup.defaultRate.minimumFee}</p>
        <p>Rate: {userGroup.defaultRate.rate}</p>
        <p>Charge Every: {userGroup.defaultRate.chargeEvery} minutes</p>
        <p>Charge After: {userGroup.defaultRate.chargeAfter} minutes</p>
        <p>Step Based: {userGroup.defaultRate.isStepBased ? 'Yes' : 'No'}</p>
      </div>
      {userGroup.rates && userGroup.rates.length > 0 && (
        <div className="additional-rates">
          <h4>Additional Rates</h4>
          {userGroup.rates.map((rate, index) => (
            <div key={index} className="rate-item">
              <p>Start Fee: {rate.startFee}</p>
              <p>Minimum Fee: {rate.minimumFee}</p>
              <p>Rate: {rate.rate}</p>
              <p>Charge Every: {rate.chargeEvery} minutes</p>
              <p>Charge After: {rate.chargeAfter} minutes</p>
              <p>Step Based: {rate.isStepBased ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};