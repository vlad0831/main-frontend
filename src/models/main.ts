export interface Account {
  title: string;
  subTitle: string;
  onPress: (accountId: string) => unknown;
}

export interface AccountButton {
  title: string;
}

export interface AccountInfo {
  institutionName: string;
  accountName: string;
  id: string;
}
