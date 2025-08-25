#!/bin/bash

# Auto-commit script for Green Blue Rest Bangkok website
# This script automatically commits all current changes with a descriptive message

set -e

echo "🚀 Starting auto-commit process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check git status
echo "📊 Checking current git status..."
git status --porcelain

# Check if there are any changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit. Repository is clean."
    exit 0
fi

# Add all changes
echo "📝 Adding all changes to staging area..."
git add .

# Generate commit message based on changes
echo "💭 Generating commit message..."

# Check for different types of changes
has_html_changes=$(git diff --cached --name-only | grep -E "\.(html)$" | wc -l)
has_css_changes=$(git diff --cached --name-only | grep -E "\.(css)$" | wc -l)
has_js_changes=$(git diff --cached --name-only | grep -E "\.(js)$" | wc -l)
has_image_changes=$(git diff --cached --name-only | grep -E "\.(jpg|jpeg|png|gif|webp)$" | wc -l)
has_config_changes=$(git diff --cached --name-only | grep -E "\.(yml|yaml|json|md)$" | wc -l)

# Build commit message
commit_msg="🔧 Auto-update: "
changes=()

if [ $has_html_changes -gt 0 ]; then
    changes+=("HTML structure ($has_html_changes files)")
fi

if [ $has_css_changes -gt 0 ]; then
    changes+=("CSS styling ($has_css_changes files)")
fi

if [ $has_js_changes -gt 0 ]; then
    changes+=("JavaScript functionality ($has_js_changes files)")
fi

if [ $has_image_changes -gt 0 ]; then
    changes+=("images ($has_image_changes files)")
fi

if [ $has_config_changes -gt 0 ]; then
    changes+=("configuration ($has_config_changes files)")
fi

# Join changes with commas
IFS=', '
commit_msg="${commit_msg}${changes[*]}"

# Add timestamp
commit_msg="$commit_msg

🕐 Generated at: $(date '+%Y-%m-%d %H:%M:%S')

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Commit changes
echo "💾 Committing changes..."
git commit -m "$commit_msg"

echo "✅ Auto-commit completed successfully!"
echo "📦 Commit message: $commit_msg"