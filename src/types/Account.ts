export type RecordType = 'Local' | 'LDAP'

export interface Account {
  tags: string[]
  recordType: RecordType,
  login: string,
  password?: string
}
