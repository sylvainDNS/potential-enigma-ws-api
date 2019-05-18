CREATE TABLE game
(
  game_id UUID NOT NULL DEFAULT uuid_generate_v4() ,
  name TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "deletedAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  CONSTRAINT pk_game PRIMARY KEY ( game_id )
);