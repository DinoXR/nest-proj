export enum ActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  GET = 'get',
}
export type ManagePreferencesType = {
  preference?: PreferenceReqType;
  action: ActionType;
  headers?: any;
};

export type PreferenceReqType = {
  preferenceId: string;
};
