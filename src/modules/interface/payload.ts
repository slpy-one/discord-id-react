export interface PayloadInterface {
  op: number;
  d: socketInterface | mainPayload;
  t: string;
}

export interface socketInterface {
  [key: string]: mainPayload;
}

export interface mainPayload {
  kv: Kv;
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: string;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_embedded: boolean;
  listening_to_spotify: boolean;
  spotify: Spotify;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state: string;
  session_id?: string;
  created_at: number;
  flags?: number;
  details?: string;
  timestamps?: Timestamps;
  assets?: Assets;
  sync_id?: string;
  party?: Party;
  application_id?: string;
  platform?: string;
  emoji?: Emoji;
}

export interface Assets {
  large_image: string;
  large_text: string;
  small_image?: string;
  small_text?: string;
}

export interface Emoji {
  name: string;
}

export interface Party {
  id: string;
}

export interface Timestamps {
  start: number;
  end?: number;
}

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  clan: null;
  primary_guild: PrimaryGuild;
  avatar_decoration_data: AvatarDecorationData;
  collectibles: Collectibles;
  bot: boolean;
  global_name: string;
  display_name: string;
  display_name_styles: DisplayNameStyles;
  public_flags: number;
}

export interface AvatarDecorationData {
  sku_id: string;
  asset: string;
  expires_at: null;
}

export interface Collectibles {
  nameplate: Nameplate;
}

export interface Nameplate {
  label: string;
  sku_id: string;
  asset: string;
  expires_at: null;
  palette: string;
}

export interface DisplayNameStyles {
  colors: number[];
  effect_id: number;
  font_id: number;
}

export interface PrimaryGuild {
  tag: string;
  identity_guild_id: string;
  badge: string;
  identity_enabled: boolean;
}

export interface Kv {}

export interface Spotify {
  timestamps: Timestamps;
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
  track_id: string;
}
