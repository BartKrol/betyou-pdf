# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BetYou PDF Statement Generator - A Next.js web application for generating PDF-ready account statements from BetYou gambling platform data via GraphQL API.

## Development Commands

- `yarn dev` or `npm run dev` - Start development server on localhost:3000
- `yarn build` or `npm run build` - Build for production
- `yarn lint` or `npm run lint` - Run ESLint linting
- `yarn codegen` or `npm run codegen` - Generate GraphQL types from schema

## Architecture

### Stack
- **Frontend**: Next.js 13.0.6 with TypeScript and React 18.2.0
- **Styling**: Tailwind CSS 3.2.4
- **Data**: GraphQL API at `localhost:4000` using `graphql-request`
- **Code Generation**: GraphQL Code Generator for TypeScript definitions

### Key Directories
- `/pages/` - Next.js pages and API routes
- `/gql/` - Auto-generated GraphQL TypeScript definitions
- `/styles/` - Global CSS and Tailwind configuration

### GraphQL Integration
- Schema endpoint: `http://localhost:4000`
- Code generation scans `pages/**/*.tsx` for GraphQL queries
- Generated types are placed in `./gql/` directory
- Run `yarn codegen` after modifying GraphQL queries

### Authentication
- Uses token-based auth via URL query parameters
- CORS middleware configured for betyou.com domain

### Core Functionality
The main page (`pages/index.tsx`) fetches and displays:
- User account information (`me` query)
- Payment history (deposits/withdrawals with status, method, amount)
- Wagering history (bets with amounts, results, timestamps, bet details)

Data is fetched client-side using the `AccountStatement` GraphQL query and formatted for PDF-ready display.

## Testing
No testing framework is currently configured. Only ESLint is available for code quality checks.