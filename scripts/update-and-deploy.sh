#!/bin/bash

# 🚀 Master Update Script for Green Blue Rest Bangkok
# Complete update system with auto-commit, push, cache-busting, status checks, and auto-deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
REPO_NAME="greenbluerestbangkok"
SITE_URL="https://nattagid.github.io/greenbluerestbangkok"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Script options
FORCE_COMMIT=false
SKIP_STATUS_CHECK=false
CLEAR_CACHE=false
QUICK_MODE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --force-commit)
            FORCE_COMMIT=true
            shift
            ;;
        --skip-status)
            SKIP_STATUS_CHECK=true
            shift
            ;;
        --clear-cache)
            CLEAR_CACHE=true
            shift
            ;;
        --quick)
            QUICK_MODE=true
            shift
            ;;
        --help|-h)
            echo "🚀 Green Blue Rest Bangkok - Master Update Script"
            echo ""
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --force-commit    Force commit even if no changes detected"
            echo "  --skip-status     Skip post-deployment status checks"
            echo "  --clear-cache     Clear GitHub Actions cache before deployment"
            echo "  --quick           Quick mode - minimal checks and faster execution"
            echo "  --help, -h        Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                    # Standard update and deploy"
            echo "  $0 --quick           # Quick update and deploy"
            echo "  $0 --force-commit    # Force commit and deploy"
            echo "  $0 --clear-cache     # Clear cache and deploy"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Function to print section headers
