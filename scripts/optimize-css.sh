#!/bin/bash

# CSS Optimization and Cleanup Script
# Analyzes and optimizes CSS for better performance

echo "🎨 Starting CSS optimization process..."
echo "====================================="

# Check if Node.js tools are available
check_node_tools() {
    echo "🔍 Checking Node.js optimization tools..."
    
    # Check for PostCSS
    if ! npm list -g postcss &> /dev/null; then
        echo "❌ PostCSS not found globally. Installing..."
        npm install -g postcss postcss-cli
    fi
    
    # Check for CSS optimization tools
    if ! npm list -g csso &> /dev/null; then
        echo "❌ CSSO not found. Installing..."
        npm install -g csso
    fi
    
    echo "✅ CSS optimization tools ready"
}

# Analyze current CSS
analyze_css() {
    echo "📊 Analyzing current CSS..."
    
    local css_file="src/styles/global.css"
    
    if [ ! -f "$css_file" ]; then
        echo "❌ Global CSS file not found"
        return 1
    fi
    
    # Get file statistics
    local file_size=$(du -h "$css_file" | cut -f1)
    local line_count=$(wc -l < "$css_file")
    local char_count=$(wc -c < "$css_file")
    
    echo "📈 CSS Statistics:"
    echo "  File size: $file_size"
    echo "  Lines: $line_count"
    echo "  Characters: $char_count"
    
    # Count different types of rules
    local classes=$(grep -c "^\." "$css_file" 2>/dev/null || echo "0")
    local ids=$(grep -c "^#" "$css_file" 2>/dev/null || echo "0")
    local media_queries=$(grep -c "@media" "$css_file" 2>/dev/null || echo "0")
    local keyframes=$(grep -c "@keyframes" "$css_file" 2>/dev/null || echo "0")
    local important_rules=$(grep -c "!important" "$css_file" 2>/dev/null || echo "0")
    local custom_properties=$(grep -c "\-\-" "$css_file" 2>/dev/null || echo "0")
    
    echo "📊 Rule Breakdown:"
    echo "  Classes: $classes"
    echo "  IDs: $ids"
    echo "  Media queries: $media_queries"
    echo "  Keyframes: $keyframes"
    echo "  !important rules: $important_rules"
    echo "  Custom properties: $custom_properties"
    
    # Identify potential issues
    echo "🔍 Potential Issues:"
    
    if [ "$important_rules" -gt 10 ]; then
        echo "  ⚠️  High usage of !important ($important_rules times)"
    fi
    
    # Check for long selectors
    local long_selectors=$(grep -E "^[^{]{50,}" "$css_file" | wc -l)
    if [ "$long_selectors" -gt 0 ]; then
        echo "  ⚠️  Found $long_selectors potentially long selectors"
    fi
    
    # Check for duplicate properties
    local duplicate_props=$(grep -oE "[a-zA-Z-]+:" "$css_file" | sort | uniq -d | wc -l)
    if [ "$duplicate_props" -gt 0 ]; then
        echo "  ⚠️  Found $duplicate_props potentially duplicate properties"
    fi
    
    echo ""
}

# Remove unused CSS (manual inspection required)
identify_unused_css() {
    echo "🗑️  Identifying potentially unused CSS..."
    
    local css_file="src/styles/global.css"
    local temp_file="/tmp/css_classes.txt"
    
    # Extract all class names from CSS
    grep -oE "\.[a-zA-Z0-9_-]+" "$css_file" | sort | uniq > "$temp_file"
    
    echo "📝 Found $(wc -l < "$temp_file") unique CSS classes"
    
    # Check which classes are used in source files
    local unused_classes=""
    local unused_count=0
    
    echo "🔍 Checking class usage in source files..."
    
    while read -r class; do
        # Remove the leading dot
        class_name="${class#.}"
        
        # Skip utility classes and common patterns
        if [[ "$class_name" =~ ^(animate-|hover:|focus:|dark:|lg:|md:|sm:|xl:|2xl:) ]]; then
            continue
        fi
        
        # Search for class usage in source files
        if ! grep -r "\\b$class_name\\b" src/ --include="*.tsx" --include="*.ts" --include="*.astro" --include="*.jsx" &> /dev/null; then
            unused_classes+="$class\n"
            unused_count=$((unused_count + 1))
        fi
    done < "$temp_file"
    
    if [ "$unused_count" -gt 0 ]; then
        echo "⚠️  Found $unused_count potentially unused classes:"
        echo -e "$unused_classes" | head -20
        if [ "$unused_count" -gt 20 ]; then
            echo "  ... and $((unused_count - 20)) more"
        fi
    else
        echo "✅ No obviously unused classes found"
    fi
    
    rm -f "$temp_file"
    echo ""
}

