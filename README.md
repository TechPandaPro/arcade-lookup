# Arcade Lookup

## Overview

This is a centralized tool for viewing all your Arcade session data. It provides a page with a table of all your sessions, as well as a page with a line chart of your hours per day.

This is built with Next.js and is primarily intended to be ran locally. Your API key is stored in a `.env.local` file on the server.

## Usage

### Installation

```bash
git clone https://github.com/TechPandaPro/arcade-lookup.git
cd arcade-lookup
npm install
```

### Adding Your API Key

This project requires your API key in order to fetch your session data. You can generate an API key using the `/api` command in Slack.

After your API key has been generated, it can be added to the `.env.local` file:

```bash
echo "mysupercoolapikey" > .env.local
```

### Starting the Server

You can start the Next.js development server with `npm run dev`. The Arcade Lookup tool should then be accessible at `http://localhost:3000`.
