#!/bin/bash

# Performance and Optimization Audit Script
# This script analyzes the project for performance issues and optimization opportunities

echo "🔍 Starting comprehensive performance audit..."
echo "================================================"

# Check if required tools are installed
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        return 1
    fi
    echo "✅ $1 is available"
}

# Check bundle size
analyze_bundle_size() {
    echo "📦 Analyzing bundle size..."
    
    if [ -d "dist" ]; then
        echo "Build directory found. Analyzing..."
        
        # Get total size
        total_size=$(du -sh dist/ | cut -f1)
        echo "Total build size: $total_size"
        
        # List largest files
        echo "Largest files:"
        find dist -type f -name "*.js" -o -name "*.css" -o -name "*.html" | xargs ls -lh | sort -k5 -hr | head -10
        
        # Check for common optimization opportunities
        echo "🔍 Checking for optimization opportunities..."
        
        # Check for unminified files
        unminified_js=$(find dist -name "*.js" -not -name "*.min.js" | wc -l)
        unminified_css=$(find dist -name "*.css" -not -name "*.min.css" | wc -l)
        
        if [ $unminified_js -gt 0 ]; then
            echo "⚠️  Found $unminified_js unminified JavaScript files"
        fi
        
        if [ $unminified_css -gt 0 ]; then
            echo "⚠️  Found $unminified_css unminified CSS files"
        fi
        
        # Check for source maps in production
        sourcemaps=$(find dist -name "*.map" | wc -l)
        if [ $sourcemaps -gt 0 ]; then
            echo "⚠️  Found $sourcemaps source map files in production build"
        fi
        
    else
        echo "❌ Build directory not found. Please run 'npm run build' first."
    fi
}