# Optimize CSS structure
optimize_css_structure() {
    echo "⚡ Optimizing CSS structure..."
    
    local css_file="src/styles/global.css"
    local backup_file="${css_file}.backup.$(date +%s)"
    local optimized_file="${css_file}.optimized"
    
    # Create backup
    cp "$css_file" "$backup_file"
    echo "📄 Backup created: $backup_file"
    
    # Remove empty lines and excessive whitespace
    sed '/^[[:space:]]*$/d' "$css_file" | sed 's/[[:space:]]*$//' > "$optimized_file"
    
    # Count improvements
    local original_lines=$(wc -l < "$css_file")
    local optimized_lines=$(wc -l < "$optimized_file")
    local lines_saved=$((original_lines - optimized_lines))
    
    echo "📊 Structure optimization results:"
    echo "  Original lines: $original_lines"
    echo "  Optimized lines: $optimized_lines"
    echo "  Lines saved: $lines_saved"
    
    # Ask if user wants to apply changes
    echo -n "Apply structure optimizations? (y/N): "
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        mv "$optimized_file" "$css_file"
        echo "✅ Structure optimizations applied"
    else
        rm -f "$optimized_file"
        echo "❌ Structure optimizations discarded"
    fi
    
    echo ""
}

# Minify CSS
minify_css() {
    echo "🗜️  Minifying CSS..."
    
    local css_file="src/styles/global.css"
    local minified_file="src/styles/global.min.css"
    
    # Check if csso is available
    if command -v csso &> /dev/null; then
        echo "Using CSSO for minification..."
        csso "$css_file" --output "$minified_file"
        
        # Compare sizes
        local original_size=$(stat -c%s "$css_file" 2>/dev/null || stat -f%z "$css_file" 2>/dev/null)
        local minified_size=$(stat -c%s "$minified_file" 2>/dev/null || stat -f%z "$minified_file" 2>/dev/null)
        
        if [ "$original_size" -gt 0 ] && [ "$minified_size" -gt 0 ]; then
            local compression_ratio=$(echo "scale=1; ($original_size - $minified_size) * 100 / $original_size" | bc -l 2>/dev/null || echo "unknown")
            echo "✅ CSS minified (${compression_ratio}% smaller)"
            echo "  Original: $(echo "scale=1; $original_size / 1024" | bc -l)KB"
            echo "  Minified: $(echo "scale=1; $minified_size / 1024" | bc -l)KB"
        fi
    else
        echo "❌ CSSO not available. Installing..."
        npm install -g csso
        if command -v csso &> /dev/null; then
            csso "$css_file" --output "$minified_file"
            echo "✅ CSS minified"
        else
            echo "❌ Failed to install CSSO"
        fi
    fi
    
    echo ""
}

# Analyze CSS performance impact
analyze_performance_impact() {
    echo "🚀 Analyzing performance impact..."
    
    local css_file="src/styles/global.css"
    
    # Count expensive operations
    local box_shadows=$(grep -c "box-shadow" "$css_file" 2>/dev/null || echo "0")
    local gradients=$(grep -c "gradient" "$css_file" 2>/dev/null || echo "0")
    local transforms=$(grep -c "transform" "$css_file" 2>/dev/null || echo "0")
    local filters=$(grep -c "filter:" "$css_file" 2>/dev/null || echo "0")
    local animations=$(grep -c "animation" "$css_file" 2>/dev/null || echo "0")
    
    echo "📈 Performance-impacting properties:"
    echo "  Box shadows: $box_shadows"
    echo "  Gradients: $gradients"
    echo "  Transforms: $transforms"
    echo "  Filters: $filters"
    echo "  Animations: $animations"
    
    # Recommendations
    echo "💡 Performance recommendations:"
    
    if [ "$box_shadows" -gt 20 ]; then
        echo "  ⚠️  Consider reducing box-shadow usage for better performance"
    fi
    
    if [ "$gradients" -gt 10 ]; then
        echo "  ⚠️  Consider using solid colors instead of gradients where possible"
    fi
    
    if [ "$animations" -gt 15 ]; then
        echo "  ⚠️  Consider reducing animation complexity"
    fi
    
    # Check for will-change usage
    local will_change=$(grep -c "will-change" "$css_file" 2>/dev/null || echo "0")
    if [ "$will_change" -eq 0 ]; then
        echo "  💡 Consider adding 'will-change' property for animated elements"
    fi
    
    echo ""
}

