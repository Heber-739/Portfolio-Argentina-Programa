export interface JwtDto {
  token: string;
  type: string;
  username: string;
  authorities: string[];
  exist: boolean;
}
