import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary configuration
const CLOUD_NAME = 'donwqvg6t';
const UPLOAD_PRESET = 'Amirdha Sample';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Sample images directory
const SAMPLES_DIR = path.join(__dirname, 'src', 'assets', 'samples');

// Function to upload a single image
async function uploadImage(filePath, fileName) {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'portfolio/samples');
    formData.append('public_id', fileName.replace(/\.[^/.]+$/, '')); // Remove extension

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      fileName,
      url: data.secure_url,
      success: true
    };
  } catch (error) {
    console.error(`Failed to upload ${fileName}:`, error.message);
    return {
      fileName,
      error: error.message,
      success: false
    };
  }
}

// Main function to upload all samples
async function uploadAllSamples() {
  console.log('Starting bulk upload to Cloudinary...\n');

  try {
    // Read all files from samples directory
    const files = fs.readdirSync(SAMPLES_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to upload\n`);

    const results = [];
    
    // Upload images one by one (to avoid rate limiting)
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = path.join(SAMPLES_DIR, file);
      
      console.log(`[${i + 1}/${imageFiles.length}] Uploading ${file}...`);
      
      const result = await uploadImage(filePath, file);
      results.push(result);
      
      if (result.success) {
        console.log(`✓ Success: ${result.url}\n`);
      } else {
        console.log(`✗ Failed: ${result.error}\n`);
      }
      
      // Add a small delay to avoid rate limiting
      if (i < imageFiles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Generate summary
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log('\n' + '='.repeat(50));
    console.log('UPLOAD SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total: ${results.length}`);
    console.log(`Successful: ${successful.length}`);
    console.log(`Failed: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log('\n' + '='.repeat(50));
      console.log('CLOUDINARY URLs (Copy these):');
      console.log('='.repeat(50) + '\n');
      
      successful.forEach((result, index) => {
        console.log(`// ${result.fileName}`);
        console.log(`const sample${index + 1}Url = "${result.url}";\n`);
      });
    }

    // Save results to a JSON file
    const outputPath = path.join(__dirname, 'cloudinary-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nResults saved to: ${outputPath}`);

  } catch (error) {
    console.error('Error during bulk upload:', error);
    process.exit(1);
  }
}

// Run the upload
uploadAllSamples();
