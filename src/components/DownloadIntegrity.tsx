import { useState, useCallback } from 'react';
import { Check, X, Download, Shield, AlertTriangle, FileCheck } from 'lucide-react';

interface DownloadIntegrityProps {
  fileName: string;
  downloadUrl: string;
  expectedMD5?: string;
  expectedSHA256?: string;
  fileSize?: number;
}

export default function DownloadIntegrity({
  fileName,
  downloadUrl,
  expectedMD5,
  expectedSHA256,
  fileSize
}: DownloadIntegrityProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'downloading' | 'verifying' | 'success' | 'error'>('idle');
  const [verificationResults, setVerificationResults] = useState<{
    md5Match?: boolean;
    sha256Match?: boolean;
    sizeMatch?: boolean;
    actualMD5?: string;
    actualSHA256?: string;
    actualSize?: number;
  }>({});
  const [progress, setProgress] = useState(0);

  // Calculate MD5 hash
  const calculateMD5 = async (file: ArrayBuffer): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest('MD5', file);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Calculate SHA256 hash
  const calculateSHA256 = async (file: ArrayBuffer): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', file);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Download and verify file integrity
  const downloadAndVerify = useCallback(async () => {
    setIsVerifying(true);
    setVerificationStatus('downloading');
    setProgress(0);
    
    try {
      // Download file with progress tracking
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        received += value.length;
        
        if (total > 0) {
          setProgress((received / total) * 100);
        }
      }

      // Combine chunks into single array buffer
      const fileData = new Uint8Array(received);
      let position = 0;
      for (const chunk of chunks) {
        fileData.set(chunk, position);
        position += chunk.length;
      }

      setVerificationStatus('verifying');
      setProgress(0);

      // Calculate hashes and verify
      const results: typeof verificationResults = {
        actualSize: fileData.length
      };

      // Check file size
      if (fileSize) {
        results.sizeMatch = fileData.length === fileSize;
      }

      // Calculate and check MD5
      if (expectedMD5) {
        setProgress(25);
        results.actualMD5 = await calculateMD5(fileData.buffer);
        results.md5Match = results.actualMD5.toLowerCase() === expectedMD5.toLowerCase();
      }

      // Calculate and check SHA256
      if (expectedSHA256) {
        setProgress(75);
        results.actualSHA256 = await calculateSHA256(fileData.buffer);
        results.sha256Match = results.actualSHA256.toLowerCase() === expectedSHA256.toLowerCase();
      }

      setProgress(100);
      setVerificationResults(results);

      // Determine overall success
      const allChecksPass = (
        (!expectedMD5 || results.md5Match) &&
        (!expectedSHA256 || results.sha256Match) &&
        (!fileSize || results.sizeMatch)
      );

      setVerificationStatus(allChecksPass ? 'success' : 'error');

      // If verification passes, trigger actual download
      if (allChecksPass) {
        const blob = new Blob([fileData]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

    } catch (error) {
      console.error('Download/verification error:', error);
      setVerificationStatus('error');
    } finally {
      setIsVerifying(false);
    }
  }, [downloadUrl, fileName, expectedMD5, expectedSHA256, fileSize]);

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      case 'downloading':
      case 'verifying':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'downloading':
        return 'Downloading file...';
      case 'verifying':
        return 'Verifying file integrity...';
      case 'success':
        return 'File verified and downloaded successfully!';
      case 'error':
        return 'Verification failed or download error occurred.';
      default:
        return 'Click to download with integrity verification';
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white">
      <div className="flex items-center space-x-3 mb-4">
        <FileCheck className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Secure Download with Integrity Verification
        </h3>
      </div>

      <div className="space-y-4">
        {/* File Information */}
        <div className="bg-gray-50">
          <h4 className="font-medium text-gray-900">{fileName}</h4>
          <div className="space-y-1 text-sm text-gray-600">
            {fileSize && (
              <div>Expected size: {formatFileSize(fileSize)}</div>
            )}
            {expectedMD5 && (
              <div className="font-mono">MD5: {expectedMD5}</div>
            )}
            {expectedSHA256 && (
              <div className="font-mono">SHA256: {expectedSHA256.substring(0, 32)}...</div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {(verificationStatus === 'downloading' || verificationStatus === 'verifying') && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{verificationStatus === 'downloading' ? 'Downloading' : 'Verifying'}...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Status */}
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <span className={`text-sm ${
            verificationStatus === 'success'
              ? 'text-green-600'
              : verificationStatus === 'error'
                ? 'text-red-600'
                : 'text-gray-600'
          }`}>
            {getStatusMessage()}
          </span>
        </div>

        {/* Verification Results */}
        {verificationResults.actualSize && (
          <div className="space-y-2">
            <h5 className="font-medium text-gray-900">Verification Results:</h5>
            <div className="space-y-1 text-sm">
              {fileSize && (
                <div className="flex items-center space-x-2">
                  {verificationResults.sizeMatch ? 
                    <Check className="w-4 h-4 text-green-500" /> : 
                    <X className="w-4 h-4 text-red-500" />
                  }
                  <span className="text-gray-600">
                    File size: {formatFileSize(verificationResults.actualSize)} 
                    {verificationResults.sizeMatch ? ' ✓' : ' ✗'}
                  </span>
                </div>
              )}
              {expectedMD5 && verificationResults.actualMD5 && (
                <div className="flex items-center space-x-2">
                  {verificationResults.md5Match ? 
                    <Check className="w-4 h-4 text-green-500" /> : 
                    <X className="w-4 h-4 text-red-500" />
                  }
                  <span className="text-gray-600">
                    MD5 hash {verificationResults.md5Match ? 'matches' : 'does not match'}
                  </span>
                </div>
              )}
              {expectedSHA256 && verificationResults.actualSHA256 && (
                <div className="flex items-center space-x-2">
                  {verificationResults.sha256Match ? 
                    <Check className="w-4 h-4 text-green-500" /> : 
                    <X className="w-4 h-4 text-red-500" />
                  }
                  <span className="text-gray-600">
                    SHA256 hash {verificationResults.sha256Match ? 'matches' : 'does not match'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Warning for failed verification */}
        {verificationStatus === 'error' && (
          <div className="bg-red-50">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h5 className="font-medium text-red-800">Security Warning</h5>
                <p className="text-sm text-red-700">
                  File integrity verification failed. The downloaded file may be corrupted or tampered with. 
                  Do not use this file for security-critical applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={downloadAndVerify}
          disabled={isVerifying}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isVerifying
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          <Download className="w-5 h-5" />
          <span>
            {isVerifying ? 'Processing...' : 'Download with Verification'}
          </span>
        </button>

        {/* Info */}
        <div className="text-xs text-gray-500">
          This download will be verified against known checksums to ensure file integrity and security.
        </div>
      </div>
    </div>
  );
}
