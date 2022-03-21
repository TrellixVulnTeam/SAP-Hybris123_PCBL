import { IUserGroups } from 'fixtures/entities/userGroups';
export declare class UserGroupsController {
    getUserGroupByID(userGroupId: string): IUserGroups;
    getUserGroups(): {
        pagination: {
            count: number;
            page: number;
            totalCount: number;
            totalPages: number;
        };
        userGroups: IUserGroups[];
    };
}
