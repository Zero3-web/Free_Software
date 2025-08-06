#!/bin/bash

# Image Optimization Script
# Converts images to WebP and AVIF formats for better performance

echo "🖼️  Starting image optimization process..."
echo "=========================================="

# Check if required tools are installed
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        echo "   For Ubuntu/Debian: sudo apt install $1"
        echo "   For macOS: brew install $1"
        return 1
    fi
    echo "✅ $1 is available"
}

# Install required tools check
check_requirements() {
    echo "🔍 Checking required tools..."
    
    # Check for cwebp (WebP encoder)
    if ! command -v cwebp &> /dev/null; then
        echo "❌ cwebp is not installed."
        echo "   For Ubuntu/Debian: sudo apt install webp"
        echo "   For macOS: brew install webp"
        echo "   For Windows: Download from https://developers.google.com/speed/webp/download"
        return 1
    fi
    
    # Check for avifenc (AVIF encoder)
    if ! command -v avifenc &> /dev/null; then
        echo "⚠️  avifenc is not installed. AVIF conversion will be skipped."
        echo "   For Ubuntu/Debian: sudo apt install libavif-bin"
        echo "   For macOS: brew install libavif"
        AVIF_AVAILABLE=false
    else
        AVIF_AVAILABLE=true
    fi
    
    echo "✅ WebP encoder is available"
    [ "$AVIF_AVAILABLE" = true ] && echo "✅ AVIF encoder is available"
}

# Convert images to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    
    echo "  Converting to WebP: $(basename "$input_file")"
    
    # Use different quality settings based on image type
    if [[ "$input_file" =~ \.(jpg|jpeg)$ ]]; then
        # For JPEG images, use quality 85
        cwebp -q 85 "$input_file" -o "$output_file"
    elif [[ "$input_file" =~ \.png$ ]]; then
        # For PNG images, use lossless compression
        cwebp -lossless "$input_file" -o "$output_file"
    else
        # Default quality 80
        cwebp -q 80 "$input_file" -o "$output_file"
    fi
    
    # Check if conversion was successful
    if [ -f "$output_file" ]; then
        original_size=$(stat -c%s "$input_file" 2>/dev/null || stat -f%z "$input_file" 2>/dev/null)
        webp_size=$(stat -c%s "$output_file" 2>/dev/null || stat -f%z "$output_file" 2>/dev/null)
        
        if [ "$original_size" -gt 0 ] && [ "$webp_size" -gt 0 ]; then
            compression_ratio=$(echo "scale=1; ($original_size - $webp_size) * 100 / $original_size" | bc -l 2>/dev/null || echo "unknown")
            echo "    ✅ WebP created (${compression_ratio}% smaller)"
        else
            echo "    ✅ WebP created"
        fi
    else
        echo "    ❌ WebP conversion failed"
    fi
}

# Convert images to AVIF
convert_to_avif() {
    local input_file="$1"
    local output_file="${input_file%.*}.avif"
    
    if [ "$AVIF_AVAILABLE" = false ]; then
        return
    fi
    
    echo "  Converting to AVIF: $(basename "$input_file")"
    
    # Use different quality settings based on image type
    if [[ "$input_file" =~ \.(jpg|jpeg)$ ]]; then
        # For JPEG images, use quality 85
        avifenc -q 85 "$input_file" "$output_file"
    elif [[ "$input_file" =~ \.png$ ]]; then
        # For PNG images, use lossless compression
        avifenc -l "$input_file" "$output_file"
    else
        # Default quality 80
        avifenc -q 80 "$input_file" "$output_file"
    fi
    
    # Check if conversion was successful
    if [ -f "$output_file" ]; then
        original_size=$(stat -c%s "$input_file" 2>/dev/null || stat -f%z "$input_file" 2>/dev/null)
        avif_size=$(stat -c%s "$output_file" 2>/dev/null || stat -f%z "$output_file" 2>/dev/null)
        
        if [ "$original_size" -gt 0 ] && [ "$avif_size" -gt 0 ]; then
            compression_ratio=$(echo "scale=1; ($original_size - $avif_size) * 100 / $original_size" | bc -l 2>/dev/null || echo "unknown")
            echo "    ✅ AVIF created (${compression_ratio}% smaller)"
        else
            echo "    ✅ AVIF created"
        fi
    else
        echo "    ❌ AVIF conversion failed"
    fi
}

# Optimize PNG images
optimize_png() {
    local input_file="$1"
    
    # Check if optipng is available
    if command -v optipng &> /dev/null; then
        echo "  Optimizing PNG: $(basename "$input_file")"
        optipng -o2 "$input_file"
        echo "    ✅ PNG optimized"
    fi
}

