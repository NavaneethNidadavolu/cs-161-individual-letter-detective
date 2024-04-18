This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Prerequisites

To run this project, make sure you have the following software installed on your computer:

- Node.js version 20 or higher
- npm version 10 or higher

You can download Node.js from the official website: [https://nodejs.org](https://nodejs.org)

After installing Node.js, you will have npm (Node Package Manager) automatically installed along with it.

# Frontend

First, run the frontend development server:

```bash

git clone https://github.com/navaneethnivol/cs-161-individual-letter-detective

cd cs-161-individual-letter-detective/dev/frontend

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Backend

Step 1: create python virtual environment

```bash
cd cs-161-individual-letter-detective/dev/backend

python3 -m venv venv

source venv/bin/activate
```

Step 2: Install pip packages

```bash
pip install -r requirements.txt
```


Step 4: Set up the environment variables

create a file called .env

```bash (You can get the values from any hosted service (I used vercel))
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Step 3: Run the backend server

```bash
python app.py
```


Backend Server Run on [http://localhost:4000](http://localhost:4000)


(Optional) Run Dokerized Version

Prerequisites
    - Have docker installed on your pc


Step 1: 

```bash cd to backend path
cd /dev/backend
```

Step 2: Set up the environment variables

create a file called .env

```bash (You can get the values from any hosted service (I used vercel))
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

Step 3: Run docker

```bash
docker compose up -d
```