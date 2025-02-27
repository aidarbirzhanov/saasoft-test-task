export type RecordType = 'Local' | 'LDAP';

export interface Account {
  tags: { text: string }[];
  recordType: RecordType;
  login: string;
  password?: string;
}
