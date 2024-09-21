import React from 'react';
import { useUserGroupsStore } from '../store/userGroupsStore';
import { UserGroupItem } from './UserGroupItem';

export const UserGroupsList: React.FC = () => {
  const { userGroups } = useUserGroupsStore();

  return (
    <div className="user-groups-list">
      <h2>User Groups</h2>
      {userGroups.map((userGroup) => (
        <UserGroupItem key={userGroup.id} userGroup={userGroup} />
      ))}
    </div>
  );
};