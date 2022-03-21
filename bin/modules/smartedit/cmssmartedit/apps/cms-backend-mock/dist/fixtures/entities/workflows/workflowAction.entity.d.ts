import { TypedMap } from '../typedMap.entity';
export interface IWorkflowAction {
    actionType: string;
    code: string;
    decisions: {
        code: string;
        description: TypedMap<string>;
        name: TypedMap<string>;
    }[];
    description: TypedMap<string>;
    isCurrentUserParticipant: boolean;
    startedAgoInMillis: number;
    name: TypedMap<string>;
    status: string;
}
