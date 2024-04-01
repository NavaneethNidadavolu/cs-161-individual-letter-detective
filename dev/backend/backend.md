Database Table:

CREATE TABLE numrecall_users (
    user_id VARCHAR(255),
    game_id SERIAL,
    user_name VARCHAR(255),
    user_pic VARCHAR(255),
    score INT,
    PRIMARY KEY (user_id, game_id)
);

.env config file (Get these details from vercel)

POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=