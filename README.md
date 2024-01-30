# NBA Dashboard

## Description

This web application provides an interactive dashboard for NBA statistics. It leverages the free NBA API to offer features such as listing NBA teams and games, showing their rosters and displaying any player/game stats. It is structured into 3 main UI sections, and was built using React with TypeScript.

## Features

1. **List all teams**: View a list of all NBA teams.
2. **Select player from team roster**: Pick any team players using infinite scroll.
3. **List team games**: View a paginated list of all team games.
4. **List player and game stats**: Access any player stats or even any game stats [Extra Feature].
5. **Testing**: Comprehensive testing included to ensure functionality and reliability.

## Architecture

```plaintext
nba-dashboard/
├── public/                         # Public assets like HTML, CSS, JS files
├── src/                            # Source code of the application
│   ├── components/                 # Reusable React components
│   │   ├── Dashboard/              # Dashboard component
│   │   ├── Games/                  # Games component
│   │   ├── Header/                 # Header component
│   │   ├── Logo/                   # Logo component
│   │   ├── Roster/                 # Roster component
│   │   ├── Stats/                  # Stats component
│   │   └── Table/                  # Table component for pagination
│   ├── entities/                   # Entity definitions
│   ├── hooks/                      # Custom React hooks
│   ├── interfaces/                 # TypeScript interfaces
│   ├── services/                   # Services for API interaction
│   ├── utils/                      # Utility functions
│   ├── App.test.tsx                # Test for App component
│   ├── App.tsx                     # Main React component
│   ├── index.scss                  # Main stylesheet
│   ├── index.tsx                   # Entry point for React application
│   └── setupTests.ts               # Setup file for tests
├── .env                            # Environment variables to access API
└── ...                             # Other configuration files

```

## Installation

To install and run the application, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

```
git clone https://github.com/your-username/nba-dashboard.git
cd nba-dashboard
```

2. **Install Dependencies**: Install the necessary dependencies using npm.

`npm install`

3. **Environment Variables**: Ensure the `.env` file contains the correct API keys and endpoints.

4. **Run the Application**: Start the application.

`npm start`

This will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Contributing

Contributions to improve the application are welcome. For major changes, please open an issue first to discuss what you would like to change.

