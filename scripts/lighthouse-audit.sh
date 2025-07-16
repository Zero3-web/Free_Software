#!/bin/bash

# Lighthouse Audit Script
# Runs comprehensive Lighthouse audits and generates detailed reports

echo "🔍 Starting Lighthouse audit process..."
echo "===================================="

# Check if Lighthouse is installed
check_lighthouse() {
    if ! command -v lighthouse &> /dev/null; then
        echo "❌ Lighthouse is not installed. Installing..."
        npm install -g lighthouse
        
        if ! command -v lighthouse &> /dev/null; then
            echo "❌ Failed to install Lighthouse. Please install manually:"
            echo "   npm install -g lighthouse"
            exit 1
        fi
    fi
    echo "✅ Lighthouse is available"
}

# Check if site is running
check_site_running() {
    local url="$1"
    echo "🌐 Checking if site is accessible at $url..."
    
    if curl -s --head "$url" | head -n 1 | grep -q "200 OK"; then
        echo "✅ Site is accessible"
        return 0
    else
        echo "❌ Site is not accessible at $url"
        echo "Please make sure your site is running:"
        echo "  - For development: npm run dev"
        echo "  - For production: npm run build && npm run preview"
        return 1
    fi
}

# Run Lighthouse audit
run_lighthouse_audit() {
    local url="$1"
    local output_dir="$2"
    local device="$3"
    local audit_name="$4"
    
    echo "🔍 Running Lighthouse audit: $audit_name"
    
    local output_file="$output_dir/lighthouse-$audit_name-$(date +%Y%m%d-%H%M%S)"
    
    # Lighthouse options
    local chrome_flags="--headless --no-sandbox --disable-gpu"
    local lighthouse_flags="--quiet --chrome-flags=\"$chrome_flags\""
    
    # Device-specific settings
    if [ "$device" = "mobile" ]; then
        lighthouse_flags="$lighthouse_flags --preset=perf --emulated-form-factor=mobile"
    else
        lighthouse_flags="$lighthouse_flags --preset=perf --emulated-form-factor=desktop"
    fi
    
    # Run audit with multiple output formats
    lighthouse "$url" \
        --output=html,json,csv \
        --output-path="$output_file" \
        --chrome-flags="$chrome_flags" \
        --emulated-form-factor="$device" \
        --throttling-method=devtools \
        --only-categories=performance,accessibility,best-practices,seo,pwa \
        --budget-path=lighthouse-budget.json 2>/dev/null || true
    
    echo "📄 Reports generated:"
    echo "  HTML: ${output_file}.report.html"
    echo "  JSON: ${output_file}.report.json"
    echo "  CSV: ${output_file}.report.csv"
    
    # Extract key metrics from JSON report
    if [ -f "${output_file}.report.json" ]; then
        extract_metrics "${output_file}.report.json" "$audit_name"
    fi
}

