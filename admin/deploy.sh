#!/bin/bash

# 🚀 Vercel Deployment Script for GreenBlueRest Admin Panel
# Usage: ./deploy.sh [environment]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-production}

echo -e "${BLUE}🚀 Starting deployment to Vercel...${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the admin directory.${NC}"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel. Please login first:${NC}"
    echo -e "${BLUE}vercel login${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

echo -e "${BLUE}🔍 Running type check...${NC}"
npm run type-check

echo -e "${BLUE}🧹 Running linter...${NC}"
npm run lint

echo -e "${BLUE}🏗️  Building project...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Deploying to Vercel...${NC}"

if [ "$ENVIRONMENT" = "production" ]; then
    vercel --prod
else
    vercel
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo -e "${GREEN}✅ Your Admin Panel is now live on Vercel!${NC}"
    echo -e "${BLUE}📝 Don't forget to:${NC}"
    echo -e "${BLUE}   1. Set environment variables in Vercel dashboard${NC}"
    echo -e "${BLUE}   2. Configure Strapi CORS settings${NC}"
    echo -e "${BLUE}   3. Test the deployment${NC}"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    exit 1
fi

echo -e "${GREEN}🎊 Deployment completed!${NC}"
