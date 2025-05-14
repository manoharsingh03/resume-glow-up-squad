
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileText } from 'lucide-react';

interface UploadSectionProps {
  onFileUploaded: (file: File) => void;
}

const UploadSection = ({ onFileUploaded }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      
      // Check if the file is PDF or DOCX
      if (
        fileType === 'application/pdf' || 
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setSelectedFile(file);
        toast({
          title: "Resume uploaded!",
          description: `${file.name} is ready for checking.`,
        });
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a PDF or DOCX file",
          variant: "destructive",
        });
      }
    }
  };

  const handleButtonClick = () => {
    if (selectedFile) {
      onFileUploaded(selectedFile);
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className={`vibe-upload-area flex flex-col items-center justify-center min-h-[300px] ${
          isDragging ? 'bg-vibe-primary/5 border-vibe-primary' : ''
        } ${selectedFile ? 'bg-green-50 border-green-500/50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
        />
        
        {selectedFile ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">{selectedFile.name}</h3>
            <p className="text-vibe-text-light mb-4">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
            <button 
              className="text-vibe-primary text-sm underline"
              onClick={() => setSelectedFile(null)}
            >
              Change file
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 mb-4 bg-vibe-primary/10 rounded-full flex items-center justify-center animate-pulse-soft">
              <Upload className="h-8 w-8 text-vibe-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Drop your resume here</h3>
            <p className="text-vibe-text-light text-center max-w-md mb-4">
              Upload your resume in PDF or DOCX format to get started with your vibe check
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline" 
              className="border-vibe-primary/50 text-vibe-primary hover:bg-vibe-primary/10"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select File
            </Button>
          </>
        )}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleButtonClick}
          className="vibe-button-primary"
          disabled={!selectedFile}
          size="lg"
        >
          {selectedFile ? "Check My Resume Vibes" : "Upload Resume to Continue"}
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;
