#!/bin/bash

# Status check script for Green Blue Rest Bangkok GitHub Pages deployment
# Monitors deployment status and provides comprehensive health checks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
REPO_OWNER="greenbluerestbangkok"
REPO_NAME="greenbluerestbangkok"
SITE_URL="https://${REPO_OWNER}.github.io/"
MAX_WAIT_TIME=300  # 5 minutes
CHECK_INTERVAL=10  # 10 seconds

echo -e "${BLUE}🔍 Green Blue Rest Bangkok - Deployment Status Checker${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Function to check if GitHub CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}⚠️  GitHub CLI not found. Installing with homebrew...${NC}"
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo -e "${RED}❌ GitHub CLI and Homebrew not found. Please install GitHub CLI manually.${NC}"
            echo "   Visit: https://cli.github.com/"
            exit 1
        fi
    fi
}

# Function to check GitHub authentication
check_auth() {
    echo -e "${BLUE}🔐 Checking GitHub authentication...${NC}"
    if ! gh auth status &> /dev/null; then
        echo -e "${YELLOW}⚠️  Not authenticated with GitHub. Please run: gh auth login${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ GitHub authentication OK${NC}"
}

# Function to check repository status
check_repo_status() {
    echo -e "${BLUE}📊 Checking repository status...${NC}"
    
    # Check if we're in the right repository
    current_repo=$(git remote get-url origin 2>/dev/null | sed 's/.*\/\([^\/]*\)\.git/\1/' || echo "unknown")
    if [ "$current_repo" != "$REPO_NAME" ]; then
        echo -e "${YELLOW}⚠️  Current directory might not be the correct repository${NC}"
        echo "   Expected: $REPO_NAME"
        echo "   Current: $current_repo"
    fi
    
    # Check git status
    echo "   📋 Git Status:"
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}   ⚠️  There are uncommitted changes${NC}"
        git status --porcelain | head -10
    else
        echo -e "${GREEN}   ✅ Working directory is clean${NC}"
    fi
    
    # Check current branch
    current_branch=$(git branch --show-current)
    echo "   🌿 Current branch: $current_branch"
    
    # Check if branch is ahead/behind remote
    if git status | grep -q "ahead"; then
        echo -e "${YELLOW}   ⚠️  Local branch is ahead of remote${NC}"
    elif git status | grep -q "behind"; then
        echo -e "${YELLOW}   ⚠️  Local branch is behind remote${NC}"
    else
        echo -e "${GREEN}   ✅ Branch is up to date with remote${NC}"
    fi
}

# Function to check GitHub Actions workflow status
check_workflow_status() {
    echo -e "${BLUE}⚙️  Checking GitHub Actions workflow status...${NC}"
    
    # Get the latest workflow runs
    workflow_runs=$(gh run list --limit 5 --json status,conclusion,createdAt,headBranch,displayTitle 2>/dev/null || echo "[]")
    
    if [ "$workflow_runs" = "[]" ]; then
        echo -e "${YELLOW}   ⚠️  No workflow runs found or unable to fetch${NC}"
        return
    fi
    
    # Parse and display workflow status
    echo "$workflow_runs" | jq -r '.[] | "   \(.createdAt | split("T")[0]) \(.createdAt | split("T")[1] | split(".")[0]) - \(.displayTitle) - \(.status) \(if .conclusion then "(\(.conclusion))" else "" end)"' | head -3
    
    # Check if latest run was successful
    latest_status=$(echo "$workflow_runs" | jq -r '.[0].status // "unknown"')
    latest_conclusion=$(echo "$workflow_runs" | jq -r '.[0].conclusion // "none"')
    
    if [ "$latest_status" = "completed" ] && [ "$latest_conclusion" = "success" ]; then
        echo -e "${GREEN}   ✅ Latest deployment was successful${NC}"
    elif [ "$latest_status" = "in_progress" ]; then
        echo -e "${YELLOW}   ⏳ Deployment is currently in progress${NC}"
        return 1  # Indicate that deployment is still running
    else
        echo -e "${RED}   ❌ Latest deployment failed or has issues${NC}"
        return 2  # Indicate deployment failure
    fi
}