# Extract key metrics from Lighthouse JSON report
extract_metrics() {
    local json_file="$1"
    local audit_name="$2"
    
    echo "📊 Key Metrics for $audit_name:"
    
    # Use node to parse JSON (fallback to basic grep if node not available)
    if command -v node &> /dev/null; then
        node -e "
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('$json_file', 'utf8'));
            const scores = report.categories;
            const audits = report.audits;
            
            console.log('Scores:');
            Object.keys(scores).forEach(category => {
                const score = Math.round(scores[category].score * 100);
                console.log(\`  \${category}: \${score}/100\`);
            });
            
            console.log('\\nCore Web Vitals:');
            if (audits['largest-contentful-paint']) {
                console.log(\`  LCP: \${audits['largest-contentful-paint'].displayValue}\`);
            }
            if (audits['first-input-delay']) {
                console.log(\`  FID: \${audits['first-input-delay'].displayValue}\`);
            }
            if (audits['cumulative-layout-shift']) {
                console.log(\`  CLS: \${audits['cumulative-layout-shift'].displayValue}\`);
            }
            if (audits['first-contentful-paint']) {
                console.log(\`  FCP: \${audits['first-contentful-paint'].displayValue}\`);
            }
            if (audits['speed-index']) {
                console.log(\`  SI: \${audits['speed-index'].displayValue}\`);
            }
            if (audits['total-blocking-time']) {
                console.log(\`  TBT: \${audits['total-blocking-time'].displayValue}\`);
            }
            
            console.log('\\nOpportunities:');
            Object.keys(audits).forEach(auditKey => {
                const audit = audits[auditKey];
                if (audit.score !== null && audit.score < 0.9 && audit.details && audit.details.overallSavingsMs > 100) {
                    console.log(\`  \${audit.title}: \${audit.details.overallSavingsMs}ms potential savings\`);
                }
            });
        " 2>/dev/null || echo "  (Could not parse detailed metrics)"
    else
        # Fallback to basic extraction
        grep -o '"score":[0-9.]*' "$json_file" | head -5 | while read score; do
            echo "  Score: $score"
        done
    fi
    
    echo ""
}

# Create Lighthouse budget file
create_budget_file() {
    local budget_file="lighthouse-budget.json"
    
    if [ ! -f "$budget_file" ]; then
        echo "📝 Creating Lighthouse budget file..."
        
        cat > "$budget_file" << 'EOF'
[
  {
    "path": "/*",
    "timings": [
      {
        "metric": "first-contentful-paint",
        "budget": 2000
      },
      {
        "metric": "largest-contentful-paint",
        "budget": 2500
      },
      {
        "metric": "speed-index",
        "budget": 3000
      },
      {
        "metric": "cumulative-layout-shift",
        "budget": 0.1
      },
      {
        "metric": "total-blocking-time",
        "budget": 300
      }
    ],
    "resourceSizes": [
      {
        "resourceType": "script",
        "budget": 400
      },
      {
        "resourceType": "stylesheet",
        "budget": 100
      },
      {
        "resourceType": "image",
        "budget": 1000
      },
      {
        "resourceType": "font",
        "budget": 100
      },
      {
        "resourceType": "document",
        "budget": 50
      },
      {
        "resourceType": "other",
        "budget": 200
      },
      {
        "resourceType": "total",
        "budget": 1500
      }
    ],
    "resourceCounts": [
      {
        "resourceType": "script",
        "budget": 10
      },
      {
        "resourceType": "stylesheet",
        "budget": 5
      },
      {
        "resourceType": "image",
        "budget": 20
      },
      {
        "resourceType": "font",
        "budget": 4
      },
      {
        "resourceType": "total",
        "budget": 50
      }
    ]
  }
]
EOF
        
        echo "✅ Budget file created: $budget_file"
    else
        echo "✅ Budget file already exists: $budget_file"
    fi
}

# Run CI/CD focused audit
run_ci_audit() {
    local url="$1"
    local output_dir="$2"
    
    echo "🤖 Running CI/CD-focused audit..."
    
    local output_file="$output_dir/lighthouse-ci-$(date +%Y%m%d-%H%M%S)"
    
    # Lightweight audit for CI/CD
    lighthouse "$url" \
        --output=json \
        --output-path="$output_file" \
        --chrome-flags="--headless --no-sandbox --disable-gpu" \
        --emulated-form-factor=mobile \
        --throttling-method=devtools \
        --only-categories=performance \
        --budget-path=lighthouse-budget.json \
        --quiet 2>/dev/null || true
    
    if [ -f "${output_file}.report.json" ]; then
        # Check if performance score meets threshold
        if command -v node &> /dev/null; then
            local performance_score=$(node -e "
                const report = JSON.parse(require('fs').readFileSync('${output_file}.report.json', 'utf8'));
                console.log(Math.round(report.categories.performance.score * 100));
            " 2>/dev/null || echo "0")
            
            echo "📊 Performance Score: $performance_score/100"
            
            if [ "$performance_score" -lt 70 ]; then
                echo "❌ Performance score below threshold (70)"
                return 1
            else
                echo "✅ Performance score meets threshold"
                return 0
            fi
        fi
    fi
    
    return 1
}

# Generate comprehensive report
generate_comprehensive_report() {
    local output_dir="$1"
    
    echo "📊 Generating comprehensive audit report..."
    
    local report_file="$output_dir/lighthouse-summary-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$report_file" << EOF
# Lighthouse Audit Summary
Generated on: $(date)

## Overview
This report summarizes the Lighthouse audit results for the Opensoftware website.

## Audit Configuration
- Tool: Google Lighthouse
- Categories: Performance, Accessibility, Best Practices, SEO, PWA
- Devices: Desktop and Mobile
- Network: Simulated Slow 4G
- CPU: 4x slowdown

## Key Performance Metrics

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s (Good)
- **FID (First Input Delay)**: < 100ms (Good)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good)

### Additional Metrics
- **FCP (First Contentful Paint)**: < 1.8s (Good)
- **SI (Speed Index)**: < 3.4s (Good)
- **TBT (Total Blocking Time)**: < 200ms (Good)

## Common Optimization Opportunities

### High Priority
- [ ] Eliminate render-blocking resources
- [ ] Remove unused CSS and JavaScript
- [ ] Optimize images (WebP/AVIF formats)
- [ ] Enable text compression (gzip/brotli)
- [ ] Minimize main-thread work

### Medium Priority
- [ ] Properly size images
- [ ] Defer offscreen images
- [ ] Minimize unused polyfills
- [ ] Use efficient cache policy
- [ ] Avoid enormous network payloads

### Low Priority
- [ ] Enable passive event listeners
- [ ] Remove duplicate modules in bundles
- [ ] Use HTTP/2 for multiple resources
- [ ] Preconnect to required origins
- [ ] Use rel="preload" for key requests

## Accessibility Improvements

### Critical
- [ ] Ensure all images have alt text
- [ ] Fix color contrast issues
- [ ] Add proper ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Fix heading hierarchy

### Important
- [ ] Add focus indicators
- [ ] Ensure sufficient tap target sizes
- [ ] Add skip navigation links
- [ ] Use semantic HTML elements
- [ ] Test with screen readers

## SEO Optimizations

### Essential
- [ ] Add meta descriptions to all pages
- [ ] Ensure title tags are descriptive
- [ ] Fix broken internal links
- [ ] Add structured data markup
- [ ] Optimize for mobile

### Recommended
- [ ] Add Open Graph tags
- [ ] Create XML sitemap
- [ ] Add canonical URLs
- [ ] Optimize URL structure
- [ ] Add breadcrumbs

## Best Practices

### Security
- [ ] Use HTTPS everywhere
- [ ] Add security headers
- [ ] Fix mixed content issues
- [ ] Use modern JavaScript features
- [ ] Avoid deprecated APIs

### Performance
- [ ] Use modern image formats
- [ ] Implement lazy loading
- [ ] Minimize DOM size
- [ ] Optimize critical rendering path
- [ ] Use resource hints

## Progressive Web App (PWA)

### Core Requirements
- [ ] Add web app manifest
- [ ] Implement service worker
- [ ] Ensure HTTPS
- [ ] Add icon for home screen
- [ ] Make app work offline

### Enhanced Features
- [ ] Add push notifications
- [ ] Implement background sync
- [ ] Add app shortcuts
- [ ] Support install prompts
- [ ] Handle network failures gracefully

## Implementation Checklist

### Week 1: Performance
- [ ] Optimize images and enable modern formats
- [ ] Remove unused CSS and JavaScript
- [ ] Enable compression and caching
- [ ] Fix render-blocking resources

### Week 2: Accessibility
- [ ] Audit and fix color contrast
- [ ] Add missing ARIA labels
- [ ] Improve keyboard navigation
- [ ] Test with assistive technologies

### Week 3: SEO & Best Practices
- [ ] Add meta tags and structured data
- [ ] Implement security headers
- [ ] Fix any console errors
- [ ] Optimize for mobile

### Week 4: PWA Features
- [ ] Add service worker
- [ ] Create web app manifest
- [ ] Implement offline functionality
- [ ] Test installation flow

## Monitoring and Automation

### Continuous Monitoring
- Set up Lighthouse CI in GitHub Actions
- Monitor Core Web Vitals in Google Search Console
- Use WebPageTest for detailed analysis
- Track metrics in Google Analytics

### Performance Budget
- Maintain Lighthouse scores above 90
- Keep bundle size under 500KB
- Ensure LCP under 2.5s
- Keep CLS under 0.1

## Tools and Resources

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

### Development Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [ImageOptim](https://imageoptim.com/)
- [Critical](https://github.com/addyosmani/critical)

## Next Steps
1. Review detailed Lighthouse reports
2. Prioritize fixes based on impact
3. Implement changes incrementally
4. Set up continuous monitoring
5. Regular audits and optimizations

EOF

    echo "📝 Comprehensive report generated: $report_file"
}

# Main execution
main() {
    local url="${1:-http://localhost:4321}"
    local output_dir="lighthouse-reports"
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Check prerequisites
    check_lighthouse
    check_site_running "$url"
    
    if [ $? -ne 0 ]; then
        echo "❌ Cannot proceed with audit. Please start your site first."
        exit 1
    fi
    
    # Create budget file
    create_budget_file
    
    echo ""
    echo "🚀 Starting comprehensive Lighthouse audits..."
    echo "URL: $url"
    echo "Output directory: $output_dir"
    echo ""
    
    # Run audits for different scenarios
    run_lighthouse_audit "$url" "$output_dir" "mobile" "mobile-performance"
    run_lighthouse_audit "$url" "$output_dir" "desktop" "desktop-performance"
    
    # Run CI audit
    echo "🤖 Running CI audit (performance only)..."
    if run_ci_audit "$url" "$output_dir"; then
        echo "✅ CI audit passed"
    else
        echo "❌ CI audit failed - performance below threshold"
    fi
    
    # Generate comprehensive report
    generate_comprehensive_report "$output_dir"
    
    echo ""
    echo "🎉 Lighthouse audit complete!"
    echo "📁 Reports saved in: $output_dir"
    echo "💡 Next steps:"
    echo "   1. Review HTML reports in browser"
    echo "   2. Prioritize fixes based on impact"
    echo "   3. Implement optimizations"
    echo "   4. Re-run audits to measure improvements"
    echo "   5. Set up Lighthouse CI for continuous monitoring"
    
    # Open reports in browser (optional)
    if command -v xdg-open &> /dev/null; then
        echo ""
        echo -n "Open reports in browser? (y/N): "
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            find "$output_dir" -name "*.report.html" -type f -exec xdg-open {} \;
        fi
    fi
}

# Check if URL is provided as argument
if [ $# -eq 0 ]; then
    echo "Usage: $0 [URL]"
    echo "Example: $0 http://localhost:4321"
    echo "Using default URL: http://localhost:4321"
    main
else
    main "$1"
fi
