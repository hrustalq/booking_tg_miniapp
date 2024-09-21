import { createContext } from "react";
import { UserGroupDto } from "../api/usergroups/types";

interface UserGroupsContextType {
  userGroups: UserGroupDto[];
  isLoadingUserGroups: boolean;
  userGroupsError: unknown;
  refetchUserGroups: () => void;
}

const UserGroupsContext = createContext<UserGroupsContextType>({
  userGroups: [],
  isLoadingUserGroups: false,
  userGroupsError: null,
  refetchUserGroups: () => {},
});

export default UserGroupsContext;