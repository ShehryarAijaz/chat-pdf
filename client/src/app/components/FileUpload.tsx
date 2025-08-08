'use client'
import * as React from 'react'
import { FileUp } from 'lucide-react'
import { fileUpload } from '@/app/components/api'

const FileUpload: React.FC = () => {

  const handleFileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'application/pdf');
    fileInput.addEventListener('change', async (event) => {
      event.preventDefault();
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput?.files?.item(0);
        if (file) {
        const formData = new FormData();
        formData.append('pdf', file);

        await fileUpload(formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      }
        console.log('Selected Files: ', file);
      }
    })
    fileInput.click();
  }

  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div onClick={handleFileUpload} className='flex flex-col items-center justify-center bg-blue-700 text-white shadow-lg rounded-lg p-4 cursor-pointer hover:bg-blue-800 transition-colors duration-300 border-white border-1'>
        <h4 className="mb-2"><b>Upload Your Files Here</b></h4>
        <FileUp />
        </div>
    </div>
  )
}

export default FileUpload