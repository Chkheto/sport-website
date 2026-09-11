export interface Player {
  player_name: string;
  player_key: string;
  team_name: string;
  team_key: string;
  position: string;
  height?: string;
  weight?: string;
  dob?: string;
}

export interface Team {
  team_name: string;
  team_key: string;
  league_key: string;
  team_logo?: string;
}
