-- Kypros, the game: friends leaderboards.
-- Run this once in the Supabase SQL editor.
-- Tables stay closed to direct access. The app only uses the functions below,
-- each of which acts on the signed-in player.

create table if not exists players (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Explorer' check (char_length(name) between 1 and 30),
  points integer not null default 0 check (points >= 0),
  island numeric(5,2) not null default 0 check (island between 0 and 100),
  latest text,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null check (char_length(name) between 1 and 40),
  owner uuid not null references players(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists members (
  group_id uuid not null references groups(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (group_id, player_id)
);

alter table players enable row level security;
alter table groups enable row level security;
alter table members enable row level security;

create or replace function save_player(p_name text, p_points integer, p_island numeric, p_latest text, p_state jsonb)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  insert into players (id, name, points, island, latest, state, updated_at)
  values (auth.uid(), coalesce(nullif(trim(p_name), ''), 'Explorer'), p_points, p_island, p_latest, p_state, now())
  on conflict (id) do update set name = excluded.name, points = excluded.points, island = excluded.island,
    latest = excluded.latest, state = excluded.state, updated_at = now();
end $$;

create or replace function load_player()
returns table (name text, state jsonb) language sql security definer set search_path = public as $$
  select p.name, p.state from players p where p.id = auth.uid();
$$;

create or replace function create_group(p_name text)
returns table (id uuid, code text, name text) language plpgsql security definer set search_path = public as $$
declare new_code text; new_id uuid;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  insert into players (id) values (auth.uid()) on conflict do nothing;
  new_code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
  insert into groups (code, name, owner) values (new_code, p_name, auth.uid()) returning groups.id into new_id;
  insert into members (group_id, player_id) values (new_id, auth.uid());
  return query select new_id, new_code, p_name;
end $$;

create or replace function join_group(p_code text)
returns table (id uuid, code text, name text) language plpgsql security definer set search_path = public as $$
declare g groups%rowtype;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  insert into players (id) values (auth.uid()) on conflict do nothing;
  select * into g from groups where groups.code = upper(trim(p_code));
  if not found then raise exception 'That invite link is not valid'; end if;
  insert into members (group_id, player_id) values (g.id, auth.uid()) on conflict do nothing;
  return query select g.id, g.code, g.name;
end $$;

create or replace function my_groups()
returns table (id uuid, code text, name text) language sql security definer set search_path = public as $$
  select g.id, g.code, g.name from groups g
  join members m on m.group_id = g.id
  where m.player_id = auth.uid() order by g.created_at;
$$;

create or replace function group_board(p_group uuid)
returns table (player_id uuid, name text, points integer, island numeric, latest text)
language sql security definer set search_path = public as $$
  select p.id, p.name, p.points, p.island, p.latest
  from members m join players p on p.id = m.player_id
  where m.group_id = p_group
    and exists (select 1 from members me where me.group_id = p_group and me.player_id = auth.uid())
  order by p.points desc, p.updated_at asc;
$$;

revoke all on function save_player(text, integer, numeric, text, jsonb) from public, anon;
revoke all on function load_player() from public, anon;
revoke all on function create_group(text) from public, anon;
revoke all on function join_group(text) from public, anon;
revoke all on function my_groups() from public, anon;
revoke all on function group_board(uuid) from public, anon;
grant execute on function save_player(text, integer, numeric, text, jsonb) to authenticated;
grant execute on function load_player() to authenticated;
grant execute on function create_group(text) to authenticated;
grant execute on function join_group(text) to authenticated;
grant execute on function my_groups() to authenticated;
grant execute on function group_board(uuid) to authenticated;
