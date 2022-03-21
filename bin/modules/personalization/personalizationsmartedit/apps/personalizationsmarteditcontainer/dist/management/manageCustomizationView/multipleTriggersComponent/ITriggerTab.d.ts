export interface ITriggerTab {
    id: string;
    title: string;
    templateUrl: string;
    isTriggerDefined(): boolean;
    isValidOrEmpty(): boolean;
}
