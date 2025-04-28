export type CookieSelectionState = true | false | 'indeterminated';

export interface CookieModel {
  selectAll: CookieSelectionState;
  cookieGroups: CookieGroupModel[];
}

export interface CookieGroupModel {
  groupId: string;
  groupSelected: CookieSelectionState;
  cookieList: CookieItemModel[];
}

export interface CookieItemModel {
  cookieId: string;
  cookieSelected: boolean;
}
