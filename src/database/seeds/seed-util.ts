export function stringToSql(str: string | null | undefined): string {
  return str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
}
