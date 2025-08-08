// Helper function to upload a file to the backend
export const fileUpload = async (formData) => {
    try {
        const response = await fetch('http://localhost:8000/chat/upload/pdf', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};