# Optimize JPEG images
optimize_jpeg() {
    local input_file="$1"
    
    # Check if jpegoptim is available
    if command -v jpegoptim &> /dev/null; then
        echo "  Optimizing JPEG: $(basename "$input_file")"
        jpegoptim --max=85 --strip-all "$input_file"
        echo "    ✅ JPEG optimized"
    fi
}

# Process all images in a directory
process_directory() {
    local dir="$1"
    local processed_count=0
    
    echo "📁 Processing directory: $dir"
    
    # Find all image files
    find "$dir" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) | while read image; do
        echo "🔄 Processing: $(basename "$image")"
        
        # Skip if WebP/AVIF already exist and are newer
        webp_file="${image%.*}.webp"
        avif_file="${image%.*}.avif"
        
        should_convert=true
        
        if [ -f "$webp_file" ] && [ "$webp_file" -nt "$image" ]; then
            echo "  ⏭️  WebP already exists and is newer, skipping"
            should_convert=false
        fi
        
        if [ "$should_convert" = true ]; then
            # Optimize original image first
            if [[ "$image" =~ \.(jpg|jpeg)$ ]]; then
                optimize_jpeg "$image"
            elif [[ "$image" =~ \.png$ ]]; then
                optimize_png "$image"
            fi
            
            # Convert to modern formats
            convert_to_webp "$image"
            convert_to_avif "$image"
            
            processed_count=$((processed_count + 1))
        fi
        
        echo ""
    done
    
    echo "✅ Processed $processed_count images in $dir"
}

# Generate image optimization report
generate_report() {
    echo "📊 Generating image optimization report..."
    
    report_file="image-optimization-report-$(date +%Y%m%d-%H%M%S).md"
    
    # Calculate statistics
    total_images=$(find public -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" | wc -l)
    webp_images=$(find public -name "*.webp" | wc -l)
    avif_images=$(find public -name "*.avif" | wc -l)
    
    # Calculate total size
    original_size=$(find public \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) -exec stat -c%s {} + 2>/dev/null | awk '{sum += $1} END {print sum}' || echo "0")
    webp_size=$(find public -name "*.webp" -exec stat -c%s {} + 2>/dev/null | awk '{sum += $1} END {print sum}' || echo "0")
    avif_size=$(find public -name "*.avif" -exec stat -c%s {} + 2>/dev/null | awk '{sum += $1} END {print sum}' || echo "0")
    
    # Convert bytes to human readable
    original_size_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")
    webp_size_mb=$(echo "scale=2; $webp_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")
    avif_size_mb=$(echo "scale=2; $avif_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")
    
    cat > "$report_file" << EOF
# Image Optimization Report
Generated on: $(date)

## Summary
- Total original images: $total_images
- WebP images created: $webp_images
- AVIF images created: $avif_images

## Size Comparison
- Original images: ${original_size_mb}MB
- WebP images: ${webp_size_mb}MB
- AVIF images: ${avif_size_mb}MB

## Recommendations

### Immediate Actions
- [ ] Update image components to use modern formats
- [ ] Implement responsive images with srcset
- [ ] Add lazy loading for non-critical images
- [ ] Set up automatic image optimization in CI/CD

### Long-term Optimizations
- [ ] Implement image CDN
- [ ] Add image compression monitoring
- [ ] Set up progressive image loading
- [ ] Consider using next-gen formats as primary

## Implementation Code

### HTML Picture Element
\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

### React/Astro Component
\`\`\`tsx
<EnhancedImage
  src="/images/example.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
\`\`\`

## Performance Impact
- Estimated bandwidth savings: 20-50%
- Improved loading times: 15-30%
- Better user experience on mobile
- Reduced server costs

## Next Steps
1. Update all image references to use new formats
2. Test image loading across different browsers
3. Monitor Core Web Vitals improvements
4. Set up automated image optimization
5. Consider implementing image CDN

EOF

    echo "📝 Report generated: $report_file"
}

# Main execution
main() {
    check_requirements
    
    if [ $? -ne 0 ]; then
        echo "❌ Requirements not met. Please install required tools."
        exit 1
    fi
    
    echo ""
    echo "🚀 Starting image optimization..."
    
    # Process public directory
    if [ -d "public" ]; then
        process_directory "public"
    else
        echo "❌ Public directory not found"
    fi
    
    # Process src directory for any images
    if [ -d "src" ]; then
        if [ $(find src -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" | wc -l) -gt 0 ]; then
            process_directory "src"
        fi
    fi
    
    echo ""
    generate_report
    
    echo ""
    echo "🎉 Image optimization complete!"
    echo "💡 Next steps:"
    echo "   1. Update components to use EnhancedImage"
    echo "   2. Test image loading in different browsers"
    echo "   3. Monitor performance improvements"
    echo "   4. Set up automated optimization"
}

# Run the optimization
main