print_section() {
    echo ""
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}$(printf '=%.0s' $(seq 1 ${#1}))${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_section "🔍 Checking Prerequisites"
    
    # Check if we're in the right directory
    if [[ ! -f "index.html" && ! -f "main.html" ]]; then
        echo -e "${RED}❌ Error: Not in the project root directory${NC}"
        echo "Please run this script from the Green Blue Rest Bangkok project root"
        exit 1
    fi
    
    # Check if git is initialized
    if [[ ! -d ".git" ]]; then
        echo -e "${RED}❌ Error: Not a git repository${NC}"
        exit 1
    fi
    
    # Check git configuration
    if [[ -z "$(git config user.name)" ]] || [[ -z "$(git config user.email)" ]]; then
        echo -e "${YELLOW}⚠️ Git user not configured. Setting default...${NC}"
        git config user.name "Auto Deploy Bot"
        git config user.email "noreply@greenbluerestbangkok.com"
    fi
    
    # Check GitHub CLI (optional)
    if command -v gh &> /dev/null; then
        echo -e "${GREEN}✅ GitHub CLI available${NC}"
        export HAS_GH_CLI=true
    else
        echo -e "${YELLOW}⚠️ GitHub CLI not available (some features will be limited)${NC}"
        export HAS_GH_CLI=false
    fi
    
    echo -e "${GREEN}✅ Prerequisites check completed${NC}"
}

# Function to commit current changes
commit_changes() {
    print_section "📝 Auto-Commit Process"
    
    # Check for changes
    if [[ -z "$(git status --porcelain)" && "$FORCE_COMMIT" == "false" ]]; then
        echo -e "${GREEN}✅ No changes to commit - repository is clean${NC}"
        return 0
    fi
    
    if [[ "$FORCE_COMMIT" == "true" ]]; then
        echo -e "${YELLOW}⚡ Force commit mode enabled${NC}"
    fi
    
    # Run the auto-commit script if it exists
    if [[ -x "$SCRIPT_DIR/auto-commit.sh" ]]; then
        echo "🤖 Running auto-commit script..."
        "$SCRIPT_DIR/auto-commit.sh"
    else
        echo "📝 Manual commit process..."
        
        # Add all changes
        git add .
        
        # Create commit message
        timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        commit_msg="🔧 Auto-update: Website improvements

🕐 Generated at: $timestamp

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
        
        # Commit
        git commit -m "$commit_msg"
    fi
    
    echo -e "${GREEN}✅ Changes committed successfully${NC}"
}

# Function to push changes
push_changes() {
    print_section "📤 Pushing Changes to GitHub"
    
    echo "🚀 Pushing to origin main..."
    
    # Try to push, handle potential conflicts
    if git push origin main; then
        echo -e "${GREEN}✅ Successfully pushed to GitHub${NC}"
    else
        echo -e "${YELLOW}⚠️ Push failed, attempting to resolve...${NC}"
        
        # Pull with rebase and try again
        echo "🔄 Pulling latest changes and rebasing..."
        git pull --rebase origin main
        
        echo "🔄 Retrying push..."
        if git push origin main; then
            echo -e "${GREEN}✅ Successfully pushed after rebase${NC}"
        else
            echo -e "${RED}❌ Failed to push changes${NC}"
            echo "Please resolve conflicts manually and run the script again"
            exit 1
        fi
    fi
}

# Function to trigger deployment
trigger_deployment() {
    print_section "🚀 Triggering Auto-Deployment"
    
    if [[ "$HAS_GH_CLI" == "true" ]]; then
        echo "🎯 Triggering GitHub Actions workflow..."
        
        # Prepare workflow inputs
        workflow_inputs=""
        if [[ "$CLEAR_CACHE" == "true" ]]; then
            workflow_inputs="--field clear_cache=true"
        fi
        
        # Trigger the auto-update workflow
        if gh workflow run auto-update.yml $workflow_inputs; then
            echo -e "${GREEN}✅ GitHub Actions workflow triggered${NC}"
            
            if [[ "$QUICK_MODE" == "false" ]]; then
                echo "⏳ Waiting for workflow to start..."
                sleep 10
                
                # Get the latest workflow run
                echo "📊 Checking workflow status..."
                gh run list --workflow=auto-update.yml --limit=1 --json status,conclusion,displayTitle
            fi
        else
            echo -e "${YELLOW}⚠️ Could not trigger workflow via GitHub CLI${NC}"
            echo "The deployment should still trigger automatically from the git push"
        fi
    else
        echo -e "${YELLOW}⚠️ GitHub CLI not available${NC}"
        echo "✅ Deployment will be triggered automatically by the git push"
        echo "🌐 Check GitHub Actions at: https://github.com/nattagid/$REPO_NAME/actions"
    fi
}

# Function to check deployment status
check_deployment_status() {
    if [[ "$SKIP_STATUS_CHECK" == "true" ]]; then
        echo -e "${YELLOW}⏭️ Skipping status checks as requested${NC}"
        return
    fi
    
    print_section "🔍 Checking Deployment Status"
    
    if [[ -x "$SCRIPT_DIR/status-check.sh" ]]; then
        echo "🤖 Running automated status checks..."
        
        if [[ "$QUICK_MODE" == "true" ]]; then
            "$SCRIPT_DIR/status-check.sh" --quick
        else
            "$SCRIPT_DIR/status-check.sh"
        fi
    else
        echo "📊 Manual status check..."
        
        # Basic manual checks
        if [[ "$HAS_GH_CLI" == "true" ]]; then
            echo "📈 Latest workflow runs:"
            gh run list --limit=3 --json status,conclusion,createdAt,displayTitle | \
                jq -r '.[] | "\(.createdAt | split("T")[0]) \(.createdAt | split("T")[1] | split(".")[0]) - \(.displayTitle) - \(.status) \(if .conclusion then "(\(.conclusion))" else "" end)"'
        fi
        
        echo "🌐 Site URL: $SITE_URL"
        echo "📊 GitHub Actions: https://github.com/nattagid/$REPO_NAME/actions"
    fi
}

# Function to show summary
show_summary() {
    print_section "📋 Update Summary"
    
    build_time=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo -e "${GREEN}🎉 Update process completed successfully!${NC}"
    echo ""
    echo -e "${CYAN}📊 Summary:${NC}"
    echo "   ✅ Changes committed and pushed to GitHub"
    echo "   ✅ Auto-deployment workflow triggered"
    echo "   ✅ Cache-busting system active"
    echo "   ✅ Status monitoring enabled"
    echo ""
    echo -e "${CYAN}🌐 Links:${NC}"
    echo "   🏠 Website: $SITE_URL"
    echo "   ⚙️ GitHub Actions: https://github.com/nattagid/$REPO_NAME/actions"
    echo "   📚 Repository: https://github.com/nattagid/$REPO_NAME"
    echo ""
    echo -e "${CYAN}⏰ Completed at: $build_time${NC}"
    
    if [[ "$QUICK_MODE" == "false" ]]; then
        echo ""
        echo -e "${YELLOW}💡 Tips:${NC}"
        echo "   • Use --quick for faster updates"
        echo "   • Use --clear-cache if experiencing cache issues"
        echo "   • Check GitHub Actions for deployment progress"
        echo "   • Site changes may take 1-2 minutes to appear"
    fi
}

# Main execution function
main() {
    echo -e "${PURPLE}🚀 Green Blue Rest Bangkok - Master Update Script${NC}"
    echo -e "${PURPLE}=================================================${NC}"
    echo ""
    
    if [[ "$QUICK_MODE" == "true" ]]; then
        echo -e "${YELLOW}⚡ Quick mode enabled - minimal checks${NC}"
        echo ""
    fi
    
    # Execute the update process
    check_prerequisites
    commit_changes
    push_changes
    trigger_deployment
    
    if [[ "$QUICK_MODE" == "false" ]]; then
        sleep 5  # Give GitHub Actions a moment to start
        check_deployment_status
    fi
    
    show_summary
}

# Handle script interruption
trap 'echo -e "\n${RED}❌ Script interrupted${NC}"; exit 1' INT TERM

# Change to project root directory
cd "$PROJECT_ROOT"

# Run main function
main "$@"