# Check image optimization
analyze_images() {
    echo "🖼️  Analyzing images..."
    
    # Find all images
    images=$(find public -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.svg" 2>/dev/null)
    
    if [ -z "$images" ]; then
        echo "No images found in public directory"
        return
    fi
    
    echo "Found images:"
    echo "$images" | while read image; do
        size=$(du -h "$image" | cut -f1)
        echo "  - $image ($size)"
    done
    
    # Check for WebP/AVIF versions
    echo "🔍 Checking for modern image formats..."
    webp_count=$(find public -name "*.webp" 2>/dev/null | wc -l)
    avif_count=$(find public -name "*.avif" 2>/dev/null | wc -l)
    
    echo "WebP images: $webp_count"
    echo "AVIF images: $avif_count"
    
    # Check for large images
    echo "🚨 Large images (>500KB):"
    find public -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" | while read image; do
        size=$(stat -c%s "$image" 2>/dev/null || stat -f%z "$image" 2>/dev/null || echo "0")
        if [ $size -gt 512000 ]; then
            size_mb=$(echo "scale=2; $size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")
            echo "  - $image (${size_mb}MB)"
        fi
    done
}

# Check CSS optimization
analyze_css() {
    echo "🎨 Analyzing CSS..."
    
    # Check global CSS size
    if [ -f "src/styles/global.css" ]; then
        css_size=$(du -h src/styles/global.css | cut -f1)
        css_lines=$(wc -l < src/styles/global.css)
        echo "Global CSS size: $css_size ($css_lines lines)"
        
        # Check for unused CSS patterns
        echo "🔍 Checking for potential unused CSS..."
        
        # Look for complex selectors
        complex_selectors=$(grep -c ">" src/styles/global.css || echo "0")
        echo "Complex selectors (>): $complex_selectors"
        
        # Look for !important usage
        important_rules=$(grep -c "!important" src/styles/global.css || echo "0")
        echo "!important rules: $important_rules"
        
        # Look for duplicate properties
        echo "🔍 Checking for duplicate CSS rules..."
        duplicates=$(grep -E "^\s*[a-zA-Z-]+\s*:" src/styles/global.css | sort | uniq -d | wc -l)
        echo "Potential duplicate rules: $duplicates"
    fi
}

# Check JavaScript optimization
analyze_js() {
    echo "📜 Analyzing JavaScript..."
    
    # Count component files
    components=$(find src/components -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | wc -l)
    echo "Component files: $components"
    
    # Check for large files
    echo "🔍 Large JavaScript/TypeScript files (>1000 lines):"
    find src -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" | while read file; do
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        if [ $lines -gt 1000 ]; then
            echo "  - $file ($lines lines)"
        fi
    done
    
    # Check for console.log statements
    console_logs=$(grep -r "console\." src/ --include="*.tsx" --include="*.ts" --include="*.js" --include="*.jsx" | wc -l)
    echo "Console statements: $console_logs"
    
    # Check for TODO/FIXME comments
    todos=$(grep -r "TODO\|FIXME" src/ --include="*.tsx" --include="*.ts" --include="*.js" --include="*.jsx" | wc -l)
    echo "TODO/FIXME comments: $todos"
}

# Check accessibility
analyze_accessibility() {
    echo "♿ Analyzing accessibility..."
    
    # Check for alt attributes in images
    echo "🔍 Checking image alt attributes..."
    images_without_alt=$(grep -r "<img" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | grep -v "alt=" | wc -l)
    echo "Images without alt text: $images_without_alt"
    
    # Check for ARIA labels
    aria_labels=$(grep -r "aria-label\|aria-labelledby\|aria-describedby" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | wc -l)
    echo "ARIA labels found: $aria_labels"
    
    # Check for semantic HTML
    semantic_html=$(grep -r "<main\|<header\|<nav\|<section\|<article\|<aside\|<footer" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | wc -l)
    echo "Semantic HTML elements: $semantic_html"
    
    # Check for heading hierarchy
    echo "🔍 Checking heading hierarchy..."
    h1_count=$(grep -r "<h1" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | wc -l)
    h2_count=$(grep -r "<h2" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | wc -l)
    h3_count=$(grep -r "<h3" src/ --include="*.tsx" --include="*.ts" --include="*.astro" | wc -l)
    
    echo "H1 tags: $h1_count, H2 tags: $h2_count, H3 tags: $h3_count"
}

# Check SEO optimization
analyze_seo() {
    echo "🔍 Analyzing SEO optimization..."
    
    # Check for meta descriptions
    meta_descriptions=$(grep -r "meta.*description" src/ --include="*.astro" --include="*.html" | wc -l)
    echo "Meta descriptions: $meta_descriptions"
    
    # Check for Open Graph tags
    og_tags=$(grep -r "og:" src/ --include="*.astro" --include="*.html" | wc -l)
    echo "Open Graph tags: $og_tags"
    
    # Check for structured data
    structured_data=$(grep -r "application/ld\+json" src/ --include="*.astro" --include="*.html" | wc -l)
    echo "Structured data: $structured_data"
    
    # Check for canonical URLs
    canonical_urls=$(grep -r "canonical" src/ --include="*.astro" --include="*.html" | wc -l)
    echo "Canonical URLs: $canonical_urls"
}

# Generate performance report
generate_report() {
    echo "📊 Generating performance report..."
    
    report_file="performance-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# Performance Audit Report
Generated on: $(date)

## Summary
This report contains findings from the automated performance audit.

## Recommendations

### High Priority
- [ ] Enable gzip/brotli compression
- [ ] Implement image optimization (WebP/AVIF)
- [ ] Remove unused CSS
- [ ] Minify JavaScript and CSS
- [ ] Add lazy loading for images

### Medium Priority
- [ ] Implement service worker for caching
- [ ] Optimize font loading
- [ ] Add preload hints for critical resources
- [ ] Implement code splitting
- [ ] Add error boundaries

### Low Priority
- [ ] Remove console.log statements
- [ ] Add more semantic HTML
- [ ] Improve ARIA labels
- [ ] Add more structured data
- [ ] Optimize bundle size

## Technical Debt
- Remove TODO/FIXME comments
- Refactor large components (>1000 lines)
- Standardize component structure
- Add comprehensive error handling

## Performance Metrics to Track
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to Interactive (TTI)

## Next Steps
1. Run Lighthouse audit
2. Implement critical optimizations
3. Set up performance monitoring
4. Create performance budget
5. Automate optimization checks

EOF

    echo "📝 Report generated: $report_file"
}

# Main execution
main() {
    analyze_bundle_size
    echo ""
    analyze_images
    echo ""
    analyze_css
    echo ""
    analyze_js
    echo ""
    analyze_accessibility
    echo ""
    analyze_seo
    echo ""
    generate_report
    
    echo ""
    echo "🎉 Audit complete! Check the generated report for detailed findings."
    echo "💡 Next steps:"
    echo "   1. Run 'npm run build' to generate production build"
    echo "   2. Run Lighthouse audit on built site"
    echo "   3. Implement high-priority optimizations"
    echo "   4. Set up performance monitoring"
}

# Run the audit
main