# Function to check GitHub Pages status
check_pages_status() {
    echo -e "${BLUE}📄 Checking GitHub Pages status...${NC}"
    
    pages_info=$(gh api repos/${REPO_OWNER}/${REPO_NAME}/pages 2>/dev/null || echo "{}")
    
    if [ "$pages_info" = "{}" ]; then
        echo -e "${RED}   ❌ GitHub Pages not configured or inaccessible${NC}"
        return 1
    fi
    
    pages_status=$(echo "$pages_info" | jq -r '.status // "unknown"')
    pages_source=$(echo "$pages_info" | jq -r '.source.branch // "unknown"')
    
    echo "   🌐 Pages Status: $pages_status"
    echo "   🌿 Source Branch: $pages_source"
    echo "   🔗 Site URL: $SITE_URL"
    
    if [ "$pages_status" = "built" ]; then
        echo -e "${GREEN}   ✅ GitHub Pages is built and ready${NC}"
    else
        echo -e "${YELLOW}   ⚠️  GitHub Pages status: $pages_status${NC}"
    fi
}

# Function to check site accessibility
check_site_accessibility() {
    echo -e "${BLUE}🌐 Checking site accessibility...${NC}"
    
    # Check if site is accessible
    if curl -s -f -o /dev/null "$SITE_URL"; then
        echo -e "${GREEN}   ✅ Site is accessible at $SITE_URL${NC}"
        
        # Get response headers
        response_code=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL")
        response_time=$(curl -s -o /dev/null -w "%{time_total}" "$SITE_URL")
        
        echo "   📊 Response Code: $response_code"
        echo "   ⏱️  Response Time: ${response_time}s"
        
        # Check if content is fresh (not cached)
        last_modified=$(curl -s -I "$SITE_URL" | grep -i "last-modified" | cut -d' ' -f2- || echo "Unknown")
        echo "   📅 Last Modified: $last_modified"
        
    else
        echo -e "${RED}   ❌ Site is not accessible at $SITE_URL${NC}"
        return 1
    fi
}

# Function to wait for deployment completion
wait_for_deployment() {
    echo -e "${BLUE}⏳ Waiting for deployment to complete...${NC}"
    
    elapsed=0
    while [ $elapsed -lt $MAX_WAIT_TIME ]; do
        if check_workflow_status > /dev/null; then
            echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
            return 0
        fi
        
        echo "   ⏰ Waiting... (${elapsed}s/${MAX_WAIT_TIME}s)"
        sleep $CHECK_INTERVAL
        elapsed=$((elapsed + CHECK_INTERVAL))
    done
    
    echo -e "${RED}⏰ Timeout waiting for deployment to complete${NC}"
    return 1
}

# Main execution
main() {
    # Check prerequisites
    check_gh_cli
    check_auth
    
    # Perform status checks
    echo ""
    check_repo_status
    echo ""
    
    workflow_status_result=0
    check_workflow_status || workflow_status_result=$?
    echo ""
    
    check_pages_status
    echo ""
    
    # If deployment is in progress, wait for it
    if [ $workflow_status_result -eq 1 ]; then
        wait_for_deployment
        echo ""
    fi
    
    check_site_accessibility
    echo ""
    
    # Summary
    echo -e "${BLUE}📋 Status Check Summary${NC}"
    echo -e "${BLUE}=====================${NC}"
    
    if [ $workflow_status_result -eq 0 ]; then
        echo -e "${GREEN}✅ All systems operational!${NC}"
        echo -e "${GREEN}   Your site should be live at: $SITE_URL${NC}"
    elif [ $workflow_status_result -eq 1 ]; then
        echo -e "${YELLOW}⏳ Deployment in progress...${NC}"
        echo -e "${YELLOW}   Check again in a few minutes${NC}"
    else
        echo -e "${RED}❌ Issues detected with deployment${NC}"
        echo -e "${RED}   Please check GitHub Actions logs${NC}"
    fi
}

# Handle script arguments
case "${1:-}" in
    "--wait")
        wait_for_deployment
        ;;
    "--quick")
        check_workflow_status && check_site_accessibility
        ;;
    *)
        main
        ;;
esac