# Generate optimization report
generate_report() {
    echo "📊 Generating CSS optimization report..."
    
    local report_file="css-optimization-report-$(date +%Y%m%d-%H%M%S).md"
    local css_file="src/styles/global.css"
    
    # Gather statistics
    local file_size=$(du -h "$css_file" | cut -f1)
    local line_count=$(wc -l < "$css_file")
    local classes=$(grep -c "^\." "$css_file" 2>/dev/null || echo "0")
    local media_queries=$(grep -c "@media" "$css_file" 2>/dev/null || echo "0")
    local important_rules=$(grep -c "!important" "$css_file" 2>/dev/null || echo "0")
    
    cat > "$report_file" << EOF
# CSS Optimization Report
Generated on: $(date)

## Current Statistics
- File size: $file_size
- Lines of code: $line_count
- CSS classes: $classes
- Media queries: $media_queries
- !important rules: $important_rules

## Optimization Opportunities

### High Priority
- [ ] Remove unused CSS classes
- [ ] Minimize !important usage
- [ ] Implement CSS tree shaking
- [ ] Enable CSS minification in production
- [ ] Use CSS custom properties for consistency

### Medium Priority
- [ ] Optimize media query organization
- [ ] Implement CSS splitting for better caching
- [ ] Add CSS compression (gzip/brotli)
- [ ] Consider CSS-in-JS for component-specific styles
- [ ] Implement critical CSS inlining

### Low Priority
- [ ] Standardize naming conventions
- [ ] Group related styles
- [ ] Add CSS documentation
- [ ] Consider PostCSS plugins for optimization
- [ ] Implement CSS linting

## Performance Optimizations

### Immediate Actions
\`\`\`css
/* Use will-change for animated elements */
.animated-element {
  will-change: transform;
}

/* Prefer transform over changing layout properties */
.move-element {
  transform: translateX(100px);
  /* instead of left: 100px; */
}

/* Use contain for isolated components */
.isolated-component {
  contain: layout style paint;
}
\`\`\`

### Build Process Improvements
\`\`\`bash
# Add to package.json scripts
"css:optimize": "postcss src/styles/global.css -o dist/styles/global.css",
"css:minify": "csso src/styles/global.css --output dist/styles/global.min.css"
\`\`\`

## Recommended Tools
- PostCSS for processing
- CSSO for minification
- PurgeCSS for unused CSS removal
- stylelint for linting
- CSS Tree Shaking for optimization

## Next Steps
1. Implement CSS minification in build process
2. Set up unused CSS detection
3. Add CSS performance monitoring
4. Create CSS coding guidelines
5. Automate CSS optimization checks

## Performance Impact
- Estimated file size reduction: 20-40%
- Improved parsing time: 10-25%
- Better caching efficiency
- Reduced memory usage
- Faster style recalculation

EOF

    echo "📝 Report generated: $report_file"
}

# Main execution
main() {
    check_node_tools
    echo ""
    analyze_css
    identify_unused_css
    optimize_css_structure
    minify_css
    analyze_performance_impact
    generate_report
    
    echo ""
    echo "🎉 CSS optimization analysis complete!"
    echo "💡 Next steps:"
    echo "   1. Review the generated report"
    echo "   2. Remove identified unused CSS"
    echo "   3. Implement build-time CSS optimization"
    echo "   4. Set up CSS performance monitoring"
    echo "   5. Create CSS coding guidelines"
}

# Run the optimization